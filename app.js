import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './libs/routes/index.js';
///swagger
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-express';
import  {options} from './libs/swagger/swagger.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb',extended: true }));
const specs = swaggerJSDoc(options)
app.use('/api', SwaggerUI.serve, SwaggerUI.setup(specs));
app.use('/', router);

app.listen(process.env['PORT'], () => {
  console.log(`Server is running on port ${process.env['PORT']}`);
})

