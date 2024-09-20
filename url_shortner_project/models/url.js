const mongoose = require("mongoose")

const UrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true
    },
    redirectURL: {
      type: String,
      required: true
    },
    viewhistory: [{ timstamp: { type: Number } }]
  }, {
  timestamps: true
}
)


const urlmodel = mongoose.model("url", UrlSchema)

module.exports = urlmodel