import { Router } from 'express'
import { refreshToken } from '../controller/token_controller';

const router = Router();


// generating new refresh token
router.route('/').post(refreshToken)
export default router