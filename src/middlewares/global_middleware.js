// x-api-key = "SecA-NodeJS-api-key"

// creating middleware to check x-api-key in header

export let checkApiKeyMiddleware = (req, res, next) => {
  let xApiKey = req.headers["x-api-key"];
  if (!xApiKey) {
    return res.status(400).json({
      message: "x api key header required!",
    });
  }

  if (xApiKey !== "SecA-NodeJS-api-key") {
    return res.status(400).json({
      message: "Invalid x api key",
    });
  }

  next();
};

// attaching request timestamp to request for every route from middleware
export let attachRequestTimestamp = (req, res, next) => {
  req.requestTimestamp = new Date().toISOString();
  next();
};
