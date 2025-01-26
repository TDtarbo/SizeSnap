# SizeSnap

Image Resizing Tool

## Overview

SizeSnap is an image resizing tool built with Electron. It allows users to easily resize images by specifying the desired dimensions and output format.

## Features

- **Drag and Drop**: Upload images with ease using drag-and-drop functionality.
- **Custom Dimensions**: Resize images to user-specified dimensions.
- **Multiple Formats**: Supports output in PNG, JPG, and BMP formats.
- **Custom Output Directory**: Save resized images in a directory of your choice.
- **User-Friendly Interface**: Smooth and intuitive UI with notifications for a seamless experience.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/sizesnap.git
    cd sizesnap
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the application:
    ```bash
    npm start
    ```

2. Use the interface to:
   - Upload an image (drag-and-drop supported).
   - Specify desired dimensions and output format.
   - Resize the image and save it to your preferred directory.

## Packaging

To package the application for distribution, run:
```bash
npm run package
```
This will create a packaged version of the application in the `sizesnap-win32-x64` directory.

## Project Structure

```
.
├── main.js           # Main process code for the Electron app
├── preload.js        # Preload script to expose APIs to the renderer process
├── renderer          # Renderer process code (HTML, CSS, JS)
├── assets            # Assets like fonts and icons
├── build             # Build scripts and executables
└── sizesnap-win32-x64 # Packaged application
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

**Thilina Dilhan**
