var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/scripts', express.static(__dirname + '/node_modules/chart.js/dist/'));
app.use('/scripts', express.static(__dirname + '/views/'));

const PORT = process.env.PORT || 5000

var data = [];

var counter = 0;

const getCurrentTimeStr = () => {
    const currentTime = new Date();
    const timeStr = currentTime.getHours() + ':' +
        currentTime.getMinutes() + ':' +
        currentTime.getSeconds();

    return timeStr;
};

app.get('/', (req, res) => {
    res.render('index.ejs', { data });
});

app.post('/save-temp', (req, res) => {
    const temp = req.body.temp;

    console.log(req.body.temp);

    if (data.length === 20) {
        counter = 0;
        data = [];
    }

    counter++;
    // Получить время
    const timeStr = getCurrentTimeStr();
    // Добавить данные в массив
    data.push({
        time: timeStr,
        data: temp
    });

    res.send(temp);
});

app.get('/get-temp', (req, res) => {
    res.send(data);
})

app.listen(PORT, () => {
    console.log(`Working on port ${PORT}`);
});