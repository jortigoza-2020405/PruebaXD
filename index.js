//Ejecución del proyecto
import { initServer } from "./configs/app.js";

import { config } from "dotenv";

import { connect } from "./configs/mongo.js";

import { ensureDefaultCategory } from './src/category/category.defautl.js';

config()
initServer()
connect()