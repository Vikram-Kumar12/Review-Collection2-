import Role from "../models/role.models.js";
import User from "../models/user.models.js";

const loginWithGoogle = async (userData, cb) => {
  try {
    console.log("Started1!");

    const userDataConverted = JSON.parse(JSON.stringify(userData));
    console.log("userDataConverted :", userDataConverted);

    const data = userDataConverted._json;
    console.log("data :", data);

    const { name, email, picture } = data;
    console.log("name :", name);
    console.log("email :", email);
    console.log("profile :", picture);

    const provider = userDataConverted.provider;
    console.log("provider :", provider);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User exists!");
      cb(null, existingUser);
    } else {
      console.log("New user!");
      const roleData = await Role.find({ email });
      console.log("roleData :", roleData);
      const role = roleData.length > 0 ? roleData[0].role : "Public";
      console.log("roleData1 :", roleData.length > 0 && roleData[0].role);
      const newUser = await User.create({
        name: name,
        email: email,
        avatar: picture,
        role: role,
      });
      cb(null, newUser);
    }
  } catch (error) {
    console.error("Error in loginWithGoogle :", error);
    return cb(error);
  }
};
const googleCallback = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    console.log("user :", user);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    console.log("accessToken :", accessToken);
    console.log("refreshToken :", refreshToken);

    user.refreshToken = refreshToken;
    await user.save();

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    req.logout((err) => {
      if (err) {
        console.error("Error logging out the session:", err);
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
    console.error("Error in Google Callback:", error);
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
    console.error("Error in logout user:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const userProfile = async (req, res) => {
  const email = req.user.email;

  console.log("Body :", email);
  const user = await User.findOne({ email }).select("name email avatar role ");
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found!" });
  }
  console.log("user :", user);
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
    console.log("Decoded :", decoded);
  } catch (error) {
    return res.status(404).json({ error: "Invalid or expired refresh token!" });
  }

  const user = await User.findOne({ email: decoded.email });
  console.log("User :", user);
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
