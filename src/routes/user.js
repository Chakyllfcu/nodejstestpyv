const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();


router.post("/users", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user already exists with the given email
    const existingUser = await userSchema.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // If the user doesn't exist, create a new user
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
// create user
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});*/

// get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/*// delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});*/

// update a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, password, email, status } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, password, email, status } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;