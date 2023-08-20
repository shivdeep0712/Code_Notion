const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const mongoose = require('mongoose');

//create rating
exports.createRating = async(req,res)=>{
    try{
        //get user id
        const userId = req.user.id;
        //fetch data from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {_id:courseId,
             studentsEnrolled: {$elematch: {$eq: userId}},
              });
        
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in this course",
            })
        }
        //Check if user already reviewed the course
        
        const alreadyReviewed = await RatingAndReview.findOne(
                                                          {
                                                            user:userId,
                                                            course:courseId,
                                                          } );
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user",
            })
        }                                                  
        //create rating and review  
        const ratingReview = await RatingAndReview.create(
            {rating,review,
             course:courseId,
             user:userId});

        //Update course with rating/review  
        const updatedCourseDetails=  await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews: ratingReview._id,
                }
            },
            {new:true});
        console.log(updatedCourseDetails)
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and review created successfully",
            ratingReview,
        })
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// Get average rating
exports.getAverageRating = async(req,res)=>{
    try{
        //get course Id
         const courseId = req.body.courseId;

         //calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])

        //return rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }
        //if no return/rating exist
        return res.status(200).json({
            success:true,
            message: "Average ratings is 0 , no rating/reviews given till now",
            averageRating:0,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//get all ratings
exports.getAllRatings = async (req,res)=>{
    try{
            const allReviews = await RatingAndReview.find({})
                                                          .sort({rating:"desc"})
                                                          .populate({
                                                            path:"user",
                                                            select:"firstName lastName email image"
                                                          })
                                                          .populate({
                                                            path:"course",
                                                            select:"courseName"
                                                          })  
                                                          .exec();
            return res.status(200).json({
                success:false,
                message:"All reviews fetched successfully",
            })
                                                            
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}