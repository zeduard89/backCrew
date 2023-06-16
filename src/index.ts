import server from "./config/server"
import { sequelize } from "./config/db"
import "dotenv/config"

let PORT: string | undefined
if (process.env.PORT != null) PORT = process.env.PORT
else PORT = "3002"

// Syncing all the models at once.
sequelize
  .sync({ force: false })
  .then(() => {
    server.listen(PORT, () => {
      console.log("Master, servidor levantado en el puerto", PORT)
    })
  })

  .catch((error) => {
    console.error("Error al sincronizar los modelos de Sequelize:", error)
  })
