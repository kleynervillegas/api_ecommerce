import express from 'express';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { CarsService } from "../services/CarsService.js";
import { database } from '../config/db_config.js';


const CarsController = express.Router();
const carsService = new CarsService();


CarsController.post(URLS.addCars, async (req, res) => {  

  const transaction = await database.transaction();

  await carsService.addCars(req.body,req.user,transaction)
    .then((result) => {
      transaction.commit();
      const response = new ResponseService(
        STATUS.carAdd,
        result,
        MESSAGES.carAdd
      );
      res.status(STATUS.carAdd).send(response);
    })
    .catch((error) => {
      transaction.rollback();
      const response = new ResponseService(
        STATUS[error],
        null,
        MESSAGES[error]
      );
      res.status(STATUS[error]).send(response);
    });
});

CarsController.get(URLS.getAllCarsUser, async (req, res) => {

  await carsService.getCarUser(req.user)
    .then((result) => {
      const response = new ResponseService(
        STATUS.success,
        result,
        MESSAGES.success
      );
      res.status(STATUS.success).send(response);
    })
    .catch((error) => {
      console.log(error);
      const response = new ResponseService(
        STATUS[error],
        null,
        MESSAGES[error]
      );
      res.status(STATUS[error]).send(response);
    });
});




export default CarsController;