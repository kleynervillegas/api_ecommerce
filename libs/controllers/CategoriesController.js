import express from 'express';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { CategoriesService } from "../services/CategoriesService.js";
import { database } from '../config/db_config.js';
import validatorCategory from '../validations/validatorCategory.js';

const CategoriesController = express.Router();
const categoriesService = new CategoriesService();

CategoriesController.post(URLS.createCategory, validatorCategory, async (req, res) => {

  const transaction = await database.transaction();
  await categoriesService.createCategory(
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
      console.log(error);
      transaction.rollback();
      const response = new ResponseService(
        STATUS[error],
        null,
        MESSAGES[error]
      );
      res.status(STATUS[error]).send(response);
    });
});

CategoriesController.get(URLS.getAllCategories, async (req, res) => {

  await categoriesService.getAllCategory(req.query)
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

CategoriesController.get(URLS.getListCategories, async (req, res) => {

  await categoriesService.getList(req.query)
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

CategoriesController.get(URLS.getOneCategory, async (req, res) => {

  const { id } = req.params

  await categoriesService.getOneCategory(id)
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
CategoriesController.delete(URLS.daleteCategory, async (req, res) => {

  const { id } = req.params

  await categoriesService.deleteCategory(id)
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

CategoriesController.put(URLS.activeCategory, async (req, res) => {

  const { id } = req.params

  await categoriesService.activeCategory(id)
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
CategoriesController.put(URLS.editCategory, validatorCategory,async (req, res) => {

  const transaction = await database.transaction();
  await categoriesService.editCategory({ transaction }, req.body)
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

export default CategoriesController;