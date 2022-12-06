import admin from "../login/admin.js";

function loginCheck(req, res, next) {
  if (admin) {
    next();
  } else {
    res.status(403).json({
      error: -1,
      description: `${req.path} not allowed`,
      method: req.method,
    });
  }
}

export default loginCheck;
