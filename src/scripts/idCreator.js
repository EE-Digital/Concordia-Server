function makeId(length) {
    let ID = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < length; i++) {
        ID += characters.charAt(Math.floor(Math.random() * 36));
    }
    return ID;
}

module.exports = {
    makeId
} 