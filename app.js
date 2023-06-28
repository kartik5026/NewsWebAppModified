const express = require("express");
const app = express();

const axios = require("axios");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/getnews", async(req, res) => {
    const categ = req.body.category;
    try {
        
        const response =  await axios.get('https://newsapi.org/v2/top-headlines?country=in&category='+categ+'&apiKey=5ae3376c79754af58a622a8a3cafcea7');
        // Extract the articles from the response
        const desc1 = response.data.articles[1].description;
        const img1 = response.data.articles[1].urlToImage;

        const desc2 = response.data.articles[3].description;
        const img2 = response.data.articles[3].urlToImage;

        const desc3 = response.data.articles[5].description;
        const img3 = response.data.articles[5].urlToImage;

        const desc4 = response.data.articles[7].description;
        const img4 = response.data.articles[7].urlToImage;

        const desc5 = response.data.articles[9].description;
        const img5 = response.data.articles[9].urlToImage;
        res.write("<h1>Headline 1:</h1>");
        res.write(desc1);
        res.write("<img src="+img1+" height="+400+">")

        res.write("<h1>Headline 2:</h1>");
        res.write(desc2);
        res.write("<img src="+img2+" height="+400+">")

        res.write("<h1>Headline 3:</h1>");
        res.write(desc3);
        res.write("<img src="+img3+" height="+400+">")

        res.write("<h1>Headline 4:</h1>");
        res.write(desc4);
        res.write("<img src="+img4+" height="+400+">")

        res.write("<h1>Headline 5:</h1>");
        res.write(desc5);
        res.write("<img src="+img5+" height="+400+">")
        
        res.end();
        
    
        // Send the articles as the API response
      } catch (error) {
        console.error('Error fetching news:', error.message);
        // res.status(500).json({ error: 'Failed to fetch news' });
      }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
})