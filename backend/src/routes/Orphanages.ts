import {Router} from 'express';
import multer from 'multer'

import OrphanagesController from '../controllers/OrphanagesController'
import uploadConfig from '../config/upload'

const orphanagesRoutes = Router();
const upload = multer(uploadConfig)

//index, show, create, update, delete
orphanagesRoutes.post('/orphanages', upload.array('images'), OrphanagesController.create)
orphanagesRoutes.get('/orphanages', OrphanagesController.index)
orphanagesRoutes.get('/orphanages/:id', OrphanagesController.show)

export default orphanagesRoutes