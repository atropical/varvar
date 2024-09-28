/// <reference types="@figma/plugin-typings" />

import { exportToCSV } from "./utils/collectionToCSV";
import { exportToJSON } from "./utils/collectionToJSON";

figma.showUI(__html__, { width: 500, height: 500, themeColors: true });

figma.ui.onmessage = (msg) => {
  console.log("code received message", msg);
  if (msg.type === "EXPORT") {
    if (msg.format === "csv") {
      const csvData = exportToCSV();
      figma.ui.postMessage({
        type: "EXPORT_RESULT",
        format: "csv",
        data: csvData,
      });
    } else if (msg.format === "json") {
      const jsonData = exportToJSON();
      figma.ui.postMessage({
        type: "EXPORT_RESULT",
        format: "json",
        data: jsonData,
      });
    }
  }
};
