import { response, Router } from "express";
import Pogmessages from "../database/models/pogmessages.js";
import express from "express";

const router = Router();
router.use(express.json());

router.use(
  express.urlencoded({
    extended: true,
  })
);

router.post("/fetchmail", async (req, res) => {
  if (
    req.body.email === "schunke.andy@gmail.com" ||
    req.body.email === "dannimalka.iag@gmail.com"
  ) {
    const pogged = await Pogmessages.find();
    if (!pogged) return res.status(404).send("NOT FUCKING FOUND");
    return res.json(pogged);
  }
  res.status(403).json({ message: "No access buddy!" });
});
router.post("/", (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.description ||
    !req.body.priority
  ) {
    res.status(400).send("invalid call");
  }
  res.send(req.body);
  const mailData = req.body;

  const priorityChanger = {
    low: 1,
    medium: 2,
    heigh: 3,
  };

  const databaseEntry = {
    name: mailData.name,
    email: mailData.email,
    description: mailData.description,
    priority: priorityChanger[mailData.priority],
  };
  Pogmessages.create(databaseEntry);
});

export default router;
