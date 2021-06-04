'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('business_hours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      id_restaurant: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      day: {
        type: Sequelize.STRING,
        allowNull: false
      },
      opening_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      closing_time: {
        type: Sequelize.TIME,
        allowNull: true
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

    queryInterface.sequelize.query(`
    create or replace function get_different_hour(opening_time time, closing_time time) returns float as $$
      begin
        if opening_time > closing_time then
          return ABS(extract(epoch from CONCAT('2011-12-13', ' ', closing_time)::timestamp::timestamp - CONCAT('2011-12-12', ' ', opening_time)::timestamp)/3600);
        else 
          return ABS(extract(epoch from CONCAT('2011-12-12', ' ', closing_time)::timestamp::timestamp - CONCAT('2011-12-12', ' ', opening_time)::timestamp)/3600);
        end if;
      end; $$ language plpgsql;
    `)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('business_hours')
    queryInterface.sequelize.query('DROP FUNCTION IF EXISTS get_different_hour;')
  }
}
