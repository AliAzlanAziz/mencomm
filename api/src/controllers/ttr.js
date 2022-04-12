const mongoose = require("mongoose")
const User = require('../models/user')
const Tutor = require('../models/tutor')
const Student = require('../models/student')
const Post = require('../models/post')
const Contract = require('../models/contract')
const Message = require('../models/message')
const Report = require('../models/report')
const ContentBasedRecommender = require('content-based-recommender')
const { getDistanceBetweenCoords } = require("../utils/distance")
const recommender = new ContentBasedRecommender({
    minScore: 0.2,
    maxSimilarDocs: 25
})

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
            course: req.body.course,
            fee: req.body.fee,
            grade: req.body.grade,
            tuition_type: req.body.tuition_type,
            location: req.body.location,
            start_date: req.body.start_date,
            schedule: req.body.schedule,
            description: req.body.description,
            created_on: new Date(),
            content: `${req.body.course} ${req.body.grade} ${req?.body?.tuition_type} ${req.body?.location?.address} ${req.body?.description}`
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
                    name: item?.student?.name,
                    avatar_url: item?.student?.avatar_url,
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
        .exec()
        .then(cont => {
            Student.findOne({user: cont?.student})
            .populate('user')
            .exec()
            .then(std => {
                return res.status(200).json({
                    id: cont?._id,
                    userId: cont?.student?._id,
                    name: cont?.student?.name,
                    avatar_url: cont?.student?.avatar_url,
                    rating: std?.rating,
                    course: cont?.post?.course,
                    grade: cont?.post?.grade,
                    tuition_type: cont?.post?.tuition_type,
                    fee: cont?.post?.fee,
                    address: cont?.post?.location?.address || '',
                    start_date: cont?.post?.start_date,
                    schedule: cont?.post?.schedule,
                    created_on: cont?.created_on,
                    ttr_review: cont?.ttr_feedback?.review || '',
                    ttr_rating: cont?.ttr_feedback?.rating,
                    std_review: cont?.std_feedback?.review || '',
                    std_rating: cont?.std_feedback?.rating,
                })
            })
        })
    },

    getAllPosts: (req, res, next) => {
        Post.find({createdBy: req.id, user_type: "ttr"})
        .populate('createdBy')
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
                    userId: post?.createdBy?._id,
                    name: post?.createdBy?.name,
                    avatar_url: post?.createdBy?.avatar_url || '',
                    rating: std?.rating || 0,
                    created_on: post?.created_on,
                    course: post?.course,
                    grade: post?.grade,
                    tuition_type: post?.tuition_type || '',
                    fee: post?.fee,
                    address: post?.location?.address || '',
                    start_date: post?.start_date || '',
                    description: post?.description || '',
                    schedule: post?.schedule || [],
                })
            })
        })
    },

    getFeedbacks: (req, res, next) => {
        Contract.find({tutor: req.id})
        .populate("student")
        .exec()
        .then(conts => {
            let result = []
            conts.forEach(item => {
                result.push({
                    id: item?.feedback?._id,
                    name: item?.student?.name,
                    avatar_url: item?.student?.avatar_url,
                    review: item?.std_feedback?.review,
                    rating: item?.std_feedback?.rating,
                    created_on: item?.created_on
                })
            })

            return res.status(200).json({
                message: result.length + ' feedbacks retreived',
                data: result
            })
        })
    },

    postCreateFeedback: (req, res, next) => {
        const ttr_feedback = {
            review: req.body.review,
            rating: req.body.rating
        }

        Contract.findByIdAndUpdate(req.body.contractId, {ttr_feedback: ttr_feedback})
        .then(async cont => {
            console.log(cont)
            if(cont._id == null || cont._id == undefined){
                return res.status(500).json({
                    message: 'Internal Server Error'
                })
            }

            const conts = await Contract.find({student: req.body.userId})
            if(conts[0]._id == null || conts[0]._id == undefined){
                return res.status(500).json({
                    message: 'Internal Server Error'
                })
            }
    
            const rateObj = conts.reduce((acc, item) => {
                if(item?.ttr_feedback?.rating > 0){
                    acc['rating'] = acc['rating'] + item?.ttr_feedback?.rating
                    acc['count'] = acc['count'] + 1
                }
                return acc
            }, { rating: 0, count: 0})

            Student.findOneAndUpdate({user: req.body.userId}, {rating: rateObj.rating/rateObj.count})
            .then(std => {
                if(std._id == null || std._id == undefined){
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    })
                }

                return res.status(200).json({
                    message: 'Feedback updated successfully'
                })
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
            description: req.body.description,
            time: new Date()
        }
        Post.findByIdAndUpdate(req.body.id, { $push: { announcements: announcement } })
        .exec()
        .then(post => {
            return res.status(200).json({
                message: "Announcement added successfully!"
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
    
    postUpdateInfo: (req, res, next) => {
        const ttrinfo = {
            info: {
                grade: req.body.grade,
                course: req.body.course,
            },
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

    postSearchPeople: async (req, res, next) => {
        let stdQuery= {}
        
        stdQuery.rating = { '$gte': req.body.rating }
        stdQuery = { ...stdQuery, 'info.grade': { '$regex': req.body.grade, '$options': 'ix'} }

        const stds_result = new Array()
        
        const { location } = await User.findById(req.id)

        Student.find(stdQuery)
        .populate('user')
        .then(stds => {
            stds.forEach(item => {
                if(item?.user?.name?.toLowerCase()?.includes(req?.body?.name?.toLowerCase())){
                    if(req.body.nearbies !== false){
                        const lat1 = item?.user?.location?.latitude
                        const lng1 = item?.user?.location?.longitude
                        const dist = getDistanceBetweenCoords(lat1, lng1, location.latitude, location.longitude, "Km")
                    
                        if(dist <= 5 && dist !== -1){
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
                }
            })

            return res.status(200).json({
                message: stds_result.length + " students returned.",
                students: stds_result,
            })
        })
    },

    postSearchPost: async (req, res, next) => {
        let postQuery = { user_type: "std" }
        
        if(req.body.tuition_type != ''){
            postQuery.tuition_type = req.body.tuition_type
        }
        postQuery = { ...postQuery, 'grade': { '$regex': req.body.grade, '$options': 'ix'} }
        postQuery = { ...postQuery, 'course': { '$regex': req.body.course, '$options': 'ix'} }
        postQuery.fee = { '$gte': req.body.minfee, '$lte': req.body.maxfee}
        
        const posts_result = new Array()
        
        const { location } = await User.findById(req.id)

        Post.find(postQuery)
        .populate("createdBy")
        .then(posts => {
            posts.forEach(item => {
                if(item?.createdBy?.name?.toLowerCase()?.includes(req?.body?.name?.toLowerCase())){
                    if(req.body.nearbies != false){
                        const lat1 = item?.location?.latitude
                        const lng1 = item?.location?.longitude
                        const dist = getDistanceBetweenCoords(lat1, lng1, location.latitude, location.longitude, "Km")

                        if(dist <= 2 && dist != -1 ){
                            posts_result.push({
                                _id: item?._id,
                                userId: item?.createdBy?._id,
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
                            userId: item?.createdBy?._id,
                            name: item?.createdBy?.name,
                            avatar_url: item?.createdBy?.avatar_url,
                            created_on: item?.created_on,
                            fee: item?.fee,
                            grade: item?.grade,
                            course: item?.course,
                            description: item?.description
                        })
                    }
                }
            }) 

            return res.status(200).json({
                message: posts_result.length + " posts returned.",
                posts: posts_result
            })
        })
    },

    getOthersProfile: (req, res, next) => {
        Student.findOne({user: req.params.id})
        .populate('user')
        .exec()
        .then(async std => {
            if(std?._id != null){
                Contract.find({tutor: req.params.id})
                .populate('student')
                .then(conts => {
                    let contracts = []
                    conts.forEach(item => {
                        contracts.push({
                            id: item?._id,
                            name: item?.student?.name,
                            avatar_url: item?.student?.avatar_url || '',
                            created_on: item?.created_on,
                            review: item?.ttr_feedback?.review || '',
                            rating: item?.ttr_feedback?.rating || 0
                        })
                    })
                    return res.status(200).json({
                        user: {
                            name: std?.user?.name,
                            rating: std?.rating || 0,
                            avatar_url: std.user?.avatar_url || '',
                            id: std?.user?._id,
                        },
                        contracts: contracts
                    })
                })
            }else{
                return res.status(404).json({
                    message: 'Not found'
                })
            }
        })
    },

    getRequests: (req, res, next) => {
        Post.findById(req.params.id)
        .populate("requests.user")
        .then(post => {
            let result = []
            post.requests.forEach(item => {
                if(!item.isAccepted)
                    result.push({
                        postId: post._id,
                        reqId: item._id,
                        userId: item.user._id,
                        name: item.user.name,
                        avatar_url: item.user.avatar_url
                    })
            })

            return res.status(200).json({
                message: result.length + " requests returned",
                data: result
            })
        })
    },

    getEnrolls: (req, res, next) => {
        Post.findById(req.params.id)
        .populate("requests.user")
        .then(post => {
            let result = []
            post.requests.forEach(item => {
                if(item.isAccepted)
                    result.push({
                        postId: post._id,
                        reqId: item._id,
                        userId: item.user._id,
                        name: item.user.name,
                        avatar_url: item.user.avatar_url
                    })
            })

            return res.status(200).json({
                message: result.length + " enrolls returned",
                data: result
            })
        })
    },

    postAcceptRequest: (req, res, next) => {
        Post.updateOne(
            {
                _id: req.body.postId, 
                "requests._id":  req.body.reqId
            },
            {
                $set: {
                    "requests.$.isAccepted": true,
                }
            })
        .then(post => {
            if(post !== undefined || post !== null){
                const cont = new Contract({
                    _id: new mongoose.Types.ObjectId(),
                    tutor: req.id,
                    student: req.body.userId,
                    post: req.body.postId,
                    created_on: new Date()
                })
                cont
                .save()
                .then(result => { 
                    return res.status(200).json({
                        message: "Request accepted and contract created successfully!",
                        id: result._id
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                })
            }
        })
    },

    postRejectEnroll: (req, res, next) => {
        Post.updateOne(
            {
                _id: req.body.postId, 
                "requests._id":  req.body.reqId
            },
            {
                $set: {
                    "requests.$.isAccepted": false,
                }
            }
            )
        .then(post => {
            if(post !== undefined || post !== null){
                return res.status(200).json({
                    message: "Enrollment rejected successfully!"
                })
            }
            // return res.status(200).json({
            //     message: result.length + " requests returned",
            //     data: result
            // })
        })
    },

    getNewsfeed: async (req, res, next) => {
        const user = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.id) } },
            {
                $project: {
                    "_id": 0,
                    "id": "$_id",
                    "content": 1
                }
            },
        ]);
        const raw_posts = await Post.aggregate([
            { $match: { user_type: 'std' } },
            {
                $project: {
                    "_id": 0,
                    "id": "$_id",
                    "createdBy": 1,
                    "course": 1,
                    "grade": 1,
                    "fee": 1,
                    "created_on": 1,
                    "content": 1
                }
            },
        ]);
        const posts = await Post.populate(raw_posts, {path: 'createdBy', select: 'name avatar_url _id'})
        posts.push(user[0])
        const postMap = posts.reduce((acc, post) => {
            acc[post.id] = post
            
            return acc
        }, {})

        recommender.train(posts)
        delete raw_posts //free memory
        delete posts //free memory

        const similarDocuments = recommender.getSimilarDocuments(req.id, 0, 25)
        let result = similarDocuments.map(item => ({
            id: postMap[item.id]?.id,
            userId: postMap[item.id]?.createdBy?._id,
            name: postMap[item.id]?.createdBy?.name,
            avatar_url: postMap[item.id]?.createdBy?.avatar_url,
            created_on: postMap[item.id]?.created_on,
            course: postMap[item.id]?.course,
            grade: postMap[item.id]?.grade,
            // tuition_type: postMap[item.id]?.tuition_type,
            fee: postMap[item.id]?.fee,
            // address: postMap[item.id]?.location?.address,
            // start_date: postMap[item.id]?.start_date,
            // description: postMap[item.id]?.description
        }))
        // console.log(result)

        return res.status(200).json({
            message: result.length + " posts returned",
            data: result
        })
    },

    postMessage: (req, res, next) => {
        const message = new Message({
            to: req.body.userId,
            from: req.id,
            text: req.body.text,
            time: new Date()
        })

        message.save()
        .then(msg => {
            if(msg._id){
                return res.status(200).json({
                    message: 'Message sent!'
                })
            }
        })
    },

    postReport: (req, res, next) => {
        const report = new Report({
            reporter: req.id,
            reported_user: req.body.userId,
            reported_post: req.body.postId,
            description: req.body.description,
            time: new Date()
        })

        report.save()
        .then(msg => {
            if(msg._id){
                return res.status(200).json({
                    message: 'Reported'
                })
            }
        })
    },
}