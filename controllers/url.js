const shortid = require("shortid");
const urlModel = require("../models/url");

// create url
const createUrl = async (req, res) => {
  const { name, redirectUrl } = req.body;
  if (!name || !redirectUrl) {
    return res.render("userDashBoard", { msg: "all fields are mandatory" });
  }
  const shortUrlEntry = await urlModel.findOne({
    name,
    createdBy: req.user.id,
  });
  if (shortUrlEntry) {
    return res.render("userDashBoard", { msg: "url name already used" });
  }
  const shortId = shortid.generate();
  const shortUrl = `${req.protocol}://${req.get("host")}/r/${shortId}`;

  const newUrl = await urlModel.create({
    name,
    redirectUrl,
    shortId,
    shortUrl,
    createdBy: req.user.id,
  });
  const urlEntries = await urlModel.find({ createdBy: user.id });
  return res.render("userDashBoard", {
    msg: `short url created successfully ${newUrl.name} and ShortURL: ${newUrl.shortUrl}`,
    userAllUrl: urlEntries,
    userName: req.user.name,
  });
};

const getVisiterCount = async (req, res) => {
  const urlRecord = await urlModel.find({ createdBy: req.user.id });
  console.log(urlRecord);
  const visitorCount = {};
  urlRecord.forEach((entry) => {
    console.log(`${entry.name} visits: ${entry.visitorHistory.length}`);
    visitorCount[entry.name] = entry.visitorHistory.length;
  });
  res.status(200).json(visitorCount);
};
module.exports = { createUrl, getVisiterCount };
