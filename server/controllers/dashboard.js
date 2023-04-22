import User from "../models/user.js";
import OverallStat from "../models/overallStat.js";
import Transaction from "../models/transactions.js";

const getDashboard = async (req, res) => {
  try {
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });
    const overallStat = await OverallStat.find({ year: currentYear });
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];
    // return res.status(200).json(overallStat[0])
    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });
    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });
    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default getDashboard;
