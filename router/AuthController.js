import express from 'express';
import Controller from '../controllers/index';
import { method } from '../utils/variables';

const AuthRouter = express.Router();

AuthRouter[method.post]('/signup', Controller.Auth.signup);

export default AuthRouter;