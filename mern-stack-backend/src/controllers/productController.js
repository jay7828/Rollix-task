const axios = require('axios');
const https = require('https');
const ProductTransaction = require('../models/ProductTransaction');

// Initialize database with seed data
exports.initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const products = response.data;
    await ProductTransaction.insertMany(products, { ordered: false });
    res.status(200).send('Database initialized with seed data');
  } catch (error) {
        res.status(500).send("Error: " + error.message);
    }


};

// List all transactions with search and pagination
exports.getAllTransactions = async (req, res) => {
  try {
    const { month, page = 1, perPage = 10, search } = req.query;
    const query = {};

    if (month) {
      const start = new Date(`2022-${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      query.dateOfSale = { $gte: start, $lt: end };
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: new RegExp(search, 'i') }
      ];
    }

    const transactions = await ProductTransaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
};

// Get statistics for a specific month
exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) {
      return res.status(400).send('Month is required');
    }

    const start = new Date(`2022-${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const transactions = await ProductTransaction.find({ dateOfSale: { $gte: start, $lt: end } });

    const totalSaleAmount = transactions.reduce((sum, item) => (item.sold ? sum + item.price : sum), 0);
    const totalSoldItems = transactions.filter(item => item.sold).length;
    const totalNotSoldItems = transactions.filter(item => !item.sold).length;

    res.status(200).json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
  } catch (error) {
    res.status(500).send('Error fetching statistics');
  }
};

// Get data for bar chart
exports.getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) {
      return res.status(400).send('Month is required');
    }

    const start = new Date(`2022-${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const transactions = await ProductTransaction.find({ dateOfSale: { $gte: start, $lt: end } });

    const priceRanges = [
      { range: '0-100', count: 0 },
      { range: '101-200', count: 0 },
      { range: '201-300', count: 0 },
      { range: '301-400', count: 0 },
      { range: '401-500', count: 0 },
      { range: '501-600', count: 0 },
      { range: '601-700', count: 0 },
      { range: '701-800', count: 0 },
      { range: '801-900', count: 0 },
      { range: '901-above', count: 0 },
    ];

    transactions.forEach(transaction => {
      const price = transaction.price;
      if (price <= 100) priceRanges[0].count++;
      else if (price <= 200) priceRanges[1].count++;
      else if (price <= 300) priceRanges[2].count++;
      else if (price <= 400) priceRanges[3].count++;
      else if (price <= 500) priceRanges[4].count++;
      else if (price <= 600) priceRanges[5].count++;
      else if (price <= 700) priceRanges[6].count++;
      else if (price <= 800) priceRanges[7].count++;
      else if (price <= 900) priceRanges[8].count++;
      else priceRanges[9].count++;
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).send('Error fetching bar chart data');
  }
};

// Get data for pie chart
exports.getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) {
      return res.status(400).send('Month is required');
    }

    const start = new Date(`2022-${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const transactions = await ProductTransaction.find({ dateOfSale: { $gte: start, $lt: end } });

    const categories = {};
    transactions.forEach(transaction => {
      const category = transaction.category;
      if (categories[category]) categories[category]++;
      else categories[category] = 1;
    });

    const pieChartData = Object.keys(categories).map(key => ({ category: key, count: categories[key] }));

    res.status(200).json(pieChartData);
  } catch (error) {
    res.status(500).send('Error fetching pie chart data');
  }
};

// Get combined data from other APIs
exports.getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) {
      return res.status(400).send('Month is required');
    }

    const [transactions, statistics, barChartData, pieChartData] = await Promise.all([
      this.getAllTransactions(req, res),
      this.getStatistics(req, res),
      this.getBarChartData(req, res),
      this.getPieChartData(req, res)
    ]);

    res.status(200).json({ transactions, statistics, barChartData, pieChartData });
  } catch (error) {
    res.status(500).send('Error fetching combined data');
  }
};
