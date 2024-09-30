import { rgbToCssColor } from "./color";

async function processCollection({
  name,
  modes,
  variableIds,
}: VariableCollection): Promise<[]> {
  const collection: [] = [];
  const validTypes = new Set(["COLOR", "FLOAT"]);

  for(const mode of modes) {
    const file = { collection: name, mode: mode.name, variables: {} };

    for (const variableId of variableIds) {
      const figVar = await figma.variables.getVariableByIdAsync(variableId);
      if (figVar !== null) {
        const { name, resolvedType, valuesByMode }: Variable = figVar;
        const value: VariableValue = valuesByMode[mode.modeId];

        if (value !== undefined && validTypes.has(resolvedType)) {
          let obj: any = file.variables;
  
          name.split("/").forEach((groupName) => {
            obj[groupName] = obj[groupName] || {};
            obj = obj[groupName];
          });
          obj.$type = resolvedType === "COLOR" ? "color" : "number";
          if (typeof value === 'object' && 'type' in value && value.type === 'VARIABLE_ALIAS') {
            const linkedVar = await figma.variables.getVariableByIdAsync(value.id);
            obj.$value = `$.${linkedVar  ? linkedVar.name.replace(/\//g, ".") : "Unknown"}`;
          }
          else {
            obj.$value = resolvedType === "COLOR" ? rgbToCssColor(value as RGBA) : value;
          }
        }
      }
    }
    collection.push(file as never);
  };
  return collection;
}

export const exportToJSON = async () => {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  try {
    const files: any[] = [];
    for( const collection of collections ) {
      const processedCollection = await processCollection(collection);
      files.push(... processedCollection );
    }
    const jsonData = JSON.stringify(files, null, 2);
    return jsonData;
  }
  catch (err) {
    console.error(err);
  }
};
