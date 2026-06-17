const express = require('express');
const router = express.Router();


//Test Route @route GET api/post
// desc             Test route 
// @access          Public 
router.get('/', (req, res) => res.send('Posts route'))

//export route to be used in server.js
module.exports = router;