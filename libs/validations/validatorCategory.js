import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService, ResponseErrors } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { VALIDATESCHEMA } from '../common/utils/Constants.js';
import express from 'express';
import * as validatorExpress from 'express-validator';
import ModelCategories from '../models/Categories.js'

const validatorCategory = express.Router();

//Traduccion de Parametros de Entrada
const params = {
  name: 'Name',
  category_id:'category_id'
}


validatorCategory.post(URLS.createCategory, [
  validatorExpress.check('name', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 100 })
    .withMessage(VALIDATESCHEMA.maxLength)
    .custom(async (value) => {
      const category = await ModelCategories.findOne({ where: { name: value } })
      if (category !== null) {
        return Promise.reject(MESSAGES.notCreate)
      }
      return true;
    }),
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

validatorCategory.put(URLS.editCategory, [
  validatorExpress.check('category_id',VALIDATESCHEMA.required)
  .notEmpty(),
  validatorExpress.check('name', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 100 })
    .withMessage(VALIDATESCHEMA.maxLength)
    .custom(async (value) => {
      const category = await ModelCategories.findOne({ where: { name: value } })
      if (category !== null) {
        return Promise.reject(MESSAGES.notCreate)
      }
      return true;
    }),
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

export default validatorCategory;

