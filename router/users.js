import express from 'express'
import { User } from '../models/user.js'

const router = express.Router()

// Listar todos los usuarios
router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

// Registrar un nuevo usuario
router.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' })
  }

  try {
    await User.create({ name: username, password })
    res.status(201).json({ message: 'Usuario creado exitosamente.' })
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario.' })
  }
})

export default router
