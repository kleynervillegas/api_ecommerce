import express from 'express';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { LoginService } from "../services/LoginService.js";
import validatorLogin from '../validations/validatorLogin.js';

const LoginController = express.Router();
const loginService = new LoginService()

/* [POST] Controlador para Realizar el Login*/
LoginController.post(URLS.login, validatorLogin ,async (req, res) => {
    //Llamado al servicio de userCreate para el guardado de informacion
    await loginService.loginUser(
      req.body
    )
    .then((result) => { //Si fue exitoso obtendremos informacion en result
      //Mapeado de respuesta a mostrar
      const response = new ResponseService(
        STATUS.success,
        result,
        MESSAGES.success
      );
      //Respuesta Enviada
      res.status(STATUS.success).send(response);
    })
    .catch((error) => { //Si ocurrio un error obtendremos el error como string en error
      //Mapeado de respuesta a mostrar
      const response = new ResponseService(
        STATUS[error], //Se busca en la constante STATUS cual es el error correspondiente
        null, //Esta es la seccion de Data y por ser error va null
        MESSAGES[error] //Se busca en la constante MESSAGES cual es el error correspondiente
      );
      //Respuesta Enviada
      res.status(STATUS[error]).send(response);
    });
})

export default LoginController;