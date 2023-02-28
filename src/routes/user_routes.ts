import { Router } from 'express'
import { loginHandler, signUpHandler } from '../controller/user_controller';
import { geneAccessToken } from '../middleware/refresh_token_check';



const router: Router = Router();


router.route('/signup').post(signUpHandler)
router.route('/login').post(loginHandler)

export default router;