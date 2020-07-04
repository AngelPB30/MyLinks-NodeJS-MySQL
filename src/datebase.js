const mysql = require('mysql');
const { promisify } = require('util')

const { database } = require('./key')

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
	if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.error('DATABASE CONNECTION WAS CLOSED');
		}
		if (err.code === 'ER_CON_COUNT_ERROR') {
			console.error('DATABASE HAS TO WAY CONNECTIONS');
		}
		if (err.code === 'ECOMNREFUSED') {
			console.error('DATABASE CONNECTION WAS REFUSED');
		}
		if (err) {
			console.log('Connection BD error => CODE: ' + err.code);
		}
	}

	if (connection) {
		connection.release();
		console.log('[2] - BD is connected: ', database.database);
	}
});
// Promisify query (convertir callback en promesas)
pool.query = promisify(pool.query);

module.exports = pool;