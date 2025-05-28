import express from 'express'
import { authenticateUser } from '../models/auth.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await authenticateUser(username, password)

  if (!user) {
    return res.status(401).send('Usuario o contraseña incorrectos.')
  }

  req.session.userId = user.id
  res.redirect('/')
})

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

export default router
