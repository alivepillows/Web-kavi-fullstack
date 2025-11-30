const prisma = require('../config/database');

exports.getAll = async (req, res) => {
  const categories = await prisma.category.findMany({ where: { userId: req.user.id } });
  res.json(categories);
};

exports.create = async (req, res) => {
  const { name } = req.body;
  const category = await prisma.category.create({ data: { userId: req.user.id, name } });
  res.json(category);
};

exports.delete = async (req, res) => {
  await prisma.category.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Category deleted' });
};
