import { Router } from 'express';
import ExpressBrute from 'express-brute';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import WeatherController from './app/controllers/WeatherController';
import authMiddlewares from './app/middlewares/auth';
import validateSessionStore from './app/validators/Session/Store';
import validateUserStore from './app/validators/User/Store';
import validateUserUpdate from './app/validators/User/Update';

const store = new ExpressBrute.MemoryStore();
const bruteForce = new ExpressBrute(store);

const routes = new Router();

// Users
routes.post('/users', validateUserStore, UserController.store);
// Sessions
routes.post(
  '/sessions',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store
);
// Middlewares
routes.use(authMiddlewares);
// Users
routes.put('/users/:id', validateUserUpdate, UserController.update);
// Weather
routes.post('/weathers', WeatherController.store);

export default routes;
