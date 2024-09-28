import { rgbToHex } from "./color";

function processCollection({
  name,
  modes,
  variableIds,
}: VariableCollection): [] {
  const collection: [] = [];

  modes.forEach((mode) => {
    const file = { fileName: `${name}.${mode.name}.tokens.json`, body: {} };

    variableIds.forEach((variableId) => {
      const figVar = figma.variables.getVariableById(variableId);
      if (!figVar) return;
      const { name, resolvedType, valuesByMode }: Variable = figVar;
      const varValue: VariableValue = valuesByMode[mode.modeId];

      if (varValue !== undefined && ["COLOR", "FLOAT"].includes(resolvedType)) {
        let obj: any = file.body;

        name.split("/").forEach((groupName) => {
          obj[groupName] = obj[groupName] || {};
          obj = obj[groupName];
        });
        obj.$type = resolvedType === "COLOR" ? "color" : "number";
        if (typeof varValue === "object" && "id" in varValue) {
          const linkedVar = figma.variables.getVariableById(varValue.id);
          obj.$value = linkedVar
            ? linkedVar.name.replace(/\//g, ".")
            : "Unknown";
        } else {
          obj.$value =
            resolvedType === "COLOR" ? rgbToHex(varValue as RGBA) : varValue;
        }
      }
    });
    collection.push(file as never);
  });
  return collection;
}
export const exportToJSON = () => {
  const collections = figma.variables.getLocalVariableCollections();
  const files: any[] = [];

  collections.forEach((collection) =>
    files.push(...processCollection(collection)),
  );
  const jsonData = JSON.stringify(files, null, 2);
  return jsonData;
};
