const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Port Number
const port = 5555;

//Set Static Folder
app.use(express.static(path.join(__dirname, "dist")));

// Body Parser Middleware
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

// Router
app.use("/api", require("./routes/login"));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

async function startup() {
  console.log("Starting application...");
  try {
    app.listen(port, () => console.log("Server started on port " + port));
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }
}

startup();
