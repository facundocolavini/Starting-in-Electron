const fs = require('fs');

const createJsonLog = (path, data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const createFolderLog = (path) => {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteJsonLog = (path) => {
  fs.rmdir(path, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }

    console.log(`${path} is deleted!`);
  });
};

module.exports = { createFolderLog, createJsonLog, deleteJsonLog };
