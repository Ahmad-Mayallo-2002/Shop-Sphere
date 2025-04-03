const { writeFileSync } = require("fs");
const { join } = require("path");

const writeFileToPublic = (file) => {
  const fileName = Date.now() + "-" + file.originalname;
  const filePath = join(__dirname, "../public", fileName);
  writeFileSync(filePath, file.buffer);
  return fileName; // Return file name to store in DB
};

module.exports = { writeFileToPublic };
