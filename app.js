const express = require('express')
const app = express();
const userModel= require(("./models/user"));
const postModel= require(("./models/post"));
const cookieParser = require('cookie-parser')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const path = require('path')
const upload = require("./config/multer")
// const multer = require("multer")

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images/uploads')         // destination of file
//   },
//   filename: function (req, file, cb) {          // unique filename
//     crypto.randomBytes(12, function(err, bytes){
//         const fn = bytes.toString("hex") + path.extname(file.originalname) //it makes "random name"+"ext of file"
//         cb(null, fn)
//     })
//   }
// })
// const upload = multer({ storage: storage })

app.get('/', (req, res)=>{
    res.render("index")
})

app.get('/profile/upload', (req, res)=>{
    res.render("profileupload")
}) 

app.post('/upload', isLoggedIn, upload.single("image"), async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email})
    user.profilepic = req.file.filename;
    await user.save();
    res.redirect("/profile")
})  

// app.get('/test', (req, res)=>{
//     res.render("test")
// })

// app.post('/upload', upload.single("image"), (req, res)=>{
//     console.log(req.file)
// })

app.get('/login', (req, res)=>{
    res.render("login")
})

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("posts");

    if (!user) return res.status(404).send("User not found");

    res.render("profile", { user });
});

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");

    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }

    await post.save();
    res.redirect("/profile");
});

app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");

    res.render("edit", {post})
});

app.post('/update/:id', isLoggedIn, async (req, res) => {
      let post = await postModel.findOneAndUpdate({ _id: req.params.id }, {content: req.body.content}).populate("user");  

    res.redirect("/profile")
});

app.post('/post', isLoggedIn, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email})
    let {content} = req.body;

    //A new post document is created in the database using the postModel.
    //It stores:
    //user: the ID of the user who created the post.
    //content: the actual post content.
    let post = await postModel.create({
        user: user._id,
        content
    })

    //Adds the new post’s ID to the user’s posts array.
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
 });

app.post('/register', async (req, res)=>{
    let {email, password, username, name, age} = req.body;

    let user = await userModel.findOne({email})
    if(user) return res.status(500).send("user already registered");
    
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash
            });

            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
            res.cookie("token", token);
            res.send("registered")
        })
    })
})

app.post('/login', async (req, res)=>{
    let {email, password} = req.body;

    let user = await userModel.findOne({email})

    if(!user) return res.status(500).send("Something went wrong");

    bcrypt.compare(password, user.password, function(err, result){

        if(result){
            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
            res.cookie("token", token);
             res.status(200).redirect("/profile")
        }
        else res.redirect("/login")   
    })

});

app.get('/logout', (req, res) => {
    res.cookie("token", "")
    res.redirect("/login")
})

// a middleware which is used create protected routes

function isLoggedIn(req, res, next){
    if(req.cookies.token === "") res.redirect("/login")
    else{
        let data = jwt.verify(req.cookies.token, "shhhh")
        req.user= data;
        next();
    }
    
}
app.listen(3000);