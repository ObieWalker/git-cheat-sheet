import { end } from './mainSeed';
const Command  = require('../database/models/command');
const mongoose = require('mongoose');
const Category  = require('../database/models/category');
const { seedData } = require('./seedData')

let total = 0;
exports.seedCategory = function seedCategory() {
  Category.find({}).exec(function (err, collection) {
    seedData.forEach(seed => {
      Category.create({ name: seed.category})
      .then(category => {
        seed.data.forEach(data => {
          Command.create({
            category: category._id,
            description: data.description,
            command: data.command,
            keywords: data.keywords
          })
            .then(command => {
              Category.findOneAndUpdate({ _id : category._id }, { $push : { command : command._id }})
              .then((cat) => {
                total++
                if (total === 48){
                  console.log("Seed Completed!!!")
                  end()
                }
              })
            })
          })
        })
      })
    })
  }
