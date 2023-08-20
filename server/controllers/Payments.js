const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const {mailSender} = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');

//capture the payment and initiate the Razorpay order

exports.capturePayment = async(req,res) => {
    //get courseId and userId
    const {course_id} = req.body;
    const userId = req.user.body;
    //Validation
    //Validate CourseId
    if(!courseId){
        return res.json({
            success:false,
            message:'Could not find the course',
        });
    }
    //Validate courseDetail
    let course;
    try{
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success:false,
                message:'Could not find the course',
            });
        }
            //Check if user already paid for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if(Course.StudentsEnrolled.includes(uid)){
            return res.status(200).json({
            success:false,
            message:"Student is already enrolled",
        });
    
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
 
    //order Create
    const amount = course.price;
    const currency = "INR";
    const options = {
        amount: amount*100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId: course_id,
            userId,
        },
    };
    try{
        //inititate the payment using Razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            success:true,
            courseName: course.courseName,
            courseDesciption: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })
    }catch(error){
         console.log(error);
         return res.json({
            success:false,
            message:'Could not initiate payment',
         })       
    }
    //return response

};

//Verify signature of Razorpay and Server
exports.verifySignature = async(req,res) => {
    const webhookSecret = '12345678';
    const signature = req.headers["x-razorpay-signature"];
    
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is authorised");

        const {courseId,userId} = req.body.payload.payment.entity.notes;

        try{
            //fulfill the action
            //find the COURSE and enrolll the student in it
            const enrolledCourse = await Course.findByIdAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true},
            );
            console.log(enrolledCourse);
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found",
                });
            }

            //find the student and add the course to its list of enrolled courses
            const enrolledStudent= await User.findByIdAndUpdate(
                {_id:userId},
                {$push:{courses:courseId}},
                {new:true},
            );
                console.log(enrolledStudent);
            
                //confirmation mail send
            const emailResponse = await mailSender(
                enrolledStudent.email,
                'Congratulations from codehelp',
                'Congratulations , you are onboarded to new course',
            );
            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Signature verified and course added",  
            })
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid request",  
        })
    }
};  