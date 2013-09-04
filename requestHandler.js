var querystring = require("querystring");
var fs = require("fs");


function start(response) {
	console.log("Request handler 'start' was called.");

		var body = fs.createReadStream("index.html")
		response.writeHead(200, {"Content-Type": "text/html"});
		body.pipe(response);
		

}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You've sent: " + postData);
	response.end();
}


exports.start = start;
exports.upload = upload;