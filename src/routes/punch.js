const express = require("express");
const punchSchema = require("../models/punch");
const userSchema = require('../models/user'); // Ajusta la ruta según la estructura de tu proyecto


const router = express.Router();

// create punch
router.post("/punches", async (req, res) => {
    try {
      // Extraer datos del cuerpo de la solicitud
      const { userId, entryDate } = req.body;
  
      // Verificar si el usuario existe en la tabla 'users'
      const existingUser = await userSchema.findById(userId);
  
      if (!existingUser) {
        // Si el usuario no existe, enviar una respuesta indicando que el usuario no es válido
        return res.status(400).json({ message: 'El usuario no existe en la tabla de usuarios.' });
      }
  
      // Verificar si ya existe un punch con el mismo userId y entryDate
      const existingPunch = await punchSchema.findOne({ userId, entryDate });
  
      if (existingPunch) {
        // Si ya existe un punch con el mismo userId y entryDate, verificar si el usuario es diferente
        if (existingPunch.userId !== userId) {
          // Si el usuario es diferente, permitir la inserción
          const newPunch = new Punch(req.body);
          const savedPunch = await newPunch.save();
          return res.status(201).json(savedPunch);
        } else {
          // Si el usuario es el mismo, enviar una respuesta indicando que ya existe
          return res.status(400).json({ message: 'Punch ya registrado con el mismo usuario y entryDate.' });
        }
      }
  
      // Si no existe, crear un nuevo punch y guardarlo en la base de datos
      const newPunch = new punchSchema(req.body);
      const savedPunch = await newPunch.save();
  
      res.status(201).json(savedPunch);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

// get all users
router.get("/punches", (req, res) => {
  punchSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get("/punches/:id", (req, res) => {
  const { id } = req.params;
  punchSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a user
router.delete("/punches/:id", (req, res) => {
  const { id } = req.params;
  punchSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a user
router.put("/punches/:id", (req, res) => {
  const { id } = req.params;
  const { entryDate, userId, outDate, status } = req.body;
  punchSchema
    .updateOne({ _id: id }, { $set: { entryDate, userId, outDate, status } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;