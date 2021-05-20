const fp = require('fastify-plugin');
const gallery = async (server, opts) => {
    server.route({
        method: 'GET',
        url: '/api/gallery',
        handler: async (request, reply) => {
            // request.file is the `avatar` file
            // request.body will hold the text fields, if there were any
            const { Gallery } = server.db.models;
            const data = await Gallery.find({});
            reply.code(200).send(data);
        }
    });
    server.route({
        method: 'POST',
        url: '/api/gallery',
        preHandler: server.multer.parser.single('upload'),
        handler: async (request, reply) => {

            // request.file is the `avatar` file
            // request.body will hold the text fields, if there were any
            const { Gallery } = server.db.models;
            const image = new Gallery({
                filename: request.file.filename,
                originalname: request.file.originalname,
                url: request.file.path
            });
            const data = await image.save();
            reply.code(200).send(data);
        }
    });
};
module.exports = fp(gallery);