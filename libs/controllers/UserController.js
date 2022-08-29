import express from 'express';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { database } from '../config/db_config.js';
import { UserService } from "../services/UserService.js";
import validatorUser from '../validations/validatorUser.js';
const UserController = express.Router();
const userService = new UserService()

UserController.post(URLS.userCreate, validatorUser, async (req, res) => {
  const transaction = await database.transaction();
  await userService.userCreate(
    { transaction },
    req.body
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
})

UserController.post(URLS.validateUser,validatorUser, async (req, res) => {
  await userService.ValidateUser(req.body.number_id)
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
})

UserController.put(URLS.userEdit,validatorUser, async (req, res) => {
  const transaction = await database.transaction();
  await userService.userEdit(
    { transaction },
    req.body,
    req.user
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
})

UserController.delete(URLS.userDisabled,async (req, res) => {
  const transaction = await database.transaction();

  const { id } = req.params;

  await userService.userDisabled({ transaction },id)
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
})

UserController.put(URLS.userActive, async (req, res) => {
  const transaction = await database.transaction();

  const { id } = req.params;

  await userService.userActive({ transaction },id)
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
})

UserController.put(URLS.userPasswordChange,validatorUser, async (req, res) => {
  const transaction = await database.transaction();
  await userService.passwordChange(
    { transaction },
    req.body
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
})

UserController.put(URLS.userPasswordRecovery,validatorUser, async (req, res) => {
  const transaction = await database.transaction();
  await userService.passwordRecovery(
    { transaction },
    req.body
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
})

UserController.get(URLS.getAllUser,async (req, res) => {
  await userService.getAllUser(req.query)
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
})

UserController.get(URLS.getOneUser,async (req, res) => {

  const { id } = req.params;

  await userService.getOneUser(id)

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
})

export default UserController;