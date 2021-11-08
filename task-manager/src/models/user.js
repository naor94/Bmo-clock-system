const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const employee = require('./employee')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.includes("password")) {
                throw new Error('password cannot contain te string "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('employee', {
    ref: 'employee',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
    const userObject = this.toObject()

    delete userObject.tokens
    delete userObject.password

    console.log(userObject)

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, 'thisismynewcourse')
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}



userSchema.statics.findByCredentials = async(email, password) => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user

}

// Hash the plain text password before saving
userSchema.pre('save', async function(next) {

    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 8)
    }
    next()
})

//delete user employees when user is removed
userSchema.pre('remove', async function(next) {
    const user = this
    await employee.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User