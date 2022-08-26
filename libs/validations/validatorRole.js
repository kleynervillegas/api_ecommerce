import jwt from 'jsonwebtoken';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService, ResponseErrors } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { VALIDATESCHEMA } from '../common/utils/Constants.js';
import express from 'express';
import * as validatorExpress from 'express-validator';
import ModelRoles from '../models/Roles.js'

const validatorRole = express.Router();

//Traduccion de Parametros de Entrada
const params = {
  name: 'Name',
  role_id: 'role_id'
}

validatorRole.post(URLS.createRole, [
  validatorExpress.check('name', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 100 })
    .withMessage(VALIDATESCHEMA.maxLength)
    .custom(async (value) => {
      const role = await ModelRoles.findOne({ where: { name: value } })
      if (role !== null) {
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

validatorRole.put(URLS.editRole, [
  validatorExpress.check('role_id',VALIDATESCHEMA.required)
  .notEmpty(),
  validatorExpress.check('name', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 100 })
    .withMessage(VALIDATESCHEMA.maxLength)
    .custom(async (value) => {
      const role = await ModelRoles.findOne({ where: { name: value } })
      if (role !== null) {
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
export default validatorRole;

