import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Mongo URI must be defined');
}

async function isConnected(): Promise<boolean> {
    return mongoose.connection.readyState === 1;
}


async function mongoConnect(): Promise<void> {
    if (await isConnected()) {
        console.log('Already connected to MongoDB');
        return;
    }
    try {
        await mongoose.connect(MONGO_URI as any);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export default mongoConnect;
