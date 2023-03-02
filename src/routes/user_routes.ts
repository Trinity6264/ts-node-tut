import { Router } from 'express'
import { loginHandler, signUpHandler } from '../controller/user_controller';




const router: Router = Router();


router.route('/signup').post(signUpHandler)
router.route('/login').post(loginHandler)

export default router;