const prisma = require('../config/database');

exports.getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({ 
    where: { id: req.user.id }, 
    select: { id: true, name: true, email: true } 
  });
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.update({ 
    where: { id: req.user.id }, 
    data: { name, email } 
  });
  res.json({ id: user.id, name: user.name, email: user.email });
};
