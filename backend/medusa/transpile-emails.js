const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Directory containing subdirectories with .jsx files
const dataDir = path.resolve(__dirname, "data/templates");

// Function to transpile .jsx files
const transpileFile = (filePath) => {
  const outputPath = filePath.replace(/\.jsx$/, ".js");
  const command = `npx babel '${filePath}' --presets=@babel/preset-env,@babel/preset-react -o '${outputPath}'`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error transpiling file ${filePath}:`, error);
      return;
    }
    if (stderr) {
      console.error(`Error in command for file ${filePath}:`, stderr);
      return;
    }
    console.log(`Successfully transpiled ${filePath} to ${outputPath}`);
  });
};

// Function to recursively find .jsx files in directories
const findJsxFiles = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) {
          console.error(`Error stating file ${filePath}:`, err);
          return;
        }
        if (stat.isDirectory()) {
          findJsxFiles(filePath);
        } else if (stat.isFile() && path.extname(file) === ".jsx") {
          transpileFile(filePath);
        }
      });
    });
  });
};

// Start the search from the data directory
findJsxFiles(dataDir);
