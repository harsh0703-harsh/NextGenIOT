const router = require("express").Router();
const User = require("../Schema/Users")
const Post = require("../Schema/Post")
const bcrypt = require("bcryptjs");
const { route } = require("../app");
const NewComment = require("../Schema/Comments")

//REGISTER Route
router.post("/register", async (req, res) => {

  try {
    const { name, username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ name, username, email, password: hashedPass });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/CreateBlog", async (req, res) => {

  /// Note : The authentication functionality can be added with Cookies and JWT Authentication and that we have  to store token on Frontend part.
  // So in this task , it was not ask , So there is no authentication part available. If you want that so please mail me , i will make a ui and implement it.


  try {
    console.log(req.body)
    const { title, desc, username, post, categories } = req.body;
    const user = await User.findOne({ username: req.body.username })
    const newpost = new Post({ title, desc, username, post, categories });
    const p = await newpost.save();
    res.status(200).json(p);
  } catch (err) {
    res.status(500).json(err);
  }
})
// Comment Routes // Here id will be post id fetch by url directly
router.put("/:id", (req, res) => {
  if (req.body.userID == req.params.id) {
    const comment = req.body.comment;
    const id = req.body.userID;
    const author = req.body.author;
    const comm = new NewComment({ author, comment });
    comm.save((err, result) => {
      if (err) {
        console.log(err)
      } else {
        Post.findById(req.params.id, (err, post) => {
          if (err) {
            console.log(err);
          } else {
            post.comments.push(result)
            res.json({Alert:"Comments Added Sucessfully"})
          }
        })
      }
    });
  }else {
    res.status(401).json({ Alert: "Post Not Found" })
  }



})



//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (validated) {
      res.status(200).json({ Alert: "Founded!" })
    } else {
      res.status(200).json({ Alert: "Not Founded!" })
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;