import Role from "../models/role.models.js";
import User from "../models/user.models.js";

const loginWithGoogle = async (userData, cb) => {
  try {
    const userDataConverted = JSON.parse(JSON.stringify(userData));
    const data = userDataConverted._json;
    const { name, email, picture } = data;
    const provider = userDataConverted.provider;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      cb(null, existingUser);
    } else {
      const roleData = await Role.find({ email });
      const role = roleData.length > 0 ? roleData[0].role : "Public";
      const newUser = await User.create({
        name: name,
        email: email,
        avatar: picture,
        role: role,
      });
      cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

const googleCallback = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    req.logout((err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }
      res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options);

      res.redirect(process.env.FRONTEND_URL);
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const googleLoginFailed = async (req, res) => {
  res.status(400).json({ success: false, error: "User authentication failed" });
};

const logoutUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found!" });
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({ success: true, message: "Logout successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const userProfile = async (req, res) => {
  const email = req.user.email;
  const user = await User.findOne({ email }).select("name email avatar role ");
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found!" });
  }
  res.status(200).json({
    user: {
      name: user.name,
      email: user.email,
      image: user.avatar,
      role: user.role,
    },
  });
};

const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      error: "Token not found!",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return res.status(404).json({ error: "Invalid or expired refresh token!" });
  }

  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    return res.status(400).json({
      error: "User not found!",
    });
  }

  const newAccessToken = await user.generateAccessToken();
  if (!newAccessToken) {
    return res.status(500).json({ error: "Server error!" });
  }

  res.status(200).json({
    accessToken: newAccessToken,
    message: "New access token generated successfully!",
  });
};

const refreshUserAuth = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).select(
    "-refreshToken",
  );
  res.status(200).json({ user });
};

export {
  loginWithGoogle,
  googleCallback,
  googleLoginFailed,
  logoutUser,
  userProfile,
  refreshAccessToken,
  refreshUserAuth,
};
