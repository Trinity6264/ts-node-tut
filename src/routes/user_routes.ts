import { Router } from 'express'
import { loginHandler, signUpHandler } from '../controller/user_controller';



const router: Router = Router();


router.route('/').post(signUpHandler).patch(signUpHandler)

export default router;