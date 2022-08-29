/**
 * @swagger
 *  tags:
 *    name: Login
 *    description: Módulo de Login
 */

/**
 * @swagger
 * /login:
 *  post:
 *     tags: [Login]
 *     parameters:     
 *       - name: body  
 *         in: body
 *         description:
 *         required: true
 *         schema:
 *            type: object
 *            $ref: "#/definitions/Login"
 *     summary: modulo para la autenticación
 *     responses:
 *       200:
 *        description: Operación exitosa     
 *       400:
 *         description: El envío de la información no se pudo completar   
 */

/** 
 * @swagger
 * definitions:
 *   Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string     
 *           description: email for the autentication    
 *         password:
 *           type: string
 *           description: password for the autentication    
 *       example:
 *         email: "kvillegas@gmail.com"
 *         password: "1234"
 */


