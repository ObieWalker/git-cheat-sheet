const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Command  = require('../../database/models/command');
const Category  = require('../../database/models/category');
const { seedData } = require('../../seed/seedData')
const { seedUsers } = require('../../seed/seedUsers')

let total = 0;
function seedCategory() {
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
          }).then(command => {
            total++
            if (total === 48){
              console.log("Test Seed Completed!!!")
              end()
            }
          })
        })
      })
    })
  },
)}


dotenv.config();


mongoose.connect(process.env.MONGODB_URI_TEST)

const end = () => {
  mongoose.disconnect();
}

mongoose.connection.on('connected', function() {

mongoose.connection.db.dropDatabase();
seedUsers()
seedCategory()
})