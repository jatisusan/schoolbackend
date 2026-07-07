// steps:
// 1. check if header includes authorization
// 2. check if authorization value has Bearer or not
// 3. authorization[1], i.e. token is not empty
// 4. verify token is valid or not using jwt: decoded data
// 5. check expiresIn date actually expired or not

import jwt from "jsonwebtoken";

export let authMiddleware = async (req, res, next) => {
  let authHeader = req.headers.authorization;

  // check if authorization header is present
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header is missing!",
    });
  }

  // check if authHeader starts with "Bearer"
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization header is not valid!",
    });
  }

  // check if token is empty
  let token = authHeader.split(" ")[1];
  if (token === "") {
    return res.status(401).json({
      success: false,
      message: "Token is not valid!",
    });
  }

  try {
    // verify the token
    let decodedDataFromToken = jwt.verify(token, process.env.JWT_SECRET);
    // let exp = decodedDataFromToken.exp

    // attach user data to req for further use
    req.payload = {
      id: decodedDataFromToken.id,
      email: decodedDataFromToken.email,
      role: decodedDataFromToken.role,
    };
    next();
  } catch (e) {
    console.log("error: ", e.name);
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: `Token expired at: ${e.expiredAt}`,
      });
    }
    res.status(401).json({
      success: false,
      message: "Token invalid!",
      stack: e,
    });
  }
};
