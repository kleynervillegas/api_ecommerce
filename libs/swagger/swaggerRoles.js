/**
 * @swagger
 *  tags:
 *    name: Roles
 *    description: Módulo de Roles
 */

/**
 * @swagger
 * /role/create:
 *  post:
 *     tags: [Roles]
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
 *            $ref: "#/definitions/Roles"
 *     summary: Crear el rol del usuario
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /role/editrole:
 *  put:
 *     tags: [Roles]
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
 *            $ref: "#/definitions/EditRole"
 *     summary: Editar rol
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /role/getallroles:
 *  get:
 *     tags: [Roles]
 *     summary: consultar los roles
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */
/**
 * @swagger
 * /role/getlistroles:
 *  get:
 *     tags: [Roles]
 *     summary: lista de roles con status true para crear usuarios
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */


/**
 * @swagger
 * /role/getonerole/{id}:
 *  get:
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id de la categoria
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: consultar un rol
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /role/deleterole/{id}:
 *  delete:
 *     tags: [Roles]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true   
 *       - name: id
 *         in: path
 *         description: id del rol
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: deshabilitar rol
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /role/activerole/{id}:
 *  put:
 *     tags: [Roles]
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true   
 *       - name: id
 *         in: path
 *         description: id del rol
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: activar rol
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */



/** 
 * @swagger
 * definitions:
 *   Roles:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string     
 *           description: name of the Role
 *       example:
 *         name: "new Role"
 *   EditRole:
 *     type: object
 *     required:
 *       - role_id
 *       - name
 *     properties:
 *       role_id:
 *          type: integer
 *          description: id of role
 *       name:
 *          type: string
 *          description: name the role
 *     example:
 *         role_id : 1
 *         name: "edit name"
 */


