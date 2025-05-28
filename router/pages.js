import express from 'express'

const router = express.Router()

// Página principal
router.get('/', (req, res) => {
  res.render('home')
})

export default router
