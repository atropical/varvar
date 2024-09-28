# Devvy - Figma Variable Export Plugin

Devvy is a powerful Figma plugin that allows you to export your Figma variables to JSON or CSV format, making it easier to integrate your design tokens into your development workflow.

## Features

- Export Figma variables to JSON or CSV format
- Preview exported data within the plugin interface
- Automatically download exported files

## Installation

1. Open Figma and go to the Community tab
2. Search for "Devvy"
3. Click on the plugin and then click "Install"

## Usage

1. Open your Figma file containing variables
2. Run the Devvy plugin from the Plugins menu
3. Choose your desired export format (JSON or CSV)
4. Click "Export Variables"
5. The exported file will be automatically downloaded

### Preview and Copy

- Toggle the "Preview output" switch to see the exported data within the plugin interface
- Use the "Select all" button and copy (Ctrl/Cmd + C) the exported data to your clipboard

## Development

To set up the development environment:

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```

### Building the Plugin

To build the plugin for production:
```
npm run build
```

## Project Structure

- `src/code.ts`: Main plugin code
- `src/ui.tsx`: React component for the plugin UI
- `src/utils/`: Utility functions for data processing
- `manifest.json`: Figma plugin manifest file

## Technologies Used
- React
- TypeScript
- Vite
- figma-kit@beta

## License
This project is licensed under the MIT license.

## Author
Devvy is developed and maintained by Atropical AS.