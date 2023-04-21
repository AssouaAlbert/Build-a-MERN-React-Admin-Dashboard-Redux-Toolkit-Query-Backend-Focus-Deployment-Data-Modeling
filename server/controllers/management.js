import User from "../models/user.js";
import Transactions from "../models/transactions.js";
import mongoose from "mongoose";

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    const userWithStats = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      {
        $unwind: "$affiliateStats",
      },
    ]);
    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transactions.findById(id);
      })
    );
    // return res.status(200).json(userWithStats)
    const filterSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );
    return res
      .status(200)
      .json({ user: userWithStats[0], sales: filterSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export { getAdmins, getUserPerformance };
