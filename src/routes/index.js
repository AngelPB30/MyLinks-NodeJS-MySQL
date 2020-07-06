const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
	res.render('Layouts/index')
})

module.exports = router;