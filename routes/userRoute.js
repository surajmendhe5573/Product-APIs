const express= require('express');
const User= require('../models/User');
const router= express.Router();
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
require('dotenv').config();

// sign up
router.post('/signup', async(req,res)=>{
    try {
        const {username, email, password}= req.body;
        const userExist= await User.findOne({email});

        if(userExist){
           return res.status(401).json({message: 'User already exist'})
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        const newUser= new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({message: 'User registered successfully',newUser});

    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: 'Internal server error'})
    }
})

// sign in
router.post('/signin', async(req,res)=>{
    try {
        const {email, password}= req.body;
        const userExist= await User.findOne({email});

        // Check if user exists
        if(!userExist){
            return res.status(401).json({message: 'Invalid Credentials'})
        }

         // Check password
        const isMatch= await bcrypt.compare(password, userExist.password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        // Create and sign JWT
        const token= jwt.sign({id: userExist._id}, process.env.SecretKey, {expiresIn: '30d'});
        res.json({token});
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: 'Internal server error'})
    }
})

module.exports= router;
