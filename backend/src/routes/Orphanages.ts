import {Router} from 'express';
import OrphanagesController from '../controllers/OrphanagesController'

const orphanagesRoutes = Router();

//index, show, create, update, delete
orphanagesRoutes.post('/orphanages', OrphanagesController.create)
orphanagesRoutes.get('/orphanages', OrphanagesController.index)

export default orphanagesRoutes