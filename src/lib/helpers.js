const bcryptjs = require('bcryptjs')
const helpers = {}

helpers.encrypPassword = async (password) => {
	const salt = await bcryptjs.genSalt(10);
	const hash = await bcryptjs.hash(password, salt)
	return hash;
};

helpers.matchPassword = async (password, savepassword) =>{
	try {
		await bcryptjs.compare(password, savepassword)		
	} catch (error) {
		console.log(error);
	}
};

module.exports = helpers