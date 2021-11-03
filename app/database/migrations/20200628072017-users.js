'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country_code: {
        allowNull: false,
        primaryKey: false,
        type: Sequelize.STRING,
      },
      date_of_birth: {
        allowNull: false,
        primaryKey: false,
        type: Sequelize.DATEONLY,
      },
      phone_number: {
        type: Sequelize.STRING,
        primaryKey: false,
        allowNull: true
      },
      gender: {
        type: Sequelize.STRING,
        primaryKey: false,
        allowNull: true
      },
      id_user_type: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        allowNull: false,
        references: {
          model: 'user_types',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  }
}
