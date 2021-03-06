const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

// Drug model
const Drug = require('../models/Drug');


// @desc    Login/Landing Page
// @route   GET /
router.get('/', checkUser, ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})


// @desc    Dashboard
// @route   GET /dashboard

router.get('/dashboard', checkUser, ensureAuth, async(req, res) => {
    try {
        const drugs = await Drug.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            drugs
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }

})



module.exports = router;