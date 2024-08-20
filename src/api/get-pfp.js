const fs = require('fs');
const path = require('path');

module.exports = (app, io) => {
    app.get("/users/pfp/:id", (req, res) => {
        const { id } = req.params

        fs.createReadStream(path.join(process.env.UPLOAD_PATH, id)).pipe(res)
    });
};
