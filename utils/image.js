const path = require("path");

function getFilePath(file) {
    const uploadIndex = file.path.indexOf("uploads");
    return file.path.substring(uploadIndex).replace(/\\/g, "/");
}

module.exports = {
    getFilePath
}
