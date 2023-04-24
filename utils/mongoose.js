import mongoose from 'mongoose';
const host = 'mongo-scrapedStackOverflow';
const port = 27017;
const database = 'miscrapedStackOverflow';
const MONGODB_URI = `mongodb://${host}:${port}/${database}`;


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log ('conexion satisfactoria a MongoDB'))
    .catch((error)=> console.error('Error al conectarse a MongoDB: ', error));

    export default mongoose;
