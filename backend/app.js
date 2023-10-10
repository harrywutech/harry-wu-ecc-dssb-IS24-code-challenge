const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const productsRoutes = require("./routes/products-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

app.use("/api/products", productsRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Cloud not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
