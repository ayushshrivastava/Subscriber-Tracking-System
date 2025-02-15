import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import User from "../models/user.model.js"
import { JWT_SECRET,JWT_EXPIRES_IN } from "../config/env.js"

export const signUp = async (req, res,next) =>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {name , email, password} = req.body;

        // check if user is already registered
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // create user
        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword
        }],{session: session});

        // generate token
        const token = jwt.sign({userid: newUsers[0]._id},JWT_SECRET,{expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data:{
                token,
                user:newUsers[0],
            }
        });
}catch(error){
    await session.abortTransaction();
    session.endSession();
    next(error);
}
}

export const signIn = async (req, res,next) =>{
    try{
        const {email, password} = req.body;

        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // check if password is correct
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        // generate token
        const token = jwt.sign({userid: user._id},JWT_SECRET,{expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: 'User Signed in successfully',
            data:{
                token,
                user,
            }
        });
    }catch (error) {
        next(error);
      }
}

export const signOut = async (req, res,next) =>{
    try{
        res.status(200).json({
            success: true,
            message: 'User Signed out successfully',
        });
    }catch (error) {
        next(error);
      }

      
}

