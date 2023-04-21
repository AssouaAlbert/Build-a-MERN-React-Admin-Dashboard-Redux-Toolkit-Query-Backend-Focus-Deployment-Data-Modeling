/*DEPENDENCIES IMPORT*/
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
// const express = require('express')
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const dotenv = require('dotenv')
// const helmet = require('helmet')
// const morgan = require('morgan')
/*ROUTES IMPORTS*/
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";

// // Import Data
import {
  dataUser,
  dataProductStat,
  dataProduct,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat
} from "./data/index.js";
import User from "./models/user.js";
import ProductStat from "./models/productStat.js";
import Product from "./models/product.js";
import Transactions from "./models/transactions.js";
import OverallStat from "./models/overallStat.js";
import AffiliateStat from "./models/affiliateStat.js";

/**CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/**ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("Server is running on port %d", PORT));
    // User.insertMany(dataUser); //Add users just once.
    // Product.insertMany(dataProduct); //Add users just once.
    // ProductStat.insertMany(dataProductStat); //Add users just once.
    // Transactions.insertMany(dataTransaction); //Add users just once.
    // OverallStat.insertMany(dataOverallStat); //Add users just once.
    // AffiliateStat.insertMany(dataAffiliateStat); //Add users just once.
  })
  .catch((error) => {
    console.log(error.message);
  });
