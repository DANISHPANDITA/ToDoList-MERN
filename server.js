import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Todos from "./model.js";

const app = express();
const url = "mongodb+srv://DANISH:Pandita@0002@cluster0.5aaai.mongodb.net/Todos?retryWrites=true&w=majority";
const PORT = 4000;

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

//Get all TODOS:
app.get("/", (req, res) =>
  Todos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
);

//GET A TODO BY ID:
app.get("/:id", (req, res) => {
  Todos.findById(req.params.id).then((data) => res.status(200).send(data));
});

//UPLOAD A TODO:
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

//UPDATE A TODO:
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

//DELETE A TODO:
app.delete("/:id", (req, res) => {
  Todos.findByIdAndRemove(req.params.id).exec();
});

//INITIAL CHECK:
app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}`);
});
