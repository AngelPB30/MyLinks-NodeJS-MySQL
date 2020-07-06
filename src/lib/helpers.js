const bcryptjs = require('bcryptjs')
const helpers = {}

helpers.encrypPassword = async (password) => {
	const salt = await bcryptjs.genSalt(10);
	const hash = await bcryptjs.hash(password, salt)
	return hash;
};

helpers.matchPassword = async (password, savePassword) =>{
	try {
		return await bcryptjs.compare(password, savePassword)		
	} catch (e) {
		console.log(e);
	}
};

module.exports = helpers