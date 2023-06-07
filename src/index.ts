import server from './config/server'
import { conn } from './config/db'
import 'dotenv/config'

let PORT: string | undefined
if (process.env.PORT != null) PORT = process.env.PORT
else PORT = '3002'

// Syncing all the models at once.
conn.sync({ force: false }).then(() => { //! False Finish
  console.log('DB conectada, master')
  server.listen(PORT, () => {
    console.log('Master, server levantado en port', PORT)
  })
})
