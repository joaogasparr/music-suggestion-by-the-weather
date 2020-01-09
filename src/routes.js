import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddlewares from './app/middlewares/auth';
import validateSessionStore from './app/validators/Session/Store';
import validateUserStore from './app/validators/User/Store';
import validateUserUpdate from './app/validators/User/Update';

const routes = new Router();

// Users
routes.post('/users', validateUserStore, UserController.store);
// Sessions
routes.post('/sessions', validateSessionStore, SessionController.store);
// Middlewares
routes.use(authMiddlewares);
// Users
routes.put('/users', validateUserUpdate, UserController.update);

export default routes;
