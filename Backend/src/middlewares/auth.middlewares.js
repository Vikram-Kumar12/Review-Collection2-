import jwt from 'jsonwebtoken'
import User from '../models/user.models.js';
export const isLoggedIn = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
    console.log("Inside middleware token :", token);

    const refreshToken = req.cookies?.refreshToken;
    console.log("Inside middleware refreshToken :", refreshToken);

    if(!token){
        return res.status(401).json({error:"Please login!"});
    }

    const decodedToken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      return res.status(401).json({error:"Please login!"});
    }

    if (user.refreshToken != refreshToken) {
      res.clearCookie("accessToken").clearCookie("refreshToken"); 
      return res.status(400).json({error:"Session expired Please Login again!"});
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({error:"Please login!"});
  }
};
