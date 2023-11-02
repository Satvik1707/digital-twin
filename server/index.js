import express from 'express';
// import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import operationalRoutes from "./routes/operational.js";
import CoreEngineRoutes from "./routes/coreEngine.js";
import WhatIfRoutes from "./routes/whatIf.js";
import generalRoutes from "./routes/general.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/operational", operationalRoutes);
app.use("/core-engine", CoreEngineRoutes);
app.use("/what-if", WhatIfRoutes);
app.use("/general", generalRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT} `));

