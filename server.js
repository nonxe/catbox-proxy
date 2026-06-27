const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("*", async (req, res) => {
    const file = req.path;

    try {
        const response = await axios.get(
            `https://files.catbox.moe${file}`,
            {
                responseType: "stream"
            }
        );

        if (response.headers["content-type"])
            res.setHeader("Content-Type", response.headers["content-type"]);

        if (response.headers["content-length"])
            res.setHeader("Content-Length", response.headers["content-length"]);

        response.data.pipe(res);

    } catch (err) {
        res.status(404).send("File not found.");
    }
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
