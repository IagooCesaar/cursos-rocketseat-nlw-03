import {Router} from 'express';
import OrphanagesController from '../controllers/OrphanagesController'

const orphanagesRoutes = Router();

//index, show, create, update, delete
orphanagesRoutes.post('/orphanages', OrphanagesController.create)
orphanagesRoutes.get('/orphanages', OrphanagesController.index)
orphanagesRoutes.get('/orphanages/:id', OrphanagesController.show)

export default orphanagesRoutes