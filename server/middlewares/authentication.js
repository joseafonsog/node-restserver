const jwt = require('jsonwebtoken');

// Verify Token
let verifyToken = (req, res, next) => {
  let token = req.get('Authorization');

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Invalid token!"
        }
      });
    }

    req.user = decoded.user;
    next();
  });
};

// Verify AdminRole
let verifyAdmin_Role = (req, res, next) => {
  let user = req.user;
  
  if (user.role !== "ADMIN_ROLE") {
    return res.status(403).json({
      ok: false,
      err: {
        message: "Unauthorized!"
      }
    });
  }

  next();
};

module.exports = {
  verifyToken,
  verifyAdmin_Role
}