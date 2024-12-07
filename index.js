const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // used for read the folder
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});
app.get("/files/:fileName", (req, res) => {
  fs.readFile(`./files/${req.params.fileName}`, "utf8", (err, filedata) => {
    res.render("show", {
      filename: req.params.fileName,
      filedata: filedata,
    });
  });
});
app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});
app.post("/edit", (req, res) => {
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    (err) => {
      console.log(err);
    }
  );
  res.redirect("/");
});

app.post("/create", (req, res) => {
  let title = req.body.title;
  let details = req.body.details;
  var filesDetails = `./files/${title.split(" ").join("")}.txt`;
  fs.writeFile(filesDetails, details, (err) => {
    console.log(err);
    res.redirect("/");
  });
});
//dynamic routing
// app.get("/profile/:username", (req, res) => {
//   console.log(`welcome back ${req.params.username}`);
//   res.send("profile page vikas");
// });
// app.get("/profile/:username/:age", (req, res) => {
//   console.log(`welcome back ${req.params.username} and ${req.params.age}`);
//   res.send("profile page vikas");
// });
app.listen(3000, () => {
  console.log("server running");
});
