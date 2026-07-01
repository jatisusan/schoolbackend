// steps:
// 1. check if header includes authorization
// 2. check if authorization value has Bearer or not
// 3. authorization[1], i.e. token is not empty
// 4. verify token is valid or not using jwt: decoded data
// 5. check expiresIn date actually expired or not