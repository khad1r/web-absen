require("dotenv").config();
//use path module
const path = require("path");
//use express module
const express = require("express");
//use hbs view engine
const hbs = require("hbs");
//use bodyParser middleware
const bodyParser = require("body-parser");
//use mysql database
const mysql = require("mysql");
const app = express();

//konfigurasi koneksi
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//connect ke database
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

//set views file
app.set("views", path.join(__dirname, "views"));
//set view engine
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route untuk homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/frontpage.html");
});
//route untuk portal mahasiswa
app.get("/mahasiswa", (req, res) => {
  res.sendFile(__dirname + "/views/mahasiswa.html");
});
// route kalau mahasiswa absen
app.post("/mahasiswa/absen", (req, res) => {
  var NIM = req.body.nim;
  var Nama = req.body.nama;
  var Status_absen = 1;
  var lokasi = req.body.lokasi;

  let sql =
    "SELECT * FROM absensi WHERE NIM='" + NIM + "' AND Nama='" + Nama + "'";
  let query = conn.query(sql, (err, results) => {
    if (err) res.redirect("/mahasiswa?alert=" + err);
    if (!results.length > 0) {
      res.redirect("/mahasiswa?alert=mahasiswa tidak ditemukan");
    } else {
      let newsql =
        "UPDATE absensi set NIM='" +
        NIM +
        "', Nama='" +
        Nama +
        "', Status_absen='" +
        Status_absen +
        "', lokasi='" +
        lokasi +
        "' WHERE NIM='" +
        NIM +
        "'";
      let newquery = conn.query(newsql, (err, results) => {
        if (err) res.redirect("/mahasiswa?alert=" + err);
        res.redirect("/mahasiswa?alert=Absensi Berhasil");
      });
    }
  });
});
//route untuk portal Dosen
app.get("/dosen", (req, res) => {
  let sql = "SELECT * FROM absensi";
  let query = conn.query(sql, (err, results) => {
    if (err) res.redirect("/dosen?alert=" + err);
    res.render("dosen", {
      results: results,
    });
  });
});
//route kalau dosen mulai absen baru
app.get("/dosen/mulai", (req, res) => {
  let data = {
    status_absen: "false",
    lokasi: "/notFound",
  };
  let sql = "UPDATE absensi SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) res.redirect("/dosen?alert=" + err);
    res.redirect("/dosen?alert=absen dimulai");
  });
});
//route kalau lokasi belum ada
app.get("/notFound", (req, res) => {
  res.send("<h1>Belum ada Lokasi</h1>");
});
//server listening
app.listen(process.env.PORT, () => {
  console.log("Server is running at port http://localhost:" + process.env.PORT);
});
