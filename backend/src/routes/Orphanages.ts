import {Router} from 'express';
import OrphanagesController from '../controllers/OrphanagesController'

const orphanagesRoutes = Router();

orphanagesRoutes.post('/orphanages', OrphanagesController.create)

export default orphanagesRoutes