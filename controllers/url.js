const shortid = require("shortid");
const urlModel = require("../models/url");
const createUrl = async (req, res) => {
  const { name, redirectUrl } = req.body;
  if (!name || !redirectUrl) {
    res.status(400);
    throw new Error(" all fields are mandatory");
  }
  const shortUrl = shortid.generate();

  console.log(shortUrl);
  const newUrl = await urlModel.create({
    name,
    redirectUrl,
    shortUrl,
  });
  res
    .status(201)
    .json({ msg: `short url created successfully ${newUrl.name}` });
};
const redirectUrl = async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    if (!shortUrl) {
      res.status(404);
      throw new Error("short url not found");
    }
    const visitorData = {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    };
    const urlEntry = await urlModel.findOneAndUpdate(
      { shortUrl },
      { $push: { visiterHistory: visitorData } }
    );

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

module.exports = { createUrl, redirectUrl };
