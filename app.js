const express   = require('express');
const axios     = require('axios');
const ejs       = require('ejs');
const app       = express();
const PORT      = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', ejs);

app.get('/', (req, res) => {
	// res.render('index.ejs', {countryTitle: responce.data.countrytimelinedata[0].info.title});

	let url = 'https://api.thevirustracker.com/free-api?countryTimeline=EE';

	axios.get(url)
		.then((responce) => {
			let dateKeys1 = [];
			for (let key in responce.data.timelineitems[0]) {
				if (key !== 'stat') {
					dateKeys1.push(key);
				}
			}
			// res.render('index.ejs', {countryTitle: responce.data.countrytimelinedata[0].info.title, dates: dateKeys});
			res.render('index.ejs', {countryTitle: responce.data.countrytimelinedata[0].info.title, result: responce.data});

			console.log(responce.data.timelineitems[0][dateKeys1[0]].new_daily_cases);

		})
		.catch((error) => {
			console.log(error);
		})
});

app.listen(PORT, () => {
	console.log('Server is running');
});