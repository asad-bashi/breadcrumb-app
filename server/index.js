import express from "express";
import cors from "cors";
import data from "./data.js";

const app = express();

app.use(cors());
app.get("/path/:mypath", (req, res) => {
  const { mypath } = req.params;
  const breadcrumps = [];

  function loopOverObj(obj) {
    for (const property in obj) {
      if (property === mypath) {
        return res.send([{ ...obj[property], mypath }, breadcrumps]);
      }
      if (typeof obj[property] === "object") {
        const innerObj = obj[property];
        const name = Object.keys(innerObj)[0];
        if (
          typeof innerObj[name] === "object" &&
          innerObj[name].type === "dir"
        ) {
          breadcrumps.push(name);
        }
        loopOverObj(innerObj);
      }
    }
  }
  loopOverObj(data);
});

app.listen(3000);
