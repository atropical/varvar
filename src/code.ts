/// <reference types="@figma/plugin-typings" />

import { exportToCSV } from "./utils/collectionToCSV";
import { exportToJSON } from "./utils/collectionToJSON";

figma.showUI(__html__, { width: 600, height: 500, themeColors: true });

figma.ui.onmessage = async (msg) => {
  
  if(msg.type === "INFO.GET_BASIC_INFO") {
    const vars = await figma.variables.getLocalVariablesAsync();
    const filename = figma.root.name;
    figma.ui.postMessage({
      type: 'INFO.BASIC_INFO',
      count: vars.length,
      filename
    })
  }
  else if (msg.type === "EXPORT.SUCCESS") {

    try {
        const data = msg.format === 'csv'
        ?  await exportToCSV(msg.useLinkedVarRowAndColPos)
        : await exportToJSON();
        
        figma.ui.postMessage({
          type: "EXPORT.SUCCESS.RESULT",
          format: msg.format,
          data,
        });
        figma.notify('✅ All variables were exported.');
    }
    catch (error) {
      console.error(error);
      figma.notify( 'Something went wrong while attempting to export the variables. Check the console for more info.', {
        error: true
      });
    }
  }
};
