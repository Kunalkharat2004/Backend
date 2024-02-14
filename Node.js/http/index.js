const http = require("http");
const path = require("path");
const fs = require("fs");

const app = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "home.html" : req.url + ".html"
  );

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, "public", "error.html"), (err, data) => {
        if (err) {
          res.writeHead(500, res.end("Error!!."));
        } else {
          res.writeHead(404, {
            "Content-Type": "text/html",
          });
          res.end(data);
        }
      });
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(data);
    }
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
