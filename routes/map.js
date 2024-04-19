const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Area = require('../models/Area');

// Protected route using middleware
router.get('/', authMiddleware, async (req, res) => {
    try {
        const areas = await Area.find({ user: req.user._id });
        res.render('map', { areas });
    } catch (error) {
        console.error('Error fetching areas:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/areas', authMiddleware, async (req, res) => {
    const { coordinates, imageUrl } = req.body;
    try {
        const area = new Area({ coordinates, imageUrl, user: req.user._id });
        await area.save();
        res.redirect('/map');
    } catch (error) {
        console.error('Error saving area:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/areas/:id', authMiddleware, async (req, res) => {
    try {
        const area = await Area.findById(req.params.id);
        if (!area) return res.status(404).send('Area not found');
        res.render('areaDetails', { area });
    } catch (error) {
        console.error('Error fetching area:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/js/map.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/map.js'));
});

module.exports = router;
