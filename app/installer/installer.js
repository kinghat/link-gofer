const { stat } = require("fs").promises;

const isInstalled = async (path) => {
	const status = await stat(path).catch((error) => console.log(error));
	// console.log(`LOG: isInstalled -> status: `, status);

	return status.isFile();
};
module.exports = { isInstalled };
