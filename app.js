const express = require("express");
const app = express();

const axios = require("axios");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));




const mongoose = require('mongoose');


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/signup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Define a schema for users
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Create a model for users
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/signup', (req, res) => {
  res.sendFile(__dirname +'/signup.html');
});

// Signup Route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Create a new user instance
  const newUser = new User({
    username,
    password,
  });

  // Save the user to the database
  newUser.save((err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error signing up');
    } else {
      console.log('User signed up:', user);
      
      
      res.redirect("/");
    }
  });
});

app.get('/signin', (req, res) => {
  res.sendFile(__dirname +'/signin.html');
});
// Signin Route
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the database
  User.findOne({ username, password }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error signing in');
    } else if (!user) {
      res.status(404).send('Username or password not found');
    } else {
      console.log('User signed in:', user);
      res.status(200).send('Signin successful');
    }
  });
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// app.post("/getnews", async(req, res) => {
//     const categ = req.body.category;
//     try {
        
//         const response =  await axios.get('https://newsapi.org/v2/top-headlines?country=in&category='+categ+'&apiKey=5ae3376c79754af58a622a8a3cafcea7');
//         // Extract the articles from the response
//         const desc1 = response.data.articles[1].description;
//         const img1 = response.data.articles[1].urlToImage;

//         const desc2 = response.data.articles[3].description;
//         const img2 = response.data.articles[3].urlToImage;

//         const desc3 = response.data.articles[5].description;
//         const img3 = response.data.articles[5].urlToImage;

//         const desc4 = response.data.articles[7].description;
//         const img4 = response.data.articles[7].urlToImage;

//         const desc5 = response.data.articles[9].description;
//         const img5 = response.data.articles[9].urlToImage;
//         res.write("<h1>Headline 1:</h1>");
//         res.write(desc1);
//         res.write("<img src="+img1+" height="+400+">")

//         res.write("<h1>Headline 2:</h1>");
//         res.write(desc2);
//         res.write("<img src="+img2+" height="+400+">")

//         res.write("<h1>Headline 3:</h1>");
//         res.write(desc3);
//         res.write("<img src="+img3+" height="+400+">")

//         res.write("<h1>Headline 4:</h1>");
//         res.write(desc4);
//         res.write("<img src="+img4+" height="+400+">")

//         res.write("<h1>Headline 5:</h1>");
//         res.write(desc5);
//         res.write("<img src="+img5+" height="+400+">")
        
//         res.end();
        
    
//         // Send the articles as the API response
//       } catch (error) {
//         console.error('Error fetching news:', error.message);
//         // res.status(500).json({ error: 'Failed to fetch news' });
//       }

// });

app.post("/getnews", async(req, res) => {
  const categ = req.body.category;
  try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=' + categ + '&apiKey=5ae3376c79754af58a622a8a3cafcea7');
      
      // Send the articles as the API response
      res.write("<!DOCTYPE html>");
      res.write("<html lang='en'>");
      res.write("<head>");
      res.write("<meta charset='UTF-8'>");
      res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
      res.write("<title>Newsify</title>");
      res.write("<style>");
      res.write(".container { max-width: 800px; margin: 0 auto;}");
      res.write(".article { margin-bottom: 20px; padding: 20px; border: 1px solid #ccc; border-radius: 10px;}");
      res.write(".article img { max-width: 100%; height: auto; margin-bottom: 10px;}");
      res.write("</style>");
      res.write("</head>");
      res.write("<body>");
      res.write("<div class='container'>");
      response.data.articles.forEach((article, index) => {
          if (index < 5) {
              res.write("<div class='article'>");
              res.write("<h2>" + article.title + "</h2>");
              if (article.urlToImage) {
                  res.write("<img src='" + article.urlToImage + "' alt=''>");
              }
              res.write("<p>" + article.description + "</p>");
              res.write("<a href='" + article.url + "' target='_blank'>Read more</a>");
              res.write("</div>");
          }
      });
      res.write("</div>");
      res.write("</body>");
      res.write("</html>");
      res.end();
  } catch (error) {
      console.error('Error fetching news:', error.message);
      res.status(500).json({ error: 'Failed to fetch news' });
  }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
})