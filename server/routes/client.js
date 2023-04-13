import express from "express";
import {getProducts, getCustomers, getTransactions, getGeeography} from "../controllers/clients.js";
const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeeography);

export default router;