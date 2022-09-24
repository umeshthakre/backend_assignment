require("dotenv").config();
const express = require("express");
const { PORT } = process.env;
const { MONGODB_URL, SECRET_KEY } = process.env;
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");
const isAuthorised = require("./auth");
const mongodb = require("mongodb");
//users middleware to parse json
app.use(express.json());

//connect to db
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  return res.send("<h1>hiii</h1>");
});

app.post("/api/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!(email && password && firstname && lastname)) {
      return res.status(400).send({ mesg: "All fields are required" });
    }
    const existingUser = await User.find({ email });

    if (Object.keys(existingUser).length !== 0) {
      console.log(existingUser);
      return res.status(401).send({ mesg: "user already exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
    });

    //token creation
    const token = jwt.sign({ user_id: user._id, email }, SECRET_KEY, {
      expiresIn: "2h",
    });
    user.token = token;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/authenticate", async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(401).send({ mesg: "all fields are required" });
  }
  User.find({ email })
    .then((user) => {
      if (!user) {
        return res.send({ mesg: "user not found" });
      } else {
        user = user[0];
        bcrypt
          .compare(password, user.password)
          .then((val) => {
            if (val) {
              const token = jwt.sign({ user_id: user._id, email }, SECRET_KEY, {
                expiresIn: "2h",
              });
              return res.send({ token: token });
            } else {
              return res.send({ mesg: "password do not match" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => console.log(err));
});

app.post("/api/follow/:id", isAuthorised, (req, res) => {
  const id = req.params.id;

  if (!mongodb.ObjectId.isValid(id)) {
    return res.send({ mesg: "object id not valid" });
  }

  User.findOne({ id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ mesg: "user not found" });
      }

      if (user.followers.includes(id)) {
        return res.send({ meg: "you already follow this person" });
      }
      user.numberOfFollowers++;
      user.followers.push(id);
      User.findOneAndUpdate(
        { id },
        {
          $set: {
            numberOfFollowers: user.numberOfFollowers,
            followers: user.followers,
          },
        },
        { new: true },
        (doc) => {
          return res.send({ mesg: "follower added succesfully" });
        }
      );
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/api/unfollow/:id", isAuthorised, (req, res) => {
  const id = req.params.id;
  User.findOne({ id }).then((user) => {
    if (!user) {
      return res.send({ msg: "user not found in db" });
    }

    if (!user.followers.includes(id)) {
      return res.send({ msg: "you do not follow this person" });
    }

    user.numberOfFollowers--;
    user.followers = user.followers.filter((item) => item.toString() !== id);
    console.log(user);

    User.findOneAndUpdate(
      { id },
      {
        $set: {
          numberOfFollowers: user.numberOfFollowers,
          followers: user.followers,
        },
      },
      { new: true },
      (doc) => {
        return res.send({ mesg: "follower removed " });
      }
    );
  });
});

app.get("/api/user/:id", isAuthorised, (req, res) => {
  const id = req.params.id;
  User.findOne({ id }).then((user) => {
    if (!user) {
      return res.send({ mesg: "user not found" });
    }
    return res.send({
      username: "" + user.firstname + " " + user.lastname,
      numberOfFollowers: user.numberOfFollowers,
      numberofFollowings: user.numberOfFollowing,
    });
  });
});

app.listen(PORT, (req, res) => {
  console.log("server is running on " + PORT);
});
