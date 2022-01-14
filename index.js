const express = require('express');
const app = express();

const BodyParser = require('body-parser');
const Login = require('./Routes/Login');
const Monogose = require('mongoose');
const Post = require('./Routes/Post');
const { isAuth } = require('./Middleware/Auth');
app.use(express.urlencoded({ extended: false }));
app.use(BodyParser.json());
Monogose.connect(
  'mongodb+srv://GISFY:GISFY@gisfy.dfnyh.mongodb.net/Assignment?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(res => {
    app.listen(process.env.PORT || 4000);
  })
  .catch(err => {
    console.log(err);
  });
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET ,POST ,DELETE ,PATCH ,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  if (req.method === 'OPTIONS') return res.json({}).status(200);
  next();
});
// app.use((req, res, next) => {
//   console.log(req.body);
//   next();
// });
app.use('/api/post', isAuth, Post);
app.use('/api/auth', Login);
