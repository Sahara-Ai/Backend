import express from 'express';
import Controller from '../controllers';
import { method } from '../utils/variables';

const ChatRouter = express.Router();
ChatRouter[method.post]('/chat',Controller.genChat)

export default ChatRouter;