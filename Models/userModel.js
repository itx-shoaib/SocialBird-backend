import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a email"],
        trim: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [6, "Password must be greater then 6 digits"]
    },
    firstname: {
        type: String,
        required: [true, "Please enter firstname"]
    },
    lastname: {
        type: String,
        required: [true, "Please enter the lastname"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    worksAt: String,
    relationship: String,
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
},
    { timestamps: true })

const userModal = mongoose.model('users', userSchema)

export default userModal