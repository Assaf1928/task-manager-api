const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const userScheme = new mongoose.Schema( {
    name: {
        type: String,
        required:true,
        trim: true
    },
    email: {
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error('email is invaild');
        }
    },
    age: {
        type:Number,
        default:0,
        validate(value){
            if(value < 0)
                throw new Error('Age must be a positive number')
            }
        },
    tokens: [{
        token:{
            type:String,
            required:true
        }
    }],
    avatar: {
        type: Buffer
    },
    password: {
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value) { 
            if(value.toLowerCase().includes('password'))
                throw new Error('you used the word password as a pw')
            }   
        }, 
        
},{
    timestamps:true
})

userScheme.virtual('tasks', {
    ref: 'Task',
    localField:'_id',
    foreignField:'owner'
})
userScheme.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject;
}

//normal function inorder to use bind, we want to use 'this' syntax inside the method
userScheme.methods.generateAuthToken = async function () {
    const user = this
    const token =  jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userScheme.statics.findByCredentials = async (email,password) => {
const user = await User.findOne({email})

    if(!user) 
        throw new Error('Unable to login')
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch)
         throw new Error('Unable to login')

         return user

}

//Hash the data plain text password before saving.
userScheme.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
// make sure we remove the users tasks before removing the user
userScheme.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})
const User = mongoose.model('User',userScheme)
module.exports = User