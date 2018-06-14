const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
let stringifyFile;

app.use(bodyParser.json());

app.get('/getNote', function(req, res) {
	fs.readFile('./test.json', 'utf8', function(err, data) {
		if (err) throw err;
		stringifyFile = data;
		res.send(data);
	});
});

app.post('/updateNote/:note', function(req, res) {
	stringifyFile += req.params.note;
	fs.writeFile('./test.json', stringifyFile, function(err) {
		if (err) throw err;
		console.log('file updated');
	});
});

app.listen(3000);

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});