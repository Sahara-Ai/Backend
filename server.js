import mongoose from "mongoose";
import express from "express";
import router from './router/index.js';
import cors from "cors";
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use(cors());
app.use('/', router.ChatRouter);

var port = 8080;
mongoose.connect(
    process.env.db_connection_link)
    .then(() => app.listen(port))
    .then(() => console.log(`Server started on port http://localhost:${port}/`))
    .catch((err)=>console.log(err));
