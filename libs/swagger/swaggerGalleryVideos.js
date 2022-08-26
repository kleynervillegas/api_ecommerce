/**
 * @swagger
 *  tags:
 *    name: Videos
 *    description: Módulo de Galeria de videos
 */

/**
 * @swagger
 * /video/create:
 *  post:
 *     tags: [Videos]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true          
 *       - name: body  
 *         in: body
 *         description:
 *         required: true
 *         schema:
 *            type: object
 *            $ref: "#/definitions/Videos"
 *     summary: Crear video
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /video/editvideo:
 *  put:
 *     tags: [Videos]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true          
 *       - name: body  
 *         in: body
 *         description:
 *         required: true
 *         schema:
 *            type: object
 *            $ref: "#/definitions/EditVideo"
 *     summary: Editar Video
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /video/getallvideos:
 *  get:
 *     tags: [Videos]
 *     parameters:
 *       - name: size
 *         in: query
 *         description: Limite de registros
 *         type: integer
 *       - name: page
 *         in: query
 *         description: Cantidad de paginas
 *     summary: consultar los videos
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /video/getlistvideos:
 *  get:
 *     tags: [Videos]
 *     parameters:
 *       - name: size
 *         in: query
 *         description: Limite de registros
 *         type: integer
 *       - name: page
 *         in: query
 *         description: Cantidad de paginas
 *     summary: lista de videos con status true
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */


/**
 * @swagger
 * /video/getonevideo/{id}:
 *  get:
 *     tags: [Videos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id del video
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: consultar un video
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /video/delete/{id}:
 *  delete:
 *     tags: [Videos]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true   
 *       - name: id
 *         in: path
 *         description: id del video
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: deshabilitar video
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /video/active/{id}:
 *  put:
 *     tags: [Videos]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true   
 *       - name: id
 *         in: path
 *         description: id del video
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: activar video
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */



/** 
 * @swagger
 * definitions:
 *   Videos:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - url_video
 *       properties:
 *         title:
 *           type: string     
 *           description: title video
 *         description:
 *           type: string
 *           description: description video
 *       example:
 *         title: "new title"
 *         description: "new description"
 *         url_video: "https://www.youtube.com/watch?v=R2Ys4yxXiL4&list=RDR2Ys4yxXiL4&start_radio=1"
 *   EditVideo:
 *     type: object
 *     required:
 *       - video_id
 *       - name
 *       - description
 *       - url_video
 *     properties:
 *       video_id:
 *          type: integer
 *          description: id of video
 *       title:
 *          type: string     
 *          description: title video
 *       description:
 *          type: string
 *          description: description video
 *     example:
 *         video_id : 1
 *         title: "new title"
 *         description: "new description"
 *         url_video: "https://www.youtube.com/watch?v=R2Ys4yxXiL4&list=RDR2Ys4yxXiL4&start_radio=1"
 */


