import express from 'express';
import { MESSAGES, STATUS } from '../common/utils/Constants.js';
import { ResponseService } from '../common/utils/ResponseService.js';
import { URLS } from '../common/utils/urls.js';
import { GalleryVideosService } from "../services/GalleryVideosService.js";
import { database } from '../config/db_config.js';
import validatorGalleryVideos from '../validations/validatorGalleryVideos.js';

const GalleryVideostroller = express.Router();
const galleryVideosService = new GalleryVideosService();

GalleryVideostroller.post(URLS.createVideo, validatorGalleryVideos, async (req, res) => {

  const transaction = await database.transaction();
  await galleryVideosService.createVideo(
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

GalleryVideostroller.get(URLS.getAllVideos, async (req, res) => {

  await galleryVideosService.getAllVideo(req.query)
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

GalleryVideostroller.get(URLS.getListVedios, async (req, res) => {

  await galleryVideosService.getList(req.query)
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

GalleryVideostroller.get(URLS.getOneVideo, async (req, res) => {

  const { id } = req.params

  await galleryVideosService.getOneVideo(id)
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
GalleryVideostroller.delete(URLS.deleteVideo, async (req, res) => {

  const { id } = req.params

  await galleryVideosService.deleteVideo(id)
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

GalleryVideostroller.put(URLS.editvideo,validatorGalleryVideos, async (req, res) => {

  const transaction = await database.transaction();
  await galleryVideosService.editVideo({ transaction },req.body)
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

GalleryVideostroller.put(URLS.activeVideo, async (req, res) => {

  const { id } = req.params

  await galleryVideosService.activeVideo(id)
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


export default GalleryVideostroller;