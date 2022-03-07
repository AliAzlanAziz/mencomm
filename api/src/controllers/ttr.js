const mongoose = require("mongoose")
const User = require('../models/user')
const Tutor = require('../models/tutor')
const Student = require('../models/student')
const Post = require('../models/post')
const Contract = require('../models/contract')
const Feedback = require("../models/feedback")
const { getDistanceBetweenCoords } = require("../utils/distance")

module.exports = {
    getProfile: (req, res, next) => {
        Tutor.findOne({user: req.id})
        .populate('user')
        .exec()
        .then(ttr => {
            if(ttr._id != null){
                return res.status(200).json({
                    message: 'Success',
                    name: ttr.user.name,
                    rating: ttr.rating,
                    address: ttr.user?.location?.address,
                    email: ttr.user.email,
                    image: ttr.user?.avatar_url,
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
            user_type: "ttr",
            createdBy: req.id,
            course: req.body.coursename,
            fee: req.body.fee,
            grade: req.body.grade,
            tuition_type: req.body.tuitiontype,
            location: req.body.location,
            start_date: req.body.startdate,
            capacity: req.body.capacity,
            schedule: req.body.schedule,
            description: req.body.description,
            created_on: new Date()
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
        Contract.find({tutor: req.id})
        .populate("post")
        .populate("student")
        .exec()
        .then(conts => {
            let result = []
            conts.forEach(item => {
                result.push({
                    id: item?._id,
                    name: item?.tutor?.name,
                    avatar_url: item?.tutor?.avatar_url,
                    course: item?.post?.course,
                    fee: item?.post?.fee,
                    start_date: item?.post?.start_date
                })
            })

            return res.status(200).json({
                message: conts.length + " contracts returned",
                data: result
            })
        })
    },

    getContract: (req, res, next) => {
        Contract.findById(req.params.id)
        .populate("post")
        .populate("student")
        .populate("feedback")
        .exec()
        .then(cont => {
            Student.findOne({user: cont?.student})
            .populate('user')
            .exec()
            .then(std => {
                return res.status(200).json({
                    id: cont?._id,
                    name: cont?.student?.name,
                    avatar_url: cont?.student?.avatar_url,
                    rating: std?.rating,
                    course: cont?.post?.course,
                    grade: cont?.post?.grade,
                    tuition_type: cont?.post?.tuition_type,
                    fee: cont?.post?.fee,
                    address: cont?.post?.location.address,
                    start_date: cont?.post?.start_date,
                    schedule: cont?.post?.schedule,
                    fbid: cont?.feedback?._id,
                    tutor_review: cont?.feedback?.tutor_feedback?.review,
                    tutor_rating: cont?.feedback?.tutor_feedback?.rating,
                    student_review: cont?.feedback?.student_feedback?.review,
                    student_rating: cont?.feedback?.student_feedback?.rating,
                })
            })
        })
    },

    getAllPosts: (req, res, next) => {
        Post.find({createdBy: req.id, user_type: "ttr"})
        .populate("createdBy")
        .exec()
        .then(posts => {
            let result = []
            posts.forEach(item => {
                result.push({
                    id: item?._id,
                    name: item?.createdBy?.name,
                    avatar_url: item?.createdBy?.avatar_url,
                    created_on: item?.created_on,
                    course: item?.course,
                    grade: item?.grade,
                    tuition_type: item?.tuition_type,
                    fee: item?.fee,
                    address: item?.location?.address,
                    start_date: item?.start_date?.start_date,
                    description: item?.description
                })
            })

            return res.status(200).json({
                message: posts.length + " posts returned",
                data: result
            })
        })
    },

    getPost: (req, res, next) => {
        Post.findById(req.params.id)
        .populate("createdBy")
        .exec()
        .then(post => {
            Student.findOne({user: post.createdBy})
            .exec()
            .then(std => {
                return res.status(200).json({
                    id: post?._id,
                    name: post?.createdBy?.name,
                    avatar_url: post?.createdBy?.avatar_url,
                    rating: std?.rating,
                    created_on: post?.created_on,
                    course: post?.course,
                    grade: post?.grade,
                    tuition_type: post?.tuition_type,
                    fee: post?.fee,
                    address: post?.location?.address,
                    start_date: post?.start_date,
                    description: post?.description,
                    capacity: post?.capacity,
                    schedule: post?.schedule,
                    description: post?.description
                })
            })
        })
    },

    getFeedbacks: (req, res, next) => {
        Contract.find({tutor: req.id})
        .populate("tutor")
        .populate("student")
        .populate("feedback")
        .exec()
        .then(conts => {
            let result = []
            conts.forEach(item => {
                result.push({
                    _id: item?.feedback?._id,
                    tutor: item?.student?.name,
                    avatar_url: item?.student?.avatar_url,
                    review: item?.feedback?.student?.review,
                    rating: item?.feedback?.student?.rating,
                })
            })

            Tutor.findOne({user: req.id})
            .exec()
            .then(ttr => {
                return res.status(200).json({
                    name: conts[0]?.tutor?.name,
                    avatar_url: conts[0]?.tutor?.avatar_url,
                    rating: ttr?.rating,
                    data: result
                })
            })
        })
    },

    postCreateFeedback: (req, res, next) => {
        const ttrfb = {
            contract: req.body.contractid,
            tutor: {
                review: req.body.ttr_review,
                rating: req.body.ttr_rating
            }
        }

        Feedback.findOneAndUpdate({_id: req.body.fbid}, ttrfb, { upsert: true, new: true, setDefaultsOnInsert: true })
        .exec()
        .then(fb => {
            Contract.findByIdAndUpdate(req.body.contractid, {feedback: fb._id})
            .exec()
            .then(cont => {
                if(fb._id == null || cont._id == null){
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    })
                }else{
                    return res.status(200).json({
                        message: 'Feedback Updated Successfully'
                    })
                }
            })
        })
    },

    getAnnouncements: (req, res, next) => {
        Post.findById(req.params.id)
        .populate("createdBy")
        .exec()
        .then(post => {
            return res.status(200).json({
                name: post?.createdBy?.name,
                avatar_url: post?.createdBy?.avatar_url,
                data: post?.announcements
            })
        })
    },

    postAnnouncement: (req, res, next) => {
        const announcement = {
            _id: new mongoose.Types.ObjectId(),
            message: req.body.message,
            time: new Date()
        }
        Post.findByIdAndUpdate(req.params.id, { $push: { announcements: announcement } })
        .exec()
        .then(post => {
            return res.status(200).json({
                message: "successfully added announcement"
            })
        })
    },

    postCreateContract: (req, res, next) => {
        const cont = new Contract({
            _id: new mongoose.Types.ObjectId(),
            tutor: req.id,
            student: req.body.studentid,
            post: req.body.postid,
            created_on: new Date()
        })
        cont
        .save()
        .then(result => { 
            return res.status(200).json({
                message: "Contract Created Successfully",
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
    
    getUpdateInfo: (req, res, next) => {
        Tutor.findOne({tutor: req.id})
        .exec()
        .then(ttr => {
            return res.status(200).json({
                info: ttr?.info
            })
        })
    },

    postUpdateInfo: (req, res, next) => {
        const ttrinfo = {
            info: req.body.info,
        }

        Tutor.findOneAndUpdate({tutor: req.id}, ttrinfo)
        .exec()
        .then(ttr => {
            if(ttr._id == null){
                return res.status(500).json({
                    message: 'Internal Server Error'
                })
            }else{
                return res.status(200).json({
                    message: 'Info Updated Successfully'
                })
            }
        })
    },

    postSearch: async (req, res, next) => {
        let stdQuery = {}
        let postQuery = { user_type: "std" }
        
        if(req.body.rating != -1){
            stdQuery.rating = req.body.rating
        }
        if(req.body.tuition_type != "-1"){
            postQuery.tuition_type = req.body.tuition_type
        }
        if(req.body.grade != "-1"){
            stdQuery.grade = req.body.grade
            postQuery.grade = req.body.grade
        }
        if(req.body.minfee != -1 && req.body.maxfee != -1){
            postQuery.fee = { '$gte': req.body.minfee, '$lte': req.body.maxfee}
        }else if(req.body.minfee != -1){
            postQuery.fee = { '$gte': req.body.minfee }
        }else if(req.body.maxfee != -1){
            postQuery.fee = { '$lte': req.body.maxfee }
        }
        const stds_result = new Array()
        const posts_result = new Array()
        
        const { location } = await User.findById(req.id)

        Tutor.find(stdQuery)
        .populate("user")
        .exec()
        .then(ttrs => {
            ttrs.forEach(item => {
                if(req.body.nearbies != false){
                    const lat1 = item?.user?.location?.latitude
                    const lng1 = item?.user?.location?.longitude
                    const dist = getDistanceBetweenCoords(lat1, lng1, location.latitude, location.longitude, "Km")
                
                    if(dist <= 2 && dist != -1 ){
                        stds_result.push({
                            _id: item?.user?._id,
                            name: item?.user?.name,
                            avatar_url: item?.user?.avatar_url,
                            rating: item?.rating,
                        })
                    }
                }else{
                    stds_result.push({
                        _id: item?.user?._id,
                        name: item?.user?.name,
                        avatar_url: item?.user?.avatar_url,
                        rating: item?.rating,
                    })
                }
            })

            Post.find(postQuery)
            .populate("createdBy")
            .exec()
            .then(posts => {
                posts.forEach(item => {
                    if(req.body.nearbies != false){
                        const lat1 = item?.user?.location?.latitude
                        const lng1 = item?.user?.location?.longitude
                        const dist = getDistanceBetweenCoords(lat1, lng1, location.latitude, location.longitude, "Km")

                        if(dist <= 2 && dist != -1 ){
                            posts_result.push({
                                _id: item?._id,
                                userid: item?.createdBy?._id,
                                name: item?.createdBy?.name,
                                avatar_url: item?.createdBy?.avatar_url,
                                created_on: item?.created_on,
                                fee: item?.fee,
                                grade: item?.grade,
                                course: item?.course,
                                description: item?.description
                            })
                        }
                    }else{
                        posts_result.push({
                            _id: item?._id,
                            userid: item?.createdBy?._id,
                            name: item?.createdBy?.name,
                            avatar_url: item?.createdBy?.avatar_url,
                            created_on: item?.created_on,
                            fee: item?.fee,
                            grade: item?.grade,
                            course: item?.course,
                            description: item?.description
                        })
                    }
                }) 

                return res.status(200).json({
                    message: stds_result.length + " students returned & " + posts_result.length + " posts returned",
                    students: stds_result,
                    posts: posts_result
                })
            })
        })
    },
}