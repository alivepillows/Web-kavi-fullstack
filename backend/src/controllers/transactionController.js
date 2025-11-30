const prisma = require('../config/database');

exports.getAll = async (req, res) => {
  const transactions = await prisma.transaction.findMany({ 
    where: { userId: req.user.id }, 
    orderBy: { date: 'desc' } 
  });
  res.json(transactions);
};

exports.create = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;
    if (!date || isNaN(new Date(date).getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
    const transaction = await prisma.transaction.create({ 
      data: { 
        userId: req.user.id, 
        amount: parseFloat(amount), 
        type, 
        category, 
        date: new Date(date), 
        note: note || '' 
      } 
    });
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  await prisma.transaction.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Transaction deleted' });
};
