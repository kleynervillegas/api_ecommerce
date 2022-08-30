/**
 * @swagger
 *  tags:
 *    name: Publication
 *    description: Módulo de Publicacion
 */

/**
 * @swagger
 * /publication/create:
 *  post:
 *     tags: [Publication]
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
 *            $ref: "#/definitions/Publication"
 *     summary: Crear la Publicacion
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /publication/editpublications:
 *  post:
 *     tags: [Publication]
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
 *            $ref: "#/definitions/EditPublication"
 *     summary: Editar la Publicacion
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */


/**
 * @swagger
 * /publication/getall/publications:
 *  get:
 *     tags: [Publication]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true  
 *       - name: size
 *         in: query
 *         description: Limite de registros
 *         type: integer
 *       - name: page
 *         in: query
 *         description: Cantidad de paginas
 *         type: integer
 *       - name: multipleFilter
 *         in: query
 *         description: Cantidad de filtros
 *         type: boolean
 *       - name: filter
 *         in: query
 *         description: filtrar por title y description
 *         type: string 
 *       - name: featured
 *         in: query
 *         description: filtar por featured
 *         type: boolean 
 *       - name: status
 *         in: query
 *         description: filtar por status
 *         type: boolean 
 *       - name: category
 *         in: query
 *         description: filtar por categoria
 *         type: integer 
 *       - name: author
 *         in: query
 *         description: filtar por author
 *         type: string 
 *     summary: consultar todas las publicaciones
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /publication/getone/publications/{id}:
 *  get:
 *     tags: [Publication]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true  
 *       - name: id
 *         in: path
 *         description: id de la publicacion
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: consultar una publicacion
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /publication/getonetokenpublications/{id}:
 *  get:
 *     tags: [Publication]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true   
 *       - name: id
 *         in: path
 *         description: id de la publicacion
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: consultar una publicacion con token
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */


/**
 * @swagger
 * /publication/disabledpublications/{id}:
 *  delete:
 *     tags: [Publication]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true   
 *       - name: id
 *         in: path
 *         description: id de la publicacion
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: deshabilitar publicacion
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /publication/activepublications/{id}:
 *  put:
 *     tags: [Publication]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true   
 *       - name: id
 *         in: path
 *         description: id de la publicacion
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: Activar la  publicacion
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */


/**
 * @swagger
 * /publication/deleteimagen/{id}:
 *  delete:
 *     tags: [Publication]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true   
 *       - name: id
 *         in: path
 *         description: id de la galeria
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: deshabilitar la imagen de la galeria
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/** 
 * @swagger
 * definitions:
 *   Publication:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - image
 *         - featured
 *         - body_news
 *       properties:
 *         title:
 *           type: string     
 *           description: title of the publication     
 *         description:
 *           type: string
 *           description: description of the publication
 *         image:
 *           type: string
 *           description: Imagen of the publication in base64
 *         gallery:
 *           type: array
 *         categories:
 *          type: array
 *         featured:
 *           type: booean
 *           description: image is featured
 *         body_news:
 *           type: string
 *           description: the body of the publication in format html
 *         url_video:
 *           type: string
 *           description: the url video
 *       example:
 *         title: "new title"
 *         description: "new description"
 *         image: "data:image/png;base64"
 *         gallery: [ "data:image/png;base64","data:image/png;base64" ]
 *         categories:  [ 1,2]
 *         featured: true
 *         body_news: "<html><html><head></head><body>"
 *         url_video: "https://www.youtube.com/watch?v=R2Ys4yxXiL4&list=RDR2Ys4yxXiL4&start_radio=1"
 *   EditPublication:
 *     type: object
 *     required:
 *       - publication_id
 *     properties:
 *       publication_id:
 *          type: integer
 *          description: id of the publication
 *       categories:
 *          type: array
 *       title:
 *          type: string
 *          description: title de la publication
 *       description:
 *          type: string
 *          description: description of the publication
 *       image:
 *          type: string
 *          description: Imagen of the publication in base64
 *       gallery:
 *          type: array
 *       featured:
 *          type: booean
 *          description: image is featured
 *       body_news:
 *          type: string
 *          description: the body of the publication in format html
 *       url_video:
 *          type: string
 *          description: the url video
 *     example:
 *         publication_id : 1
 *         categories : [ 1,2]
 *         title: "edit title"
 *         description: "edit description"
 *         image: "data:image/png;base64"
 *         gallery: [ "data:image/png;base64","data:image/png;base64" ]
 *         featured: true
 *         body_news: "<html><html><head></head><body>"
 *         url_video: "https://www.youtube.com/watch?v=R2Ys4yxXiL4&list=RDR2Ys4yxXiL4&start_radio=1"
 */


