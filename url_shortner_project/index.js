const express = require("express")
const router = require("./routes/url")
const urlmodel = require("./models/url")
const { connectionToDb } = require("./connect")

const app = express()
app.use(express.json())
app.use("/url", router)

app.get("/:shortId", async (req, res) => {
    const shortID = req.params.shortId;
    console.log('shortId: ', shortID);

    const entry = await urlmodel.findOneAndUpdate({
        shortId: shortID
    }, {
        $push: {
            viewhistory: { timstamp: Date.now(), },
        }
    },)

    console.log('entry: ', entry);
    if (!entry.redirectURL.startsWith("https://")){
        redirectedUrl = "https://" + entry.redirectURL
        res.redirect(redirectedUrl)
        return
    }

    res.redirect(entry.redirectURL)
})

const PORT = 7500


app.listen(PORT, () => {
    connectionToDb('mongodb://127.0.0.1:27017/short_url')
        .then(() => {
            console.log('connected to db');
        })
    console.log(`Server is running on port ${PORT}`);
})