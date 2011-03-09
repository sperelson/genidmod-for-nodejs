/* 
GenID.js
--------
Test server for the GenIDMad.js node module
Example call: http://localhost:8543/?num=1000
*/

var url = require('url');
var http = require('http');
var gid = require('./genidmod.js');

http.createServer(function (req, res) {
	var query = url.parse(req.url, true)
	var iti = 1;
	if (query['query']['num'] && (!isNaN(parseInt(query['query']['num'])) && isFinite(query['query']['num']))) {
		iti = query['query']['num']
		if (iti > 10000)
			iti = 10000
	}
	var genid = new gid.genid
	var line = '{' + '"id0":"' + genid.gen() + '"'

	if (iti > 1)
		for (var i = 1; i < iti; i++)
			line = line + ', "id' + i + '":"' + genid.gen() + '"'
	line = line + '}'
	res.writeHead(200, {'Content-Type': 'application/json'})
	res.end(line)
}).listen(process.env.PORT || 8543);
