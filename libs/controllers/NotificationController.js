import express from 'express';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { NotificationsService } from "../services/NotificationsService.js";

const NotificationController = express.Router();
const notificationsService = new NotificationsService();


NotificationController.get(URLS.getAllNotificationsUser, async (req, res) => {

  await notificationsService.getAllNotifyuser(req.user)
    .then((result) => {
      const response = new ResponseService(
        STATUS.success,
        result,
        MESSAGES.success
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
});

NotificationController.get(URLS.disabledNotify, async (req, res) => {

  await notificationsService.disabledNotify(req.user)
    .then((result) => {
      const response = new ResponseService(
        STATUS.success,
        result,
        MESSAGES.success
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
});




export default NotificationController;