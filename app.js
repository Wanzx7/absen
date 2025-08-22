const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Melayani file statis di folder public
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

//Database
const database = JSON.parse(fs.readFileSync("database.json", "utf-8"));

// Route utama untuk mengirim file HTML (letaknya di luar folder public)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/data-post", (req, res) => {
  const dataId = req.body.Id;

  const found = database.find(item => item.id === dataId);
  
  if (found){
    console.log(found);
  } else {
    console.log("Gagal Memuat data");
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
