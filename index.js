const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();


app.use(bodyParser.json());
app.use(cors());
app.use(express());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7xlib.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const buy = client.db("express-shop").collection("buy");
  const sell = client.db("express-shop").collection("sell");

  console.log("Database connected");

  app.post("/buy", (req, res) => {
    buy.insertOne(req.body).then((result) => {
      console.log(result);
      res.send(result.insertedCount > 0);
    });
  });

  app.post("/sell", (req, res) => {
    sell.insertOne(req.body).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at ${process.env.PORT}`);
});
