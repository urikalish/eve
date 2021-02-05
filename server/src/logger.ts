export class Logger {
	static log(msg: string) {
		console.log(`[DBG] ${msg}`);
	}

	static warn(msg: string) {
		console.warn(`[WRN] ${msg}`);
	}

	static error(msg: string) {
		console.error(`[ERR] ${msg}`);
	}
}
