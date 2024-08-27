const fs = require('fs');
const path = require('path');

module.exports = (app, io) => {
    app.get("/users/pfp/:id", (req, res) => {
        const { id } = req.params
        if (fs.existsSync(path.join(process.env.UPLOAD_PATH, id)))
            fs.createReadStream(path.join(process.env.UPLOAD_PATH, id)).pipe(res)
        else res.sendStatus(404);
    });
};
