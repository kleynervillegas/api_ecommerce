import express from 'express';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { RolesService } from "../services/RolesService.js";
import { database } from '../config/db_config.js';
import validatorRoles from '../validations/validatorRole.js';

const RolesController = express.Router();
const rolesService = new RolesService();

RolesController.post(URLS.createRole, validatorRoles, async (req, res) => {

  const transaction = await database.transaction();
  await rolesService.createRoles(
    { transaction },
    req.body)
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

RolesController.get(URLS.getAllRoles, async (req, res) => {

  await rolesService.getAllRoles()
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

RolesController.get(URLS.getListRoles, async (req, res) => {

  await rolesService.getList()
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

RolesController.get(URLS.getOneRole, async (req, res) => {

  const { id } = req.params

  await rolesService.getOneRole(id)
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
RolesController.delete(URLS.deleteRole, async (req, res) => {

  const { id } = req.params

  await rolesService.deleteRole(id)
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

RolesController.put(URLS.editRole,validatorRoles, async (req, res) => {

  const transaction = await database.transaction();
  await rolesService.editRole({ transaction },req.body)
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

RolesController.put(URLS.activeRole, async (req, res) => {

  const { id } = req.params

  await rolesService.activeRole(id)
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


export default RolesController;