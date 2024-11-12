const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
    },
    lastName:{
        type: String,
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invlid email address: " + value);
            }
        }
    },
    password:{
        type: String,
        required: true,
        minUppercase:1,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invlid Password: " + value);
            }
        }
    },
    age:{
        type: Number,
        min: 18,
    },
    gender:{
        type: String, 
    },
    photoUrl:{
        type: String,
        default :"https://media.istockphoto.com/id/1337911282/vector/man-profile-avatar-silhouette-front-view-of-an-anonymous-male-person-face.jpg?s=612x612&w=0&k=20&c=qBzUSk66rViQiBLvOHeflYR1PCvPm6WuLFJ7MP5J2ek=",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invlid Photo link: " + value);
            }
        }
    },
    about: {
        type: String,
        default: "This is a new user",
        trim: true,
    },
    skills:{
        type: [String],

    },

},
{
    timestamps: true,
})

userSchema.methods.getJWT = async function(){
    const user =this;

    const token = await jwt.sign({_id: user._id}, "Devmeet@123",
        {expiresIn : "7d"},
    )
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash =  user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordValid; 
}

module.exports = mongoose.model("User", userSchema)