import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary} from 'cloudinary'

import Post from '../mongoDb/models/post.js'


dotenv.config();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_PROJECT_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECREAT,
})

const router = express.Router()


router.route('/').get(async (req , res)=>{
    try {
        const posts = await Post.find({})
        res.status(200).json({success: true, data: posts})
    } catch (error) {
        res.status(200).json({success: false, message: error})
    }
    
})
router.route('/').post(async (req , res)=>{
    try {
        const { name, prompt, photo } = req.body;
        const photo_url = await cloudinary.uploader.upload(photo)
        const newPost = await Post.create({
            name,
            prompt,
            photo: photo_url.url
        })
        res.status(201).json({success:true , data:newPost})
    } catch (error) {
        res.status(500).json({success:false , message: error})
        
    }

})

export default router;