import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Todos from "./model.js";

const app = express();
const url =
  "mongodb+srv://DANISH:Pandita@0002@cluster0.5aaai.mongodb.net/Todos?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Cound not connect");
  });

const PORT = 4000;

app.get("/", (req, res) =>
  Todos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
);
app.get("/:id", (req, res) => {
  Todos.findById(req.params.id).then((data) => res.status(200).send(data));
});

app.post("/upload", (req, res) => {
  const model = req.body;
  Todos.create(model, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.patch("/:id", (req, res) => {
  Todos.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});
app.delete("/:id", (req, res) => {
  Todos.findByIdAndRemove(req.params.id).exec();
});
app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}`);
});
