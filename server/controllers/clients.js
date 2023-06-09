import getCountryIso3 from "country-iso-2-to-3";
import Product from "../models/product.js";
import ProductStat from "../models/productStat.js";
import User from "../models/user.js";
import Transactions from "../models/transactions.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      await products.map(async (product) => {
        const productStat = await ProductStat.find({ productId: product._id });
        return { ...product._doc, productStat };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getGeeography = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    // sort field: {"field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    const generateSort = () => {
      const sortParse = JSON.parse(sort);
      const sortFormatted = {
        [sortParse.field]: sortParse.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};
    const transactions = await Transactions.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);
    const total = await Transactions.countDocuments({
      //Count the number of documents with this search options
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    });
    // const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getProducts, getCustomers, getTransactions, getGeeography };
