const jwt = require("jsonwebtoken");

module.exports = async ({ req }) => {
  try {
    // get the user token from the headers
    const headerToken = req.headers.authorization || "";
    let token = null;

    if (headerToken) {
      token = headerToken.split(" ")[1];
    }

    var user = "";
    if (token) {
      user = await jwt.verify(token, process.env.SECRET_KEY);
    }
    return { user };
  } catch (err) {
    console.log(`Please login or contact system administrator: ${err}`);
    throw new Error(`Please login or contact system administrator: ${err}`);
  }
};

//===========================================================================================================
/*
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  //{ userId: user._id, email: user.email, role: user.role},
  //const userId = authHeader.split(" ")[0]; // userId: user._id
  const token = authHeader.split(" ")[1]; // email: user.email ' ' we get two values separeted with ' 'space eg senzo token
  //const role = authHeader.split(" ")[2]; // role: user.role

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "mysecretkey");
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId; //used on hard coded user
  //req.role = decodedToken.role;
  next();
};

*/
