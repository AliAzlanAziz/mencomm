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
        Student.findOne({user: req.id})
        .populate('user')
        .exec()
        .then(std => {
            if(std._id != null){
                return res.status(200).json({
                    message: 'Success',
                    name: std?.user?.name,
                    rating: std?.rating,
                    address: std?.user?.location?.address,
                    email: std?.user?.email,
                    image: std?.user?.avatar_url,
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
        Contract.find({student: req.id})
        .populate("post")
        .populate("tutor")
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
                    fbid: cont?.feedback?._id,
                    ttr_review: cont?.feedback?.tutor?.review,
                    ttr_rating: cont?.feedback?.tutor?.rating,
                    std_review: cont?.feedback?.student?.review,
                    std_rating: cont?.feedback?.student?.rating,
                })
            })
        })
    },

    getAllPosts: (req, res, next) => {
        Post.find({createdBy: req.id, user_type: "std"})
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
                    start_date: item?.start_date,
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
            Tutor.findOne({user: post.createdBy})
            .exec()
            .then(ttr => {
                return res.status(200).json({
                    id: post?._id,
                    name: post?.createdBy?.name,
                    avatar_url: post?.createdBy?.avatar_url,
                    rating: ttr?.rating,
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
        Contract.find({ student: req.id })
        .populate("tutor")
        .populate("student")
        .populate("feedback")
        .exec()
        .then(conts => {
            let result = []
            conts.forEach(item => {
                result.push({
                    _id: item?.feedback?._id,
                    tutor: item?.tutor?.name,
                    avatar_url: item?.tutor?.avatar_url,
                    review: item?.feedback?.tutor?.review,
                    rating: item?.feedback?.tutor?.rating,
                })
            })

            Student.findOne({user: req.id})
            .exec()
            .then(std => {
                return res.status(200).json({
                    name: conts[0]?.student?.name,
                    avatar_url: conts[0]?.student?.avatar_url,
                    rating: std?.rating,
                    data: result
                })
            })
        })
    },

    postCreateFeedback: (req, res, next) => {
        const stdfb = {
            _id: req.body.fbid || new mongoose.Types.ObjectId(),
            contract: req.body.contractid,
            student: {
                review: req.body.std_review,
                rating: req.body.std_rating
            }
        }

        Feedback.findOneAndUpdate({_id: stdfb._id}, stdfb, { upsert: true, new: true, setDefaultsOnInsert: true })
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

    postCreateContract: (req, res, next) => {
        const cont = new Contract({
            _id: new mongoose.Types.ObjectId(),
            tutor: req.body.tutorid,
            student: req.id,
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
        Student.findOne({student: req.id})
        .exec()
        .then(std => {
            return res.status(200).json({
                grade: std?.info?.grade,
                course: std?.info?.course,
                tuition_type: std?.tuition_type
            })
        })
    },

    postUpdateInfo: (req, res, next) => {
        const stdinfo = {
            info: {
                grade: req.body.grade,
                course: req.body.course,
            },
            tuition_type: req.body.tuition_type
        }

        Student.findOneAndUpdate({student: req.id}, stdinfo)
        .exec()
        .then(std => {
            if(std._id == null){
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
        let ttrQuery = {}
        let postQuery = { user_type: "ttr" }
        
        if(req.body.rating != -1){
            ttrQuery.rating = req.body.rating
        }
        if(req.body.tuition_type != "-1"){
            postQuery.tuition_type = req.body.tuition_type
        }
        if(req.body.grade != "-1"){
            ttrQuery.grade = req.body.grade
            postQuery.grade = req.body.grade
        }
        if(req.body.minfee != -1 && req.body.maxfee != -1){
            postQuery.fee = { '$gte': req.body.minfee, '$lte': req.body.maxfee}
        }else if(req.body.minfee != -1){
            postQuery.fee = { '$gte': req.body.minfee }
        }else if(req.body.maxfee != -1){
            postQuery.fee = { '$lte': req.body.maxfee }
        }
        const ttrs_result = new Array()
        const posts_result = new Array()
        
        const { location } = await User.findById(req.id)

        Tutor.find(ttrQuery)
        .populate("user")
        .exec()
        .then(ttrs => {
            ttrs.forEach(item => {
                if(req.body.nearbies != false){
                    const lat1 = item?.user?.location?.latitude
                    const lng1 = item?.user?.location?.longitude
                    const dist = getDistanceBetweenCoords(lat1, lng1, location.latitude, location.longitude, "Km")
                
                    if(dist <= 2 && dist != -1 ){
                        ttrs_result.push({
                            _id: item?.user?._id,
                            name: item?.user?.name,
                            avatar_url: item?.user?.avatar_url,
                            rating: item?.rating,
                        })
                    }
                }else{
                    ttrs_result.push({
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
                        const lat1 = item?.location?.latitude
                        const lng1 = item?.location?.longitude
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
                    message: ttrs_result.length + " tutors returned & " + posts_result.length + " posts returned",
                    tutors: ttrs_result,
                    posts: posts_result
                })
            })
        })
    },
}