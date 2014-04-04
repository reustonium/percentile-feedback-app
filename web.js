var http = require('http')
var port = process.env.PORT || 5000;

var server = http.createServer(function (req, res){
	res.writeHead(200, {
		'Content-Type':'text/plain'
	})
	res.write("hi!")
	res.end()
})

server.listen(port)