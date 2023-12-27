import express, { Application } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './app/middlewares/GlobalErrorHanlder';
import handleNotFoundApi from './errors/handleNotFound';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Error handler
app.use(GlobalErrorHandler);

// handle not found api/ route
app.use(handleNotFoundApi);

export default app;
