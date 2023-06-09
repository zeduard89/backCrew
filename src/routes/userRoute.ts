// import { Request, Response, Router } from 'express'
import { Router } from 'express'
import { loginUser } from '../controllers/user/User'

const router = Router()

router.post('/login', loginUser)

export { router }
