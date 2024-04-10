import express from 'express';
import multer from 'multer';
import {
    loginUser,
    logoutUser,
    registerUser,
    updateImage,
    updatePassword,
    userRefreshToken,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

// create upload function from multer
const upload = multer({});

const userRouter = express.Router();

userRouter.route('/register').post(upload.single('image'), registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(verifyJWT, logoutUser);
userRouter.route('/update-password').post(verifyJWT, updatePassword);
userRouter.route('/update-image').post(verifyJWT, upload.single('image'), updateImage);
userRouter.route('/refresh-token').post(verifyJWT, userRefreshToken);

export default userRouter;
