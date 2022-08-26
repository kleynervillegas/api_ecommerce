/**
 * @swagger
 *  tags:
 *    name: Category
 *    description: Módulo las categorias
 */

/**
 * @swagger
 * /category/create:
 *  post:
 *     tags: [Category]
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
 *            $ref: "#/definitions/Category"
 *     summary: Crear la Categoria
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /category/editcategory:
 *  put:
 *     tags: [Category]
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
 *            $ref: "#/definitions/EditCategory"
 *     summary: Editar la Categoria
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /category/getallcategories:
 *  get:
 *     tags: [Category]
 *     parameters:
 *       - name: size
 *         in: query
 *         description: Limite de registros
 *         type: integer
 *       - name: page
 *         in: query
 *         description: Cantidad de paginas
 *     summary: consultar todas las categorias
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /category/getlistcategories:
 *  get:
 *     tags: [Category]
 *     summary: consultar las categorias con status true para para crear noticia
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */


/**
 * @swagger
 * /category/getonecategory/{id}:
 *  get:
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id de la categoria
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: consultar una categoria
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /category/daletecategory/{id}:
 *  delete:
 *     tags: [Category]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true   
 *       - name: id
 *         in: path
 *         description: id de la categoria
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: deshabilitar categoria
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /category/activecategory/{id}:
 *  put:
 *     tags: [Category]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true   
 *       - name: id
 *         in: path
 *         description: id de la categoria
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: activar categoria
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */



/** 
 * @swagger
 * definitions:
 *   Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string     
 *           description: name of the category
 *       example:
 *         name: "new category"
 *   EditCategory:
 *     type: object
 *     required:
 *       - category_id
 *       - name
 *     properties:
 *       category_id:
 *          type: integer
 *          description: id of the category
 *       name:
 *          type: string
 *          description: name de la category
 *     example:
 *         category_id : 1
 *         name: "edit name"
 */


