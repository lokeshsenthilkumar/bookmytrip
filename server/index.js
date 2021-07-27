import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRoutes from './routes/routes.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();

mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true ,useUnifiedTopology: true },()=>{
    console.log("DB Connected");
});

mongoose.set('useFindAndModify','false');

const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/',usersRoutes);

app.listen(process.env.PORT || 4000,()=>{
    console.log("Server started")
});