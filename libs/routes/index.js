import { Router } from 'express';
const router = Router();
import { URLS } from '../common/utils/urls.js';
import LoginController from '../controllers/LoginController.js';
import UserController from '../controllers/UserController.js';
import PublicationController from '../controllers/PublicationController.js';
import NotificationController from '../controllers/NotificationController.js';
import CarsController from '../controllers/CarsController.js';
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
////piblications
router.get(URLS.getAllPublications,AuthToken, PublicationController)
router.get(URLS.getOnePublications,AuthToken, PublicationController)
router.post(URLS.createPublication,AuthToken, PublicationController)
router.delete(URLS.disabledPublications,AuthToken, PublicationController)
////Notifications
router.get(URLS.getAllNotificationsUser,AuthToken, NotificationController)
router.put(URLS.disabledNotify,AuthToken, NotificationController)
////cars
router.post(URLS.addCars,AuthToken, CarsController)
router.get(URLS.getAllCarsUser,AuthToken, CarsController)

router.get(URLS.version, function (req, res) {
    res.json({
        version: process.env['VERSION']
    })
})

export default router
