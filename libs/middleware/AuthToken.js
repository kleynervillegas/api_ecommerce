import jwt from'jsonwebtoken';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService } from '../common/utils/ResponseService.js';

const response = new ResponseService(
  STATUS.Unauthorized,
  null,
  MESSAGES.Unauthorized
);

export default function (req, res, next) {
  if (req.headers.token) {
    jwt.verify(req.headers.token, process.env['JWT_KEY'], function (err, decoded) {
      if (err) {        
        res.status(STATUS.Unauthorized).send(response);
      } else {
        req.user = decoded.user;
        next()
      }
    })
  } else {
    res.status(STATUS.Unauthorized).send(response);
  }
}
