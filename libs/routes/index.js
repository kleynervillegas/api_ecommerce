import { Router } from 'express';
const router = Router();
import { URLS } from '../common/utils/urls.js';
import LoginController from '../controllers/LoginController.js';
import UserController from '../controllers/UserController.js';
import AuthToken from '../middleware/AuthToken.js';


router.post(URLS.login, LoginController)
//users
router.post(URLS.userCreate, UserController)
router.put(URLS.userEdit, AuthToken, UserController)
router.delete(URLS.userDisabled, AuthToken, UserController)
router.put(URLS.userActive, AuthToken, UserController)
router.put(URLS.userPasswordChange, AuthToken, UserController)
router.put(URLS.userPasswordRecovery, UserController)
router.get(URLS.getAllUser, UserController)
router.get(URLS.getOneUser, UserController)
router.post(URLS.validateUser, UserController)

router.get(URLS.version, function (req, res) {
    res.json({
        version: process.env['VERSION']
    })
})

export default router
