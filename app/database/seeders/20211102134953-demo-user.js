'use strict';
const bcrypt = require('bcrypt')
require('dotenv').config()

function hashPassword (password) {
  const salt = bcrypt.genSaltSync(parseInt(process.env.ROUND_SALT))
  return bcrypt.hashSync(password, salt)
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        first_name: 'Manager',
        last_name: 'A',
        email: 'manager_a@gmail.com',
        password: hashPassword('manager@123'),
        country_code: 'GB',
        date_of_birth: '02-07-1997',
        phone_number: '085706876773',
        id_user_type: 2
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  }
};
