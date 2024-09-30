import { rgbToCssColor } from "./color";

const processCollectionToCSV = async ({ name, modes, variableIds }: VariableCollection): Promise<string[]> => {
  const csvRows: string[] = [];
  const validTypes = new Set(["COLOR", "FLOAT"]);

  for (const mode of modes) {

    for (const variableId of variableIds) {
      const figVar = await figma.variables.getVariableByIdAsync(variableId);

      if (figVar !== null) {
        const { name:varName, resolvedType, valuesByMode }: Variable = figVar;
        const varValue: VariableValue = valuesByMode[mode.modeId];

        if (varValue !== undefined && validTypes.has(resolvedType)) {
          let value: string;

          if (typeof varValue === "object" && "id" in varValue) {
            const linkedVar = await figma.variables.getVariableByIdAsync(varValue.id);
            value = linkedVar ? `=${linkedVar.name.replace(/\//g, "/")}` : "Unknown";
          }
          else {
            const isColor = resolvedType === "COLOR";
            value = isColor ? rgbToCssColor(varValue as RGBA) : String(varValue);

            if (isColor && value.startsWith('rgb')) {
              value = `"${value}"`
            };
          }
          csvRows.push(`${name},${mode.name},${varName},${resolvedType},${value}`);
        }
      }
    }
  }

  return csvRows;
}

export const exportToCSV = async () => {
  const csvData = ["Collection,Mode,Variable,Type,Value"];
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  try {
    for (const collection of collections) {
      csvData.push(...(await processCollectionToCSV(collection)));
    }
    return csvData.join("\n");  
  }
  catch (err) {
    console.error(err);
  }
};
