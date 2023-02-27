import { Router } from 'express'
import { loginHandler } from '../controller/user_controller';


 const router: Router = Router();


router.route('/').post(loginHandler)

export default router;