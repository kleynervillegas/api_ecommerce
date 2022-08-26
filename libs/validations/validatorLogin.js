import jwt from 'jsonwebtoken';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService, ResponseErrors } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { VALIDATESCHEMA } from '../common/utils/Constants.js';
import express from 'express';
import * as validatorExpress from 'express-validator';

const validatorLogin = express.Router();
const params = {
  email: 'Correo',
  password: 'Contrasena',
}

validatorLogin.post(URLS.login, [
  validatorExpress.check('email', VALIDATESCHEMA.required)
    .notEmpty(),
  validatorExpress.check('password', VALIDATESCHEMA.required)
    .notEmpty()
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

export default validatorLogin;

