import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Flex, Text, RadioGroup, Button, Textarea, Switch, Label } from "figma-kit"
import "figma-kit/styles.css";

const App: React.FC = () => {
  const [format, setFormat] = useState<"csv" | "json">("json");
  const [seeOutput, setSeeOutput] = useState<boolean>(false);
  const [exportedData, setExportedData] = useState<string>("");

  const handleExport = () => {
    parent.postMessage({ pluginMessage: { type: "EXPORT", format } }, "*");
  };
  const handleCopyContent = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(exportedData)
        .then(() => {
          console.log('Content copied to clipboard');
          // Optionally, you can show a success message to the user
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          // Optionally, you can show an error message to the user
        });
    } else {
      console.warn('Clipboard API not available');
      // Fallback method or show a message to the user
    }

  };
  useEffect(() => {
    window.onmessage = (event) => {
      const message = event.data.pluginMessage;
      if (message.type === "EXPORT_RESULT") {
        console.dir(message);
        
        setExportedData(message.data);

        const blob = new Blob([message.data], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `exported_variables.${message.format}`;
        link.click();
        URL.revokeObjectURL(url);
      }
    };
  }, [format]);

  return (
    <main>
      <Flex direction="column" gap="5">
          <Flex direction="column" gap="2">
            <Text>Select a format</Text>
            <RadioGroup.Root value={format} onValueChange={(value) => setFormat(value as "csv" | "json")}>
              <RadioGroup.Label>
                <RadioGroup.Item
                  value="json"
                />
                JSON
              </RadioGroup.Label>
              <RadioGroup.Label>
                <RadioGroup.Item
                  value="csv"
                />
                CSV
              </RadioGroup.Label>
            </RadioGroup.Root>
          </Flex>
          <Button
              variant="primary"
              fullWidth={true}
              size="medium"
              onClick={handleExport}
            >
                Export Variables
          </Button>
          <Flex gap="2"><Switch id="devvy-preview-output" onCheckedChange={setSeeOutput} checked={seeOutput} /> <Label htmlFor="devvy-preview-output">Preview output</Label></Flex>
          {
            seeOutput && exportedData && <Flex direction="column"
              style={{
                overflow: 'auto',
                maxHeight: 'calc(90vh - 155px)',
                border: 'var(--figma-color-border)',
                borderRadius: 4,
                padding: 8,
                backgroundColor: 'rgba(0,0,0,.25)',
              }}>
              <Flex direction="column">
                <Button
                  variant="secondary"
                  onClick={handleCopyContent}
                  style={{ alignSelf: 'end' }}
                >
                  Copy
                </Button>
                <Text>
                  <pre
                    contentEditable
                  >{exportedData.toString()}</pre>
                </Text>
              </Flex>
            </Flex>
          }
      </Flex>
    </main>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
