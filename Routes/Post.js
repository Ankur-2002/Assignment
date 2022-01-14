const Router = require('express').Router();
const Entry = require('../Modal/Entries');

Router.get('/entry', async (req, res) => {
  //   const data = req..authorization;
  const userId = req.user;
  console.log(userId);
  const entries = await Entry.find({
    owner: userId,
  });
  return res
    .json({
      entries: entries,
    })
    .status(200);
});
Router.post('/entry', async (req, res) => {
  const userId = req.user;
  const data = req.body;
  const entry = await new Entry({ ...data, owner: userId });

  await entry.save();
  return res.status(200).json({
    message: 'Entry created',
    post: entry,
  });
});

Router.delete('/entry', async (req, res) => {
  const { id } = req.query;

  const entry = await Entry.find({
    _id: id,
    owner: req.user,
  });

  if (!entry) {
    return res.status(404).json({
      message: 'Entry not found',
    });
  }
  const deleted = await Entry.findByIdAndDelete(id);
  return res
    .json({
      message: 'Entry deleted',
    })
    .status(200);
});
module.exports = Router;
