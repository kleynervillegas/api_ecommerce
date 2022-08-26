import { Router } from 'express';
const router = Router();
import { URLS } from '../common/utils/urls.js';
import LoginController from '../controllers/LoginController.js';
import UserController from '../controllers/UserController.js';
import AuthToken from '../middleware/AuthToken.js';
import PublicationController from '../controllers/PublicationController.js';
import CategoriesController from '../controllers/CategoriesController.js';
import RolesController from '../controllers/RolesController.js'
import GalleryVideostroller from '../controllers/GalleryVideosController.js'

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
//publications
router.post(URLS.createPublication, AuthToken, PublicationController);
router.get(URLS.getPublications, PublicationController);
router.get(URLS.getAllPublications, PublicationController);
router.delete(URLS.disabledPublications, AuthToken, PublicationController);
router.put(URLS.activePublications, AuthToken, PublicationController);
router.post(URLS.editPublications, AuthToken, PublicationController);
router.get(URLS.getOnePublications, PublicationController);
router.get(URLS.getOneTokenPublications, AuthToken, PublicationController);
router.delete(URLS.deleteImagen, AuthToken, PublicationController);
//categories
router.post(URLS.createCategory, AuthToken, CategoriesController);
router.get(URLS.getAllCategories, CategoriesController);
router.get(URLS.getOneCategory, CategoriesController);
router.delete(URLS.daleteCategory, AuthToken, CategoriesController);
router.put(URLS.editCategory, AuthToken, CategoriesController);
router.get(URLS.getListCategories, CategoriesController);
router.put(URLS.activeCategory, AuthToken, CategoriesController);
//Roles
router.post(URLS.createRole, AuthToken, RolesController);
router.get(URLS.getAllRoles, RolesController);
router.get(URLS.getListRoles, RolesController);
router.get(URLS.getOneRole, RolesController);
router.delete(URLS.deleteRole, AuthToken, RolesController);
router.put(URLS.activeRole, AuthToken, RolesController);
router.put(URLS.editRole, AuthToken, RolesController);
//Videos
router.post(URLS.createVideo, AuthToken, GalleryVideostroller);
router.get(URLS.getAllVideos, GalleryVideostroller);
router.get(URLS.getListVedios, GalleryVideostroller);
router.get(URLS.getOneVideo, GalleryVideostroller);
router.delete(URLS.deleteVideo, AuthToken, GalleryVideostroller);
router.put(URLS.activeVideo, AuthToken, GalleryVideostroller);
router.put(URLS.editvideo, AuthToken, GalleryVideostroller);


router.get(URLS.version, function (req, res) {
    res.json({
        version: process.env['VERSION']
    })
})

export default router
