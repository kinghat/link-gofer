const { spawn } = require("child_process");

const Registry = require("winreg-utf8");

const browserRegistryKey = Registry({
	hive: Registry.HKCU,
	key: "",
});
