import {Router} from 'express';
import orphanagesRoutes from './Orphanages'

const routes = Router();

routes.use(orphanagesRoutes);

export default routes