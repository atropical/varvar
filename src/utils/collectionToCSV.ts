import { rgbToHex } from "./color";

function processCollectionToCSV({
  name,
  modes,
  variableIds,
}: VariableCollection): string[] {
  const csvRows: string[] = [];

  modes.forEach((mode) => {
    variableIds.forEach((variableId) => {
      const figVar = figma.variables.getVariableById(variableId);
      if (!figVar) return;
      const { name: varName, resolvedType, valuesByMode }: Variable = figVar;
      const varValue: VariableValue = valuesByMode[mode.modeId];

      if (varValue !== undefined && ["COLOR", "FLOAT"].includes(resolvedType)) {
        let value: string;
        if (typeof varValue === "object" && "id" in varValue) {
          const linkedVar = figma.variables.getVariableById(varValue.id);
          value = linkedVar
            ? `=${linkedVar.name.replace(/\//g, "/")}`
            : "Unknown";
        } else {
          value =
            resolvedType === "COLOR"
              ? rgbToHex(varValue as RGBA)
              : varValue.toString();
          value = value.startsWith('rgb') ? `"${value}"` : value;
        }
        csvRows.push(
          `${name},${mode.name},${varName},${resolvedType},${value}`,
        );
      }
    });
  });

  return csvRows;
}

export const exportToCSV = () => {
  const collections = figma.variables.getLocalVariableCollections();
  const csvData = ["Collection,Mode,Variable,Type,Value"];

  collections.forEach((collection) => {
    csvData.push(...processCollectionToCSV(collection));
  });
  return csvData.join("\n");

};
