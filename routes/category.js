const router = require('express').Router()
const Category = require('../models/category')

// POST Request - Category
router.post('/categories', async (req, res) => {
    try {
        const category = new Category()
        category.type = req.body.type

        await category.save()

        res.json({
            status: true, 
            message: 'Category created!'
        })
    } catch (err) {
        res.status(500).json({
            success: false, 
            message: err.message 
        })
    }
})

// GET Request - Category
router.get('/categories', async (req, res) => {
    try {
        let categories = await Category.find()
        res.json({
            success: true, 
            categories: categories
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}) 

module.exports = router