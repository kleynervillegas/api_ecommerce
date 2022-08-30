import express from 'express';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { LoginService } from "../services/LoginService.js";
import validatorLogin from '../validations/validatorLogin.js';

const LoginController = express.Router();
const loginService = new LoginService()

LoginController.post(URLS.login, validatorLogin ,async (req, res) => {
    await loginService.loginUser(
      req.body
    )
    .then((result) => {   
      const response = new ResponseService(
        STATUS.sesionSuccess,
        result,
        MESSAGES.sesionSuccess
      );
      res.status(STATUS.success).send(response);
    })
    .catch((error) => { 
      const response = new ResponseService(
        STATUS[error], 
        null, 
        MESSAGES[error] 
      );
      res.status(STATUS[error]).send(response);
    });
})

export default LoginController;