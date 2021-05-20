require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const cors = require('fastify-cors');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('fastify-multer');
const db = require('./config/index');
const Port = process.env.PORT;
const uri = process.env.MONGODB_URI;
const path = require('path');

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

// create cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'fastify-gallery',
        allowedFormats: [ 'jpg', 'png' ],
        transformation: [ { width: 800, height: 800, crop: 'limit' } ]
    }
});

// create multer image parser
const parser = multer({ storage });

// Rsegister plugins below:
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '../public'),
})
/* fastify.get('/', function (req, reply) {
    return reply.sendFile('index.html', { cacheControl: false }) // serving a file disabling cache-control headers
}); */
fastify.get('/', function (req, reply) {
    return reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
});
fastify.register(db, { uri });
fastify.register(cors, { origin: 'http://localhost:5000' });
fastify.register(multer.contentParser);
fastify.register(require('./routes/status'));
fastify.register(require('./routes/gallery'));


//Decorate fastify with our parser
fastify.decorate('multer', { parser });

// create server
const start = async () => {
    try {
        await fastify.listen(Port);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();