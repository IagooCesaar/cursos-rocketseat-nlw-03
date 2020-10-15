import express, { json } from 'express'
import 'express-async-errors';
import errorHandler from './errors/handler';

import './database/connection'
import routes from './routes';
import path from 'path'

const app = express();
app.use(express.json());
app.use(routes)
app.use('/uploads', express.static(
  path.join(__dirname, '..', 'uploads')
))
app.use(errorHandler)

app.listen(3333)