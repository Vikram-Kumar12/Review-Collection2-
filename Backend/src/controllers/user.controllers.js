import User from "../models/user.models.js";

const loginWithGoogle = async (userData, cb) => {
  try {
    console.log("Started!");

    const userDataConverted = JSON.parse(JSON.stringify(userData));
    console.log("userDataConverted :", userDataConverted);

    const data = userDataConverted._json;
    console.log("data :", data);

    const { name, email, profile } = data;
    console.log("name :", name);
    console.log("email :", email);
    console.log("profile :", profile);

    const provider = userDataConverted.provider;
    console.log("provider :", provider);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User exists!");
      cb(null, existingUser);
    } else {
      console.log("New user!");
      const newUser = await User.create({
        name: name,
        email: email,
        avatar: profile,
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

export {
  loginWithGoogle,
  googleCallback,
  googleLoginFailed,
  logoutUser,
  userProfile,
};
