import express from 'express';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { PublicationService } from "../services/PublicationService.js";
import { database } from '../config/db_config.js';
import validatePublication from '../validations/validatorPublications.js';

const PublicationController = express.Router();
const publicationService = new PublicationService();

PublicationController.post(URLS.createPublication, validatePublication, async (req, res) => {

  const transaction = await database.transaction();
  await publicationService.createPublication(
    { transaction },
    req.body,
    req.user,
  )
    .then((result) => {
      transaction.commit();
      const response = new ResponseService(
        STATUS.success,
        result,
        MESSAGES.success
      );
      res.status(STATUS.success).send(response);
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

PublicationController.post(URLS.editPublications, async (req, res) => {
  const transaction = await database.transaction();
  await publicationService.editPublications(
    { transaction },
    req.body,
    req.headers.token
  )
    .then((result) => {
      transaction.commit();
      const response = new ResponseService(
        STATUS.success,
        result,
        MESSAGES.success
      );
      res.status(STATUS.success).send(response);
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

PublicationController.get(URLS.getPublications, async (req, res) => {

  await publicationService.getPublications(req.query)
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
PublicationController.get(URLS.getAllPublications, async (req, res) => {

  await publicationService.getAllPublications(
    req.query
  )
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

PublicationController.delete(URLS.disabledPublications, async (req, res) => {
  const { id } = req.params
  await publicationService.disabledPublications(id,req.user)
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

PublicationController.put(URLS.activePublications, async (req, res) => {
  const { id } = req.params
  await publicationService.activePublications(id,req.user)
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


PublicationController.get(URLS.getOnePublications, async (req, res) => {
  const { id } = req.params
  await publicationService.getOnePublications(id)
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

PublicationController.get(URLS.getOneTokenPublications, async (req, res) => {
  const { id } = req.params
  await publicationService.getOneTokenPublications(id)
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

PublicationController.delete(URLS.deleteImagen, async (req, res) => {
  const { id } = req.params
  await publicationService.deleteImagen(id)
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

export default PublicationController;