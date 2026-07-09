'use strict';

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title:       'Welcome',
    description: 'CleanTrack NextGen — Smart Waste Collection Verification System'
  });
});

module.exports = router;
