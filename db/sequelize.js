import { Sequelize } from 'sequelize'

// Con export hacemos que la variable sequelize sea exportable
export const sequelize = new Sequelize({
  dialect: 'sqlite', // Que tipo de base de datos estamos usando
  storage: 'db/database.sqlite', // Donde se va a guardar la base de datos
  logging: false // Desactiva los logs de SQL
})
