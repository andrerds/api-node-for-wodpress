const express = require('express');
const { getPlanos } = require('../controllers/planosController');

const router = express.Router();

router.get('/', getPlanos);

module.exports = router;
