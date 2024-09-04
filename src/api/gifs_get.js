module.exports = (app, io) => {
    app.get("/gifs", async (req, res) => {
        // Make sure that the server supports gifs
        if (!process.env.GIPHY_TOKEN && !process.env.TENOR_TOKEN) return res.status(501).send({ message: "This server doesn't support gifs!" });

        const id = req.query.id;
        const origin = req.query.origin;
        if (!id) return res.status(400).send({ message: "Missing Gif's ID" });
        if (!origin || (origin != 'T' && origin != 'G')) return res.status(400).send({ message: "Missing Gif's Origin [(T)enor/(G)iphy]" });

        if (origin == 'T') return await getTenorGif(id, res);
        if (origin == 'G') return await getGiphyGif(id, res);
    });
};

async function getTenorGif(id, res) {
    try {
        const response = await fetch(`https://tenor.googleapis.com/v2/posts?key=${process.env.TENOR_TOKEN}&media_filter=gif&ids=${id}`);
        const json = await response.json();
        if (response.status != 200)
            return res.stauts(404).send({ message: "Gif not found!" });
        res.send({
            source: json.results[0].media_formats.gif.url,
            width: json.results[0].media_formats.gif.dims[0],
            height: json.results[0].media_formats.gif.dims[1]
        });
    } catch (e) {
        res.status(404).send({ message: "Gif not found" })
    }
}

async function getGiphyGif(id, res) {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${process.env.GIPHY_TOKEN}&rating=g`)
        const json = await response.json();
        if (response.status != 200)
            return res.stauts(404).send({ message: "Gif not found!" });
        res.send({
            source: json.data.images.original.url,
            width: parseInt(json.data.images.original.width),
            height: parseInt(json.data.images.original.height)
        })
    } catch (e) {
        res.status(404).send({ message: "Gif not found" })
    }
}
