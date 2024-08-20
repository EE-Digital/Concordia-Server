const multer = require('multer');
const setProfilePicture = require('../database/setProfilePicture');
const respond = require('../scripts/respond');
const upload = multer({ dest: process.env.UPLOAD_PATH })

module.exports = (app, io) => {
    app.post("/users/pfp", upload.single('pfp'), async (req, res) => {
        const { accesstoken } = req.headers;

        if (!accesstoken) return res.status(403).send({ message: "Missing accesstoken!" });

        let response = await setProfilePicture(accesstoken, req.file.path);

        return respond(response, res);
    });
};
