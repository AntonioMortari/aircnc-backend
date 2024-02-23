import mongoose from 'mongoose';

const connectDatabase = async () => {

    try {
        mongoose.connect(process.env.MONGO_CONNECT || '');
        console.log('Connection successful');
    } catch (error) {
        console.log('Unable to connect to database', error);
    }

};

connectDatabase();