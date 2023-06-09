import { Router, Request, Response } from 'express'
import toNewProyects from '../utils/utilsProyects'

const router = Router()

router.post('/', (req: Request, res: Response) => {
  try {
    const newProject = toNewProyects(req.body)

    // Aquí puedes realizar las operaciones necesarias para agregar el nuevo proyecto
    // Por ahora, solo se asigna un valor de ejemplo
    console.log(newProject)

    res.json(newProject)
  } catch (error) {
    res.status(400).send(error.message || 'Error Desconocido')
  }
})

export { router }
