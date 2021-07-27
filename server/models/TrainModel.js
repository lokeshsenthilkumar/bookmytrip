import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema({
    trainNo:{
        type:String,
    },
    trainName:{
        type:String,
    },
    price:{
        type:Number,
    }
    // imgUrl:{
    //     type:String,
    // },
    // maxQuantity:{
    //     type:Number,
    // },
    // wishlistedBy:{
    //     type : [String],
    //     default : []
    // }
});

export default mongoose.model('train',trainSchema);



