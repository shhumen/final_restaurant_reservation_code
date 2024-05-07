const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Favorites = require('../models/favorites')
const Restaurant = require('../models/restaurants')

// Create a favorites list
router.post('/lists', async (req, res) => {
  try {
    const { userId, listName } = req.body

    // Check if a favorites list with the same name already exists
    const existingList = await Favorites.findOne({ userId, listName })
    if (existingList) {
      return res.status(400).json({ message: 'List already exists' })
    }

    const favoritesList = new Favorites({
      userId: userId,
      listName: listName,
    })

    await favoritesList.save()
    res.status(201).json({ message: 'Favorites list created successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get('/lists', async (req, res) => {
  try {
    const userId = req.query.userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' })
    }

    const favorites = await Favorites.find({ userId })
    res.json(favorites)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

router.get('/lists/:id', async (req, res) => {
  try {
    const list = await Favorites.findOne({ _id: req.params.id })
    res.json(list)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

router.delete('/lists/:listId', async (req, res) => {
  const { listId } = req.params
  try {
    const list = await Favorites.findOneAndDelete({ _id: listId })
    if (!list) {
      return res
        .status(404)
        .json({ message: 'List not found for this restaurant' })
    }
    res.status(200).json({
      message: 'List deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

// Add restaurant to favorites list
router.post('/lists/:listId/restaurants/:restaurantId', async (req, res) => {
  try {
    const listId = req.params.listId
    const restaurantId = req.params.restaurantId

    // Check if the list exists
    const favoritesList = await Favorites.findById(listId)
    if (!favoritesList) {
      return res.status(404).json({ message: 'Favorites list not found' })
    }

    // Check if the restaurant exists
    const restaurant = await Restaurant.findById(restaurantId)
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' })
    }

    // Check if the restaurant already exists in the list
    if (favoritesList.restaurants.includes(restaurantId)) {
      return res
        .status(400)
        .json({ message: 'Restaurant already exists in the list' })
    }

    // Add the restaurant to the list
    favoritesList.restaurants.push(restaurantId)
    await favoritesList.save()

    res
      .status(200)
      .json({ message: 'Restaurant added to favorites list successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// router.put('/lists/:listId', async (req, res) => {
//   try {
//     const listId = req.params.listId
//     const { action, restaurantId } = req.body

//     // Check if the list exists
//     const favoritesList = await Favorites.findById(listId)
//     if (!favoritesList) {
//       return res.status(404).json({ message: 'Favorites list not found' })
//     }

//     if (action === 'removeList') {
//       // Remove list
//       await Favorites.findByIdAndDelete(listId)
//       return res
//         .status(200)
//         .json({ message: 'Favorites list removed successfully' })
//     } else if (action === 'removeRestaurant') {
//       // Remove restaurant from the list
//       const index = favoritesList.restaurants.indexOf(restaurantId)
//       if (index === -1) {
//         return res
//           .status(400)
//           .json({ message: 'Restaurant not found in the list' })
//       }
//       favoritesList.restaurants.splice(index, 1)
//       await favoritesList.save()
//       return res
//         .status(200)
//         .json({ message: 'Restaurant removed from the list successfully' })
//     } else {
//       return res.status(400).json({ message: 'Invalid action' })
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message })
//   }
// })

router.put('/lists/:listId', async (req, res) => {
  try {
    const listId = req.params.listId
    const { action, newName, restaurantId } = req.body

    const favoritesList = await Favorites.findById(listId)
    if (!favoritesList) {
      return res.status(404).json({ message: 'Favorites list not found' })
    }

    if (action === 'changeName') {
      favoritesList.listName = newName
      await favoritesList.save()
      return res.status(200).json({ message: 'List name changed successfully' })
    } else if (action === 'removeRestaurant') {
      const index = favoritesList.restaurants.indexOf(restaurantId)
      if (index === -1) {
        return res
          .status(400)
          .json({ message: 'Restaurant not found in the list' })
      }
      favoritesList.restaurants.splice(index, 1)
      await favoritesList.save()
      return res
        .status(200)
        .json({ message: 'Restaurant removed from the list successfully' })
    } else {
      return res.status(400).json({ message: 'Invalid action' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
