const Express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = Express();
app.use(cors());
app.use(Express.json());

const port = 8000
const apid = process.env.APID ;

app.get("/", (req, res) => {
    res.status(200).json("Server Running");
});

app.get("/getWeather/:city", async (req, res) => {
    const cityName = req.params.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apid}`
    try {
        const apiRes = await fetch(url);
        const json = await apiRes.json();
        res.send(json);
    }
    catch (err) {
        console.log(err);
        res.send("Some error occured");
    }
})

app.listen(port, () => {
    console.log("Server running");
});