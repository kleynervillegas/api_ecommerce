import jwt from 'jsonwebtoken';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService, ResponseErrors } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { VALIDATESCHEMA } from '../common/utils/Constants.js';
import express from 'express';
import * as validatorExpress from 'express-validator';
import ModelUser from "../models/Users.js"
import bcrypt from 'bcrypt'

const validatorUser = express.Router();

const params = {
  full_name: 'Nombres',
  last_names: 'Apellidos',
  type_number_id: 'Tipo de cedula',
  password: 'Contraseña',
  email: 'Correo',
  user_id: 'user_id',
  number_id: 'Cédula',
  password_confirmation: 'password_confirmation',
  role_id: 'role_id',
  number_phone: 'telefono',
  password_old: 'Contraseña anterior'
}

validatorUser.post(URLS.userCreate, [
  validatorExpress.check('full_name', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 100 })
    .withMessage(VALIDATESCHEMA.maxLength),
  validatorExpress.check('last_names', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 100 })
    .withMessage(VALIDATESCHEMA.maxLength),
  validatorExpress.check('role_id', VALIDATESCHEMA.required)
    .notEmpty(),
  validatorExpress.check('number_id', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 10 })
    .withMessage(VALIDATESCHEMA.maxLength)
    .custom(async value => {
      const number_id = await ModelUser.findOne({ where: { number_id: value } })
      if (number_id !== null) return Promise.reject(VALIDATESCHEMA.numberIdDuplicate);
      return true
    }),
  validatorExpress.check('email', VALIDATESCHEMA.required)
    .notEmpty()
    .custom(async value => {
      const email = await ModelUser.findOne({ where: { email: value } })
      if (email !== null) return Promise.reject(VALIDATESCHEMA.EmailDuplicate);
      return true
    }),
  validatorExpress.check('password', VALIDATESCHEMA.required)
    .notEmpty(),
  validatorExpress.check('password_confirmation', VALIDATESCHEMA.required)
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(VALIDATESCHEMA.incorrectPasswordConfirmation)
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

validatorUser.post(URLS.validateUser, [
  validatorExpress.check('number_id', VALIDATESCHEMA.required)
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage(VALIDATESCHEMA.minLength)
    .isLength({ max: 10 })
    .withMessage(VALIDATESCHEMA.maxLength)
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


validatorUser.put(URLS.userEdit, [
  validatorExpress.check('user_id', VALIDATESCHEMA.required)
    .notEmpty(),
  validatorExpress.check('first_name', VALIDATESCHEMA.required)
    .notEmpty(),
  validatorExpress.check('last_name', VALIDATESCHEMA.required)
    .notEmpty(),
  validatorExpress.check('role_id', VALIDATESCHEMA.required)
    .notEmpty(),
  validatorExpress.check('number_id', VALIDATESCHEMA.required)
    .notEmpty()
    .custom(async (value, { req }) => {

      const findNumberId = await ModelUser.findOne({ where: { number_id: value } })

      if (findNumberId !== null && findNumberId.id !== req.body.user_id) {

        return Promise.reject(VALIDATESCHEMA.numberIdDuplicate)
      };

      return true
    }),
  validatorExpress.check('email', VALIDATESCHEMA.required)
    .notEmpty()
    .custom(async (value, { req }) => {

      const findEmail = await ModelUser.findOne({ where: { email: value } })

      if (findEmail !== null && findEmail.id !== req.body.user_id) {

        return Promise.reject(VALIDATESCHEMA.EmailDuplicate)
      };

      return true
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

validatorUser.put(URLS.userPasswordChange, [
  validatorExpress.check('user_id', VALIDATESCHEMA.required)
    .notEmpty(),
  validatorExpress.check('password_old', VALIDATESCHEMA.required)
    .notEmpty()
    .custom(async (value, { req }) => {

      const user = await ModelUser.findOne({ where: { id: req.body.user_id } });
      
      if (await bcrypt.compare(value,user.password)) {
            return true
      } else {
        return Promise.reject(VALIDATESCHEMA.incorrectPasswordOld);
      }
    }),
  validatorExpress.check('password', VALIDATESCHEMA.required)
    .notEmpty(),
  validatorExpress.check('password_confirmation', VALIDATESCHEMA.required)
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(VALIDATESCHEMA.incorrectPasswordConfirmation)
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

validatorUser.put(URLS.userPasswordRecovery, [
  validatorExpress.check('number_id', VALIDATESCHEMA.required)
    .notEmpty(),
  validatorExpress.check('password', VALIDATESCHEMA.required)
    .notEmpty(),
  validatorExpress.check('password_confirmation', VALIDATESCHEMA.required)
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(VALIDATESCHEMA.incorrectPasswordConfirmation)
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

export default validatorUser;

