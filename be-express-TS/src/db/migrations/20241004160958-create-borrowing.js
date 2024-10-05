"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Borrowings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      memberCode: {
        type: Sequelize.STRING,
      },
      bookCode: {
        type: Sequelize.STRING,
      },
      borrowDate: {
        type: Sequelize.DATE,
      },
      dueDate: {
        type: Sequelize.DATE,
      },
      returnDate: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM("borrowed", "returned"),
        defaultValue: "returned",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Borrowings");
  },
};
