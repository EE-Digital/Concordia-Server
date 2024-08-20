module.exports = (response, res) => {
    if (!response || !res) throw new Error("Missing response/res!");

    if (response.status && response.status != 200)
        return res.status(response.status).send({ message: response.message });

    return res.send(response);
}