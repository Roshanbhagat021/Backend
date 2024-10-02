const { nanoid } = require("nanoid");
const URL = require("../models/url")

const genrateNewShortURL = async (req, res) => {
    const shortID = nanoid(8)
    if (!req.body.url) {
        return res.status(400).json({ error: "url is required" })
    }
    await URL.create(
        {
            shortId: shortID,
            redirectURL: req.body.url,
            viewhistory: []

        }
    )
    return res.json({ id: shortID })

}

const getAnalytics = async(req,res)=>{
    shortId = req.params.shortID
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks: result.viewhistory.length,
        analytics: result.viewhistory,
    });
}

module.exports = {
    genrateNewShortURL, getAnalytics
}