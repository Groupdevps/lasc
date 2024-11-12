'use strict';
const {departments, cities} = require("../lib/departments.js");
// const { State, City }  	= require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *  
    */
   /*
    departments.forEach(async (it)=>{
      
      const result1 = await State.create(it)
      console.log(result1);
      result1.then(async (result)=>{
        const cityList = cities.filter((x)=> x.departament == it.name )
        .map(z => { 
          return {
            ...z,
            StateId : result.id,
          }
        });
        console.log("Insert bulk citys ", cityList, result)
        await queryInterface.bulkInsert('Cities', cityList, {});
        
      }).catch(error => console.warn("error ==== ", error))
    })*/
    await queryInterface.bulkInsert('States', departments, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('States', null, {});
    // await queryInterface.bulkDelete('Cities', null, {});

  }
};
