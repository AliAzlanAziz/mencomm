const mongoose = require("mongoose")
const Tutor = require('../models/tutor')
const Student = require('../models/student')
const Post = require('../models/post')
const Contract = require('../models/contract')

module.exports = {
    getProfile: (req, res, next) => {
        Student.findOne({user: req.id})
        .populate('user')
        .exec()
        .then(std => {
            if(std._id != null){
                return res.status(200).json({
                    message: 'Success',
                    name: std.user.name,
                    rating: std.rating,
                    birthday: std.user.birthday,
                    address: std.user?.location?.address,
                    email: std.user.email,
                    image: std.user?.avatar_url,
                })
            }else{
                return res.status(500).json({
                    message: 'Internal Server Error'
                })
            }
        })
    },

    postCreatePost: (req, res, next) => {
        const post = new Post({
            _id: new mongoose.Types.ObjectId(),
            user_type: "std",
            createdBy: req.id,
            course: req.body.coursename,
            fee: req.body.fee,
            grade: req.body.grade,
            tuition_type: req.body.tuitiontype,
            location: req.body.location,
            start_date: req.body.startdate,
            capacity: req.body.capacity,
            schedule: req.body.schedule,
            description: req.body.description
        })

        post
        .save()
        .then(result => { 
            return res.status(200).json({
                message: "Post created successfully",
                id: result._id
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    },

    getAllContracts: (req, res, next) => {
        Contract.find({student: req.id})
        .populate("post")
        .populate("tutor")
        .exec()
        .then(conts => {
            return res.status(200).json({
                message: conts.length + " contracts returned",
                id: conts?._id,
                name: conts?.tutor?.name,
                avatar_url: conts?.tutor?.avatar_url,
                course: conts?.post?.course,
                fee: conts?.post?.fee,
                start_date: conts?.post?.start_date
            })
        })
    },

    getContract: (req, res, next) => {
        Contract.findById(req.params.id)
        .populate("post")
        .populate("tutor")
        .populate("feedback")
        .exec()
        .then(cont => {
            Tutor.findOne({user: cont?.tutor})
            .populate('user')
            .exec()
            .then(ttr => {
                return res.status(200).json({
                    id: cont?._id,
                    name: cont?.tutor?.name,
                    avatar_url: cont?.tutor?.avatar_url,
                    rating: ttr?.rating,
                    course: cont?.post?.course,
                    grade: cont?.post?.grade,
                    tuition_type: cont?.post?.tuition_type,
                    fee: cont?.post?.fee,
                    address: cont?.post?.location.address,
                    start_date: cont?.post?.start_date,
                    schedule: cont?.post?.schedule,
                    tutor_review: cont?.feedback?.tutor_feedback?.review,
                    tutor_rating: cont?.feedback?.tutor_feedback?.rating,
                    student_review: cont?.feedback?.student_feedback?.review,
                    student_rating: cont?.feedback?.student_feedback?.rating,
                })
            })
        })
    },

    getOthersProfile: (req, res, next) => {
        Student.findOne({user: req.params.id})
        .populate('user')
        .exec()
        .then(std => {
            if(std._id != null){
                return res.status(200).json({
                    message: 'Success',
                    name: std.user.name,
                    rating: std.rating,
                    birthday: std.user.birthday,
                    address: std.user?.location?.address,
                    email: std.user.email,
                    image: std.user?.avatar_url,
                })
            }else{
                return res.status(500).json({
                    message: 'Internal Server Error'
                })
            }
        })
    }
}