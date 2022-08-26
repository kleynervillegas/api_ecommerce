/**
 * @swagger
 *  tags:
 *    name: User
 *    description: Módulo de Usuario
 */

/**
 * @swagger
 * /user/create:
 *  post:
 *     tags: [User]
 *     parameters:        
 *       - name: body  
 *         in: body
 *         description:
 *         required: true
 *         schema:
 *            type: object
 *            $ref: "#/definitions/User"
 *     summary: Crear la Usuario
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /user/validate:
 *  post:
 *     tags: [User]
 *     parameters:        
 *       - name: body  
 *         in: body
 *         description:
 *         required: true
 *         schema:
 *            type: object
 *            $ref: "#/definitions/ValidateUser"
 *     summary: Validar  Usuario
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /user/edit:
 *  put:
 *     tags: [User]
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
 *            $ref: "#/definitions/EditUser"
 *     summary: Editar la Usuario
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /user/disabled/{id}:
 *  delete:
 *     tags: [User]
 *     parameters:  
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *       - name: id
 *         in: path
 *         type: integer
 *         format: "int64"
 *         required: true
 *         description: id user
 *     summary: Deshabilitar la Usuario
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /user/active/{id}:
 *  put:
 *     tags: [User]
 *     parameters:  
 *       - name: token
 *         in: header
 *         description: token de autenticación
 *         type: string
 *         required: true          
 *       - name: id
 *         in: path
 *         type: integer
 *         format: "int64"
 *         required: true
 *         description: id user
 *     summary: Activar la Usuario
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /user/password/change:
 *  put:
 *     tags: [User]
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
 *            $ref: "#/definitions/PasswrodChangeUser"
 *     summary: Cambiar Contraseña
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /user/password/recovery:
 *  put:
 *     tags: [User]
 *     parameters:           
 *       - name: body  
 *         in: body
 *         description:
 *         required: true
 *         schema:
 *            type: object
 *            $ref: "#/definitions/PasswrodRecovery"
 *     summary: Recuperar Contraseña
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /user/getalluser:
 *  get:
 *     tags: [User]
 *     summary: Consultar todos los usuarios
 *     parameters:
 *       - name: size
 *         in: query
 *         description: Limite de registros
 *         type: integer
 *       - name: page
 *         in: query
 *         description: Cantidad de paginas
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/**
 * @swagger
 * /user/getoneuser/{id}:
 *  get:
 *     tags: [User]
 *     parameters:  
 *       - name: id
 *         in: path
 *         description: id user
 *         type: integer
 *         format: "int64"
 *         required: true
 *     summary: consultar un usuario
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/** 
 * @swagger
 * definitions:
 *   User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *         - role_id
 *       properties:
 *         first_name:
 *           type: string     
 *           description: title of the publication     
 *         last_name:
 *           type: string
 *           description: description of the publication
 *         number_id:
 *           type: string
 *           description: number_id user
 *         email:
 *           type: string
 *           description: Email user
 *         role_id:
 *           type: integer
 *           description: id rol user
 *         password:
 *           type: string
 *           description: Password user
 *         password_confirmation:
 *           type: string
 *           description: password confirmation user
 *       example:
 *         first_name: "new first_name"
 *         last_name: "new last_name"
 *         number_id: "200993939"
 *         email: "email@prolesys.com"
 *         role_id: 1
 *         password: "1234"
 *         password_confirmation: "1234"

 *   EditUser:
 *     type: object
 *     properties:
 *       user_id:
 *          type: integer
 *          description: id of the user
 *       first_name:
 *          type: string
 *          description: first_name user
 *       last_name:
 *          type: string
 *          description: last_name user
 *       number_id:
 *          type: string
 *          description: number_id user
 *       email:
 *          type: string
 *          description: email user
 *       role_id:
 *          type: integer
 *          description: id rol user
 *     example:
 *         user_id : 1
 *         first_name : "edit first_name"
 *         last_name: "edit last_name"
 *         number_id: "200993939"
 *         email: "edit email"
 *         role_id: 1
 *   PasswrodChangeUser:
 *     type: object
 *     properties:
 *       user_id:
 *          type: integer
 *          description: id of the user
 *       password_old:
 *          type: string
 *          description: password_old change
 *       password:
 *           type: string
 *           description: password change
 *       password_confirmation:
 *           type: string
 *           description: password confirmation change
 *     example:
 *         user_id : 1
 *         password_old: "1234"
 *         password: "12345"
 *         password_confirmation: "12345"
 *   ValidateUser:
 *     type: object
 *     properties:
 *       number_id:
 *          type: integer
 *          description: numberId of the user
 *     example:
 *         number_id: "200993939"
 *   PasswrodRecovery:
 *     type: object
 *     properties:
 *       number_id:
 *          type: integer
 *          description: numberId of the user
 *       password:
 *           type: string
 *           description: password recovery
 *       password_confirmation:
 *           type: string
 *           description: password confirmation recovery
 *     example:
 *         number_id: "200993939"
 *         password: "200993939"
 *         password_confirmation: "200993939"
 */


