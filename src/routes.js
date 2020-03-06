import { Router } from 'express';

import UserController from './app/controllers/User';
import SessionController from './app/controllers/Session';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;
