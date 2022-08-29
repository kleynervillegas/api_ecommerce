import jwt from 'jsonwebtoken';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService, ResponseErrors } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { VALIDATESCHEMA } from '../common/utils/Constants.js';
import express from 'express';
import * as validatorExpress from 'express-validator';

const validatePublication = express.Router();

//Traduccion de Parametros de Entrada
const params = {
  title: 'Title',
  description: 'Description',
  image: 'image',
  featured: 'featured',
  body_news: 'body_news',
  gallery: 'gallery',
  categories: "Categories"
}


validatePublication.post(URLS.createPublication, [
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
    .isLength({ max: 255 })
    .withMessage(VALIDATESCHEMA.maxLength),
  validatorExpress.check('image', VALIDATESCHEMA.required)
    .custom(value => {
      const sizeImage = Buffer.from(value.substring(value.indexOf(',') + 1));
      if (sizeImage.length > 1000000) {
        return Promise.reject(VALIDATESCHEMA.sizeImage);
      }
      return true;
    })
    .notEmpty(),
  validatorExpress.check('gallery', VALIDATESCHEMA.required)
    .isArray()
    .withMessage(VALIDATESCHEMA.array)
    .custom(async value => {
      let count = 0;
      if (value.length > 0) {
        const validatorImage = value.reduce(function (count, element) {
          const sizeImage = Buffer.from(element.substring(element.indexOf(',') + 1));
          if (sizeImage.length > 1000000) {
            count = count + 1;
            return count;
          }
          return count
        }, count);

        if (validatorImage > 0) {
          return Promise.reject(VALIDATESCHEMA.sizeImage);
        }
        return true;
      }
      return true;
    }),
  validatorExpress.check('categories', VALIDATESCHEMA.required)
    .notEmpty()
    .isArray()
    .withMessage(VALIDATESCHEMA.array),
  validatorExpress.check('featured', VALIDATESCHEMA.required)
    .notEmpty()
    .isBoolean()
    .withMessage(VALIDATESCHEMA.boolean),
  validatorExpress.check('body_news', VALIDATESCHEMA.required)
    .notEmpty(),
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

export default validatePublication;

