import { sequelize } from './sequelize.js'

const initDB = async () => {
  try {
    await sequelize.sync({ force: true })
  } catch (error) {
    console.error('Error initializing the database:', error)
  }
}

initDB()
