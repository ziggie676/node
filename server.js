var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

function start(route, handle) {
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		if (/\/static\/.*/.test(pathname)) {
			console.log("made it here")
		 	staticFiles(request, response);}
		else { console.log ("Help me!") 

		request.setEncoding("utf8");

		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});


		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

function staticFiles(request, response) {

	console.log("Request staticFiles");
	console.log(request.url);
	path.normalize(request.url)
	console.log(request.url)

	fs.createReadStream(__dirname + "/." + request.url).pipe(response).on("end", function(){
		response.end()
	})

}

exports.start = start