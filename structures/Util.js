
module.exports = class Util {

    static embedURL(title, url, display) {
		return `[${title}](${url.replace(/\)/g, '%27')}${display ? ` "${display}"` : ''})`;
    }
    static base64(text, mode = 'encode') {
		if (mode === 'encode') return Buffer.from(text).toString('base64');
		if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
		throw new TypeError(`${mode} is not a supported base64 mode.`);
    }
    static shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}
	  
	
    static parseQuery(queries) {
		const args = [];
		const flags = [];
		for (const query of queries) {
		  	if (query.startsWith("--")) flags.push(query.slice(2).toLowerCase());
		  	else args.push(query);
		}
		return { args, flags };
	  }
    
}
