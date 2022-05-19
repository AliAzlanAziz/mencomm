const mongoose = require("mongoose")
const User = require('../models/user')
const Tutor = require('../models/tutor')
const Student = require('../models/student')
const Post = require('../models/post')
const Contract = require('../models/contract')
const Message = require('../models/message')
const ContentBasedRecommender = require('content-based-recommender')
const { getDistanceBetweenCoords } = require("../utils/distance")
const recommender = new ContentBasedRecommender({
    minScore: 0,
    maxSimilarDocs: 25
})

module.exports = {
    getProfile: (req, res, next) => {
        Student.findOne({user: req.id})
        .populate('user')
        .exec()
        .then(std => {
            if(std?._id != null){
                return res.status(200).json({
                    message: 'Success',
                    name: std?.user?.name,
                    rating: std?.rating,
                    address: std?.user?.location?.address,
                    email: std?.user?.email,
                    image: std?.user?.avatar_url,
                })
            }else{
                console.log(std)
                return res.status(500).json({
                    message: 'Internal Server Error',
                    st:std
                })
            }
        })
    },

    postCreatePost: (req, res, next) => {
        const post = new Post({
            _id: new mongoose.Types.ObjectId(),
            user_type: "std",
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
        .exec()
        .then(cont => {
            Tutor.findOne({user: cont?.tutor?._id})
            .populate('user')
            .exec()
            .then(ttr => {
                return res.status(200).json({
                    id: cont?._id,
                    userId: cont?.tutor?._id,
                    name: cont?.tutor?.name,
                    avatar_url: cont?.tutor?.avatar_url,
                    rating: ttr?.rating,
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
        Post.find({createdBy: req.id, user_type: "std"})
        .populate("createdBy")
        .exec()
        .then(posts => {
            let result = []
            posts.forEach(item => {
                result.push({
                    id: item?._id,
                    userId: item?.createdBy?._id,
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
                let isAccepted = false
                let isRequested = false
                Post.find({_id: req.params.id, "requests.user": req.id})
                .then(pst => {
                    if(pst[0]?._id ){
                        pst[0].requests.find(item => {
                            if(item.user.toString() == req.id){
                                isAccepted = item.isAccepted
                            }
                        })
                        isRequested = true
                    }
                    return res.status(200).json({
                        id: post?._id,
                        userId: post?.createdBy?._id,
                        name: post?.createdBy?.name,
                        avatar_url: post?.createdBy?.avatar_url || '',
                        rating: ttr?.rating || 0,
                        created_on: post?.created_on,
                        course: post?.course,
                        grade: post?.grade,
                        tuition_type: post?.tuition_type || '',
                        fee: post?.fee,
                        address: post?.location?.address || '',
                        start_date: post?.start_date || '',
                        description: post?.description || '',
                        schedule: post?.schedule || [],
                        isAccepted: isAccepted,
                        isRequested: isRequested
                    })
                })
            })
        })
    },

    getFeedbacks: (req, res, next) => {
        Contract.find({ student: req.id })
        .populate("tutor")
        .exec()
        .then(conts => {
            let result = []
            conts.forEach(item => {
                result.push({
                    id: item?._id,
                    name: item?.tutor?.name,
                    avatar_url: item?.tutor?.avatar_url,
                    review: item?.ttr_feedback?.review,
                    rating: item?.ttr_feedback?.rating,
                    created_on: item?.created_on
                })
            })

            return res.status(200).json({
                message: result.length + ' feedbacks retreived',
                data: result
            })
        })
    },

    postCreateFeedback: async (req, res, next) => {
        const std_feedback = {
            review: req.body.review,
            rating: req.body.rating
        }

        Contract.findByIdAndUpdate(req.body.contractId, {std_feedback: std_feedback})
        .then(async cont => {
            if(cont._id == null || cont._id == undefined){
                return res.status(500).json({
                    message: 'Internal Server Error'
                })
            }

            const conts = await Contract.find({tutor: req.body.userId})
            if(conts[0]._id == null || conts[0]._id == undefined){
                return res.status(500).json({
                    message: 'Internal Server Error'
                })
            }
            
            const rateObj = conts.reduce((acc, item) => {
                if(item?.std_feedback?.rating > 0){
                    acc['rating'] = acc['rating'] + item?.std_feedback?.rating
                    acc['count'] = acc['count'] + 1
                }
                return acc
            }, { rating: 0, count: 0})

            Tutor.findOneAndUpdate({user: req.body.userId}, {rating: rateObj.rating/rateObj.count})
            .then(ttr => {
                if(ttr._id == null || ttr._id == undefined){
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

    postEnroll: (req, res, next) => {
        const request = {
            user: req.id,
            isAccepted: false,
            time_requested: new Date(),
            time_accepted: null
        }

        Post.findByIdAndUpdate(req.params.id, {$push: {requests: request}})
        .then(post => {
            return res.status(200).json({
                message: 'Requested to enroll successfully'
            })
        })
    },

    postCancelEnroll: (req, res, next) => {
        Post
        .findByIdAndUpdate(
            req.params.id,
            {$pull:
                { requests: 
                    {
                        user: req.id
                    }
                }
            }
        )
        .then(post => {
            return res.status(200).json({
                message: 'Cancelled request to enroll'
            })
        })
    },

    getAnnouncements: (req, res, next) => {
        Post.findById(req.params.id)
        .populate("createdBy")
        .exec()
        .then(post => {
            return res.status(200).json({
                id: post?.createdBy?._id,
                name: post?.createdBy?.name,
                avatar_url: post?.createdBy?.avatar_url,
                data: post?.announcements,
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
                    message: 'Internal Server Error',
                })
            }else{
                return res.status(200).json({
                    message: 'Info Updated Successfully'
                })
            }
        })
    },

    postSearchPeople: async (req, res, next) => {
        let ttrQuery= {}
        
        ttrQuery.rating = { '$gte': req.body.rating }
        ttrQuery = { ...ttrQuery, 'info.grade': { '$regex': req.body.grade, '$options': 'ix'} }

        const ttrs_result = new Array()
        
        const { location } = await User.findById(req.id)

        Tutor.find(ttrQuery)
        .populate('user')
        .then(ttrs => {
            ttrs.forEach(item => {
                if(item?.user?.name?.toLowerCase()?.includes(req?.body?.name?.toLowerCase())){
                    if(req.body.nearbies !== false){
                        const lat1 = item?.user?.location?.latitude
                        const lng1 = item?.user?.location?.longitude
                        const dist = getDistanceBetweenCoords(lat1, lng1, location.latitude, location.longitude, "Km")
                    
                        if(dist <= 5 && dist !== -1){
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
                }
            })

            return res.status(200).json({
                message: ttrs_result.length + " tutors returned.",
                tutors: ttrs_result,
            })
        })
    },

    postSearchPost: async (req, res, next) => {
        let postQuery = { user_type: "ttr" }
        
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
        Tutor.findOne({user: req.params.id})
        .populate('user')
        .exec()
        .then(async ttr => {
            if(ttr?._id != null){
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
                            review: item?.std_feedback?.review || '',
                            rating: item?.std_feedback?.rating || 0
                        })
                    })
                    return res.status(200).json({
                        user: {
                            name: ttr?.user?.name,
                            rating: ttr?.rating || 0,
                            avatar_url: ttr?.user?.avatar_url || '',
                            id: ttr?.user?._id,
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
            { $match: { user_type: 'ttr' } },
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
        // console.log(similarDocuments)
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

    getChatList: async (req, res, next) => {
        let to = await Message.aggregate(
            [
                // Matching pipeline, similar to find
                {
                    $match: {
                        to: new mongoose.Types.ObjectId(req.id)
                    }
                },
                // Sorting pipeline
                { 
                    $sort: { 
                        time: -1 
                    } 
                },
                // Grouping pipeline
                {
                    $group: {
                        "_id": "$from",
                        text: {
                            "$first": "$text" 
                        },
                        time: {
                            "$first": "$time" 
                        }
                    }
                },
                // Project pipeline, similar to select
                {
                     "$project": { 
                        "_id": 0,
                        "from": "$_id",
                        "text": 1,
                        "time": 1
                    }
                }
            ]
        )

        let from = await Message.aggregate(
            [
                // Matching pipeline, similar to find
                { 
                    $match: { 
                        from: new mongoose.Types.ObjectId(req.id)
                    }
                },
                // Sorting pipeline
                { 
                    $sort: { 
                        time: -1 
                    } 
                },
                // Grouping pipeline
                {
                    $group: {
                        "_id": "$to",
                        text: {
                            "$first": "$text" 
                        },
                        time: {
                            "$first": "$time" 
                        }
                    }
                },
                // Project pipeline, similar to select
                {
                     "$project": { 
                        "_id": 0,
                        "from": "$_id",
                        "text": 1,
                        "time": 1
                    }
                }
            ]
        )
        
        console.log([...to, ...from])
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
}