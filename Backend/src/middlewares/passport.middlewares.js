import passport from "passport";
import googleStrategy from "../passport/googleStrategy.js";

passport.use(googleStrategy);

passport.serializeUser((userData, done) => {
  if (userData) {
    console.log("User data comes!");
    done(null, userData);
  } else {
    console.log("User data not comes!");
    done(new Error('No user found!'), null);
  }
});

passport.deserializeUser((user,done)=>{
    console.log("deserializeUser runs");
    done(null,user)
})

export default passport;