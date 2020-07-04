const express = require('express');
const router = express.Router();

const pool = require('../datebase')

router.get('/list', async (req, res) => {
	const links = await pool.query('SELECT * FROM mstlinks');
	res.render('links/list', { links: links })
})

router.get('/new', (req, res) => {
	res.render('links/add')
})

router.post('/add', async (req, res) => {
	const { title, url, description } = req.body;
	const newLink = { title, url, description }
	await pool.query('INSERT INTO mstlinks set ?', [newLink]);
	req.flash('success','Link SAVED successfully!');
	res.redirect('/links/list')
})

router.get('/edit/:id', async (req, res) => {
	const { id } = req.params;
	const links = await pool.query('SELECT * FROM mstlinks where id = ?', [id]);
	res.render('links/edit', { link: links[0] });
})

router.post('/edit/:id', async (req, res) => {
	const { id } = req.params;
	const { title, description, url } = req.body;
	const newLink = { title, description, url }
	await pool.query('UPDATE mstlinks set ? where id = ?', [newLink, id]);
	req.flash('success','Link UPDATE successfully!');		
	res.redirect('/links/list')
})

router.get('/delete/:id', async (req, res) => {
	const { id } = req.params
	await pool.query('DELETE FROM mstlinks WHERE id=?', [id])
	req.flash('success','Link DELETE successfully!');
	res.redirect('/links/list')
})


module.exports = router;
