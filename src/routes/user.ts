import { Router } from 'express'
import { loginUser } from '../controllers/User'
const router = Router()

router.post('/login', loginUser)

//router.post('/register', registerUser)

export { router }
