import express from 'express'
import Cheat from '../database/models/command';
import Category from '../database/models/category';
import User from '../database/models/user.js';

const router = express.Router();


  function getCheats (req, res){
    Cheat.find()
    .populate("category", "name")
    .exec()
    .then ((cheats) => {
      if (cheats) {
        if (cheats.length > 0) {
          res.json({
            success: true,
            cheats
          })
        } else {
          res.status(404)({
            success: false,
            cheats,
            message: "No Content available"
          })
        }
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err
      });
    })
  }

  function getCategories(req, res) {
    Category.find()
    .exec()
    .then ((categories) => {
      if (categories) {
        if (categories.length > 0) {
          res.json({
            success: true,
            categories
          })
        } else {
          res.status(404)({
            success: false,
            categories,
            message: "No Content available"
          })
        }
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err
      });
    })
  }

  async function createCheat(req, res) {
    try {
      let category = await Category.find({ name: req.body.category })
      if (category.length > 0){
        let cheat = await Cheat.create({
          category: category[0]._id,
          command: req.body.command,
          description: req.body.description,
          keywords: [req.body.keywords]
        })
        if (cheat) {
          res.status(201).json({
            success: true,
            message: `${cheat.command} command has been added to '${category[0].name}'.`,
            cheat
          })
        }
      }
      else {
        let category = await Category.create({ name: req.body.category})
        let cheat = await Cheat.create({
          category: category._id,
          command: req.body.command,
          description: req.body.description,
          keywords: [req.body.keywords]
        })
        if (cheat) {
          res.status(201).json({
            success: true,
            message: `${cheat.command} command has been added to '${category.name}'.`,
            cheat
          })
        }
      }
    }
    catch(err) {
      res.json({
        success: false,
        message: `Cheat cannot be added at this time.`,
        err
      })
    }
  }

  function deleteCheat(req, res) {
    const id = req.params.id
    Cheat.findByIdAndDelete(id)
    .then((deletedCheat) => {
      if (deletedCheat){
        res.json({
          success: true,
          message: `The '${deletedCheat.command}' cheat has been deleted.`
        })
      } else {
        res.status(404).json({
          success: false,
          message: "No such cheat"
        });
      }
    })
    .catch(err => {
      res.status(404).json({
        success: false,
        message: "No such cheat"
      });
    })
  }

  function deleteCategory (req, res) {
    const id = req.params.id
    const deletedCategory = {
      category : {
        _id: id
      }
    }
    Cheat.deleteMany(deletedCategory)
    .then(() => {
      Category.findByIdAndDelete(id)
      .then((deletedCategory) => {
        if (deletedCategory){
          res.json({
            success: true,
            message: `The '${deletedCategory.name}' category has been deleted.`
          })
        } else {
          res.status(404).json({
            success: false,
            message: "No such cheat"
          });
        }
      })
    })
    .catch(err => {
      res.status(404).json({
        success: false,
        message: "No such cheat"
      });
    })
  }

  function updateCheat(req, res) {
    const cheatId = { _id : req.params.id }
    const newCheat = {
      command: req.body.command,
      description: req.body.description,
      keywords: [req.body.keywords]
    }
    Cheat.findOneAndUpdate(cheatId, { $set: newCheat }, {new:true})
    .then(cheat => {
      if(cheat){
        res.json({
          success: true,
          message: "The cheat has been updated",
          cheat
        })
      }  else {
        res.status(404).json({
          success: false,
          message: "No such cheat"
        });
      }
    })
    .catch(err => {
      res.status(404).json({
        success: false,
        message: "No such cheat",
        err
      });
    })
  }

  function updateCategory(req, res) {
    const categoryId = { _id : req.params.id }
    const newCategory = {
      name: req.body.category
    }
    Category.findOneAndUpdate(categoryId, { $set: newCategory }, {new:true})
    .then(category => {
      if(category){
        res.json({
          success: true,
          message: "The category has been updated",
          category
        })
      }  else {
        res.status(404).json({
          success: false,
          message: "No such category"
        });
      }
    })
    .catch(err => {
      res.status(404).json({
        success: false,
        message: "No such category",
        err
      });
    })
  }

  // router.post('/users',(req, res) => {
  //   User.create({
  //     name: req.body.groceryName,
  //     price: req.body.groceryPrice
  //   })
  //   .then(grocery => {
  //     if (grocery) {
  //       res.status(201).json({
  //         success: true,
  //         message: `${grocery.name} has been added at &#8358;${grocery.price}`,
  //         grocery
  //       })
  //     }
  //   })
  //   .catch(err => {
  //     res.json({
  //       success: false,
  //       message: `Grocery cannot be added because ${err}`,
  //       err
  //     })
  //   })
  // })

  router.get('/cheats',getCheats)
  router.get('/category', getCategories)
  router.post('/cheats', createCheat)
  router.delete('/cheats/:id', deleteCheat) 
  router.delete('/category/:id', deleteCategory)
  router.patch('/cheats/:id', updateCheat)
  router.patch('/category/:id', updateCategory)

export default router;