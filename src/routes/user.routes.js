import express from 'express';
import multer from 'multer';
import { loginUser, registerUser } from '../controllers/user.controller.js';

// create upload function from multer
const upload = multer({});

const userRouter = express.Router();

userRouter.route('/register').post(upload.single('image'), registerUser);
userRouter.route('/login').post(loginUser);

export default userRouter;
