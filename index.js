import express from 'express'
import nunjucks from 'nunjucks'
import bcrypt from 'bcrypt'
import session from 'express-session'
import SQLiteStore from 'connect-sqlite3'
import { sequelize } from './db/sequelize.js'
import { User } from './models/user.js'
import userRouter from './router/users.js'
import authRoutes from './router/auth.js'

const app = express()
const port = 3000

// Configuración de sesiones con SQLite
const SQLiteStoreSession = SQLiteStore(session)
const sessionStore = new SQLiteStoreSession({
  db: 'sessions.sqlite',
  dir: './db',
  table: 'sessions'
})

app.use(session({
  store: sessionStore,
  secret: '1234',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400000 } // 1 día
}))

// Configuración de Nunjucks
nunjucks.configure('views', { autoescape: true, express: app })
app.set('view engine', 'njk')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use('/users', userRouter)
app.use('/', authRoutes)

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).send('Todos los campos son obligatorios.')
  try {
    await User.create({ name: username, password: await bcrypt.hash(password, 10) })
    res.redirect('/login')
  } catch (error) {
    res.status(500).send('Error al registrar usuario.')
  }
})

// Inicialización de la base de datos
const initializeApp = async () => {
  await sequelize.sync({ force: true })
  console.log('Base de datos inicializada.')
  app.listen(port, () => console.log(`Servidor en http://localhost:${port}`))
}

initializeApp()
