import express from 'express';
const userRoutes = express.Router();
import { register, login, getUser, updateUser } from '../controller/user.controller.js';
import { authenticateToken } from '../middleware/user.middleware.js';

// User registration route
userRoutes.post('/register',register );

// User login route
userRoutes.post('/login', login );

//Get User Detail
userRoutes.post('/getuser',getUser )

//update user Detail
userRoutes.post('/updateuser',  updateUser )



export default userRoutes;
