import Product from "../models/product.js";
import ProductStat from "../models/productStat.js";

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
export default getProducts;
