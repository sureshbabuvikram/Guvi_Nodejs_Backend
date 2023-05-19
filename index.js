import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';


// Middleware
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

// Routes
import userRoutes from './routes/user.js';
app.get("/",(req,res)=>{
    res.send("testing")
})
app.use('/api/user', userRoutes);

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
