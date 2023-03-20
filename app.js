const express = require('express'),
bodyParser    = require('body-parser'),
dotenv        = require('dotenv').config(),
app           = express();

// open AI configs
const { Configuration, OpenAIApi } = require('openai'),
configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}),
openai = new OpenAIApi(configuration);

// server configs
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// local variable
app.use((req, res, next) => {
    res.locals.prompt = req.body.prompt;
    next();
})

// routes
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', async (req, res) => {
    const { prompt } = req.body;
    const result = {};
    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
        })
        result.imgURL = response.data.data[0].url;
        result.altText = prompt;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        result.altText = 'The image could not be generated. ' + error;
    }
    res.render('result', {result, prompt});
})

// launch
app.listen(process.env.PORT || 3500, process.env.IP, () => {
    console.log('server started at 3500');
})
