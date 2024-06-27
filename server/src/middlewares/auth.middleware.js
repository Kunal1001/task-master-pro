import passport from "passport";
import { Strategy } from "passport-local";
import sql from "../db/db.js";


passport.use("local", new Strategy(async (username, password, cb) => {
  try {
    const result = await sql`SELECT * FROM users WHERE email = ${username}`;
    console.log(result);
    if (result.length > 0) {
      const user = result[0];
      console.log(user.password); 
      if (user.password === password) {
        return cb(null, user); 
      } else {
        return cb(null, false);
      }
    } else {
      return cb(null, false); 
    }
  } catch (err) {
    return cb(err); 
  }
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

function isAuthentic(req, res, next) {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); 
    }
    if (!user) {
      return res.json({
        status:401,
        message:"unauthorized"
    })
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log(user);
      return next();
    });
  })(req, res, next);
}

export { isAuthentic, passport };