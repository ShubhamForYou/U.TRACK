const shortid = require("shortid");
const urlModel = require("../models/url");
const userModel = require("../models/user");
// create url
const createUrl = async (req, res) => {
  const { name, redirectUrl } = req.body;
  if (!name || !redirectUrl) {
    res.status(400);
    throw new Error(" all fields are mandatory");
  }
  const shortUrlEntry = await urlModel.findOne({
    name,
    createdBy: req.user.id,
  });
  if (shortUrlEntry) {
    res.status(409);
    throw new Error("url name already used");
  }
  const shortId = shortid.generate();
  const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;
  console.log(shortId);

  const newUrl = await urlModel.create({
    name,
    redirectUrl,
    shortId,
    shortUrl,
    createdBy: req.user.id,
  });

  res
    .status(201)
    .json({ msg: `short url created successfully ${newUrl.name}`, newUrl });
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
