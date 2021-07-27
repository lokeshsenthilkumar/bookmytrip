import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt  from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullName:{
        required: [true, 'Please enter your name'],
        type:String,
    },
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    }
    
});

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = (password == user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect credentials');
    }
    throw Error('incorrect credentials');
};

export default mongoose.model('User',userSchema);