import jwt from 'jsonwebtoken';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService, ResponseErrors } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { VALIDATESCHEMA } from '../common/utils/Constants.js';
import express from 'express';
import * as validatorExpress from 'express-validator';
import ModelRoles from '../models/Roles.js'

const validatorGalleryVideos = express.Router();

//Traduccion de Parametros de Entrada
const params = {
  name: 'Name',
  description: 'description',
  url_video: 'url_video',
  video_id : "video_id"
}

validatorGalleryVideos.post(URLS.createVideo, [
  validatorExpress.check('title', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 100 })
    .withMessage(VALIDATESCHEMA.maxLength),
  validatorExpress.check('description', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 100 })
    .withMessage(VALIDATESCHEMA.maxLength),
  validatorExpress.check('url_video', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 100 })
    .withMessage(VALIDATESCHEMA.maxLength),
], async (req, res, next) => {

  const errors = validatorExpress.validationResult(req)
  if (!errors.isEmpty()) {
    const response = new ResponseService(
      STATUS.badRequest,
      null,
      await ResponseErrors(params, errors)
    );
    res.status(STATUS.badRequest).send(response);
  } else {
    next()
  }
});

validatorGalleryVideos.put(URLS.editvideo, [
  validatorExpress.check('video_id', VALIDATESCHEMA.required)
    .notEmpty(),
    validatorExpress.check('title', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 100 })
    .withMessage(VALIDATESCHEMA.maxLength),
  validatorExpress.check('description', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 100 })
    .withMessage(VALIDATESCHEMA.maxLength),
  validatorExpress.check('url_video', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 100 })
    .withMessage(VALIDATESCHEMA.maxLength),
], async (req, res, next) => {

  const errors = validatorExpress.validationResult(req)
  if (!errors.isEmpty()) {
    const response = new ResponseService(
      STATUS.badRequest,
      null,
      await ResponseErrors(params, errors)
    );
    res.status(STATUS.badRequest).send(response);
  } else {
    next()
  }
});
export default validatorGalleryVideos;

