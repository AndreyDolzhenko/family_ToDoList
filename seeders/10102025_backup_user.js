"use strict";

const fs = require("fs/promises");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const outPath = path.resolve(
      __dirname,
      "..",
      "backup",      
      "users-backup-2025-10-09T12-12-56-459Z.json"
    );
    const raw = JSON.parse(await fs.readFile(outPath, "utf8"));        
   
    await queryInterface.bulkInsert("Users", raw.data, {});
  },


};