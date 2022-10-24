import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/users.js';
import mongoose from 'mongoose';
import cors from 'cors'
import authRoutes from './routes/auth.js';
import caseRoutes from './routes/case.js'
import cookieParser from 'cookie-parser';


const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(
  cors({origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://tsm-fe.web.app'], credentials: true, exposedHeaders: ['set-cookie']})
);
app.use(cookieParser())
app.use(express.json());
// app.use(function(req, res, next) {
//   res.header('Content-Type', 'application/json;charset=UTF-8')
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )
//   next()
// })

app.use(function(req, res, next) {
  console.log(req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cases', caseRoutes);

// error handling
app.use((err, req, res, next) => {
  const message = err.message || 'Internal server error';
  const status = err.status || 500;
  return res.status(status).json({
    status,
    message,
    stack: err.stack
  })
}) 

// connect to the database
const connectDB = async () => {
  try{
    mongoose.connect(process.env.DB_CONNECTION);
    // await mongoose.connection.dropDatabase();
    console.log('MongoDB connected');
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening on port ${PORT}`)
})
