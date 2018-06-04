var fs = require('fs');
var resume = JSON.parse(fs.readFileSync('./resume.json','utf8'));
var theme = require('./index.js');

fs.writeFile('index.html', render(), function(err) {
	if (err) {
		console.log('Build err: ' + err);
	} else {
		console.log('Log: Successfully written to build folder');
	}
});

function render() {
	try {
		return ""; //theme.render(resume);
	} catch (e) {
		console.log(e.message);
		return "";
	}
}

