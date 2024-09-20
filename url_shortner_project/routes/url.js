const express = require("express")
const router = express.Router()
const { genrateNewShortURL, getAnalytics } = require("../controllers/url")

router.post("/", genrateNewShortURL)

router.get("/analytics/:shortID", getAnalytics)

module.exports = router;