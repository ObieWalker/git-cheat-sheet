import express from 'express'
import Cheat from '../database/models/command';
import Category from '../database/models/category';
import User from '../database/models/user.js';

const router = express.Router();


  router.get('/cheats',(req, res) => {
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
  })

  router.post('/cheats',(req, res) => {
    Cheat.create({
      category: req.body.category,
      command: req.body.command,
      description: req.body.description,
      keywords: [req.body.keywords]
    })
    .then(cheat => {
      if (cheat) {
        res.status(201).json({
          success: true,
          message: `${cheat.category} with the command ${cheat.command} has been added.`,
          cheat
        })
      }
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cheat cannot be added at this time.`,
        err
      })
    })
  })

  router.delete('/cheats/:id',(req, res) => {
    const id = req.params.id
    Cheat.findByIdAndDelete(id)
    .then((deletedCheat) => {
      if (deletedCheat){
        res.json({
          success: true,
          message: `The cheat has been deleted.`
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
  })

  router.patch('/cheats/:id',(req, res) => {
    const cheatId = { _id : req.params.id }
    const newCheat = {
      category: req.body.category,
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
        message: "No such cheat"
      });
    })
  })

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


export default router;