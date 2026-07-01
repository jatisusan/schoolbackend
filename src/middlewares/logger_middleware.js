export let loggerMiddleware = (req, res, next) => {
  let timeStamp = new Date().toISOString();
  let url = req.url;
  let method = req.method;
  console.log(`Timestamp: ${timeStamp} \t Url: ${url} \t Method: ${method}`);

  next();
};
