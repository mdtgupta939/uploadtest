// Default Packages.
const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

// Constants
TEMP_FOLDER_PATH = "./public/tmp";

app.use(fileUpload({ useTempFiles: true, tempFileDir: TEMP_FOLDER_PATH }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  if (req.files) {
    req.files.file.mv("./uploads/" + req.files.file.name, function (
      err,
      success
    ) {
      if (err) {
        console.log("Error in saving file - ", err);
        return res.statusCode(500);
      }
      console.log("File saved");
      res.download("./uploads/" + req.files.file.name , function (downloadError) {
        if (downloadError) {
          console.log("Error in downloading file.\n", downloadError);
          return res.sendStatus(500);
        }
        console.log("File downloaded");
      });
    });
  }
});

app.listen(3000);
