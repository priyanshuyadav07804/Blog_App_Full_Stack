const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.patch("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);

      if (user) {
        if (req.files === undefined && req.body.username === '' && req.body.email === '' && req.body.password === '' ) {
          res.status(500).json("no new data being sent")
          
        } else if (req.files === undefined && ( req.body.username !== '' || req.body.email !== '' || req.body.password !== '')) {
          // Only username, email, or password are being updated
          const {username,email,password} = req.body

          if (username !== user.username) {
            // Update username in related posts
            await Post.updateMany({ username: user.username }, { username: username });
          }
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              username : username ? username : user.username,
              email : email ? email : user.email,
              password : password ? await bcrypt.hash(req.body.password, 10) : user.password,
            },
            { new: true }
          );
          return res.status(200).json(updatedUser);

        } else if(req.files.image && req.body.username === '' && req.body.email === '' && req.body.password === '') {
          //only file being updated
          const file = req.files.image;
          const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "images",
            resource_type: "auto",
            public_id: `${Date.now()}`,
          });

          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: { profilePic: result.secure_url },
            },
            { new: true }
          );
          return res.status(200).json(updatedUser);
          
        }else{
          // Both image and other fields are being updated
          const file = req.files.image;
          const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "images",
            resource_type: "auto",
            public_id: `${Date.now()}`,
          });
          const {username,email,password} = req.body
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
              {
                username : username ? username : user.username,
                email : email ? email : user.email,
                password : password ? await bcrypt.hash(req.body.password, 10) : user.password,
                profilePic: result.secure_url,
              },
          
            { new: true }
          );
          return res.status(200).json(updatedUser);
        }
      } else {
        return res.status(404).json("User not found");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(401).json("You can update only your account!");
  }
});


//DELETE
router.delete("/:id", async (req, res) => {

    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
