const shortid = require("shortid");
const urlModel = require("../models/url");
const createUrl = async (req, res) => {
  const { name, redirectUrl } = req.body;
  if (!name || !redirectUrl) {
    res.status(400);
    throw new Error(" all fields are mandatory");
  }
  const shortId = shortid.generate();
  const shortUrl = `http://localhost:${process.env.PORT}/api/utrack/${shortId}`;
  console.log(shortId);
  const newUrl = await urlModel.create({
    name,
    redirectUrl,
    shortId,
    shortUrl,
  });
  res
    .status(201)
    .json({ msg: `short url created successfully ${newUrl.name}` });
};
const redirectUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    if (!shortId) {
      res.status(404);
      throw new Error("short url not found");
    }
    const visitorData = {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    };
    const urlEntry = await urlModel.findOneAndUpdate(
      { shortId },
      { $push: { visitorHistory: visitorData } }
    );

    // any other way to push visiterHistory

    // const urlEntry = await urlModel.findOne({ shortUrl });
    // if (urlEntry) {
    //   const visitorData = {
    //     ip: req.ip,
    //     userAgent: req.headers["user-agent"],
    //   };
    //   urlEntry.visiterHistory.push(visitorData);
    //   await urlEntry.save();
    // } else {
    //   res.status(404);
    //   throw new Error("url not found ");
    // }

    res.redirect(urlEntry.redirectUrl);
  } catch (error) {
    res.status(500);
    throw new Error(`url rendering error ${error}`);
  }
};

const getVisiterCount = async (req, res) => {
  const urlRecord = await urlModel.find({});
  const visitorCount = {};
  urlRecord.forEach((entry) => {
    console.log(`${entry.name} visits: ${entry.visitorHistory.length}`);
    visitorCount[entry.name] = entry.visitorHistory.length;
  });
  res.status(200).json(visitorCount);
};
module.exports = { createUrl, redirectUrl, getVisiterCount };
