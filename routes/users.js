var express = require("express");
var router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
var path = require('path');
var jwt = require('jsonwebtoken');
const multer = require("multer");

// ==================== GET users listing ===================================================

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});


// ==================== GET user by id ===================================================

router.get("/id/:uid", async function (req, res, next) {
  try {
    const user = await pool.query(
      `select * from users where user_id='${req.params.uid}';`
    );
    if (user.rowCount !== 0) {
      res.status(200).json({
        user_id: user.rows[0].user_id,
        name: user.rows[0].name,
        username: user.rows[0].username,
        email: user.rows[0].email,
        created_on: user.rows[0].created_on,
        follower: user.rows[0].follower,
        following: user.rows[0].following,
        dp_path : user.rows[0].dp_path,
    });
    } else {
      res.status(200).json({
        message: "some thing wrong",
      });
    }
    
  } catch (error) {
    // error msg as responce
    res.status(401).json({
      message: "something went wrong",
      error: error,
    });
  }
});


// ==================== PUT update user by id ===================================================
const storage = multer.diskStorage({
  destination: "./upload/dp",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
});



router.post("/id/:uid", upload.single("dpImg"), async function (req, res, next) {
  try {
    const update = await pool.query(`UPDATE users SET dp_path = 'http://localhost:9000/dpStatic/${req.file.filename}', email= '${req.body.email}',name= '${req.body.name}',username= '${req.body.username}' WHERE user_id = ${req.params.uid};`)    
    // success msg as responce
  res.status(200).json({
    message: "success",
    dp_path : 'http://localhost:9000/dpStatic/${req.file.filename}'
  });
  } catch (error) {
    res.status(401).json({
      message: "something went wrong",
      error: error,
    });
  }

  
});






// ==================== POST user signup ===================================================
router.post("/signup", async function (req, res, next) {
  // try catch for user signup
  try {
    const existingUser = await pool.query(
      `select email from users where email='${req.body.email}';`
    );
    if (existingUser.rowCount === 0) {
      // encrypt password and store in db
      bcrypt.hash(req.body.password, 10, async function (err, hash) {
        if (!err && hash) {
          const user = await pool.query(
            `insert into users(name,username,password,email,created_on,last_login) values ('${req.body.name}','${req.body.username}','${hash}','${req.body.email}', current_timestamp, current_timestamp ) returning user_id, email, name, created_on,last_login,dp_path;`
          );
          req.session.user = {
            id: user.rows[0].user_id,
              name: user.rows[0].name,
              email: user.rows[0].email,
              created_on: user.rows[0].created_on,
              last_login: user.rows[0].last_login,
              dp_path : user.rows[0].dp_path
          };

          // success msg as responce
          res.status(200).json({
            message: "success",
            loggedIn: true,
            user: user.rows[0],
          });
        } else {
          res.status(401).json({
            loggedIn: false,
            message: "something went wrong",
            error: err,
          });
        }
      });
    } else {
      res.status(401).json({
        loggedIn: false,
        message: "email already exist",
      });
    }
  } catch (error) {
    console.log(error);

    // error msg as responce
    res.status(401).json({
      loggedIn: false,
      message: "something went wrong",
      error: error,
    });
  }
});




// ==================== POST user login ===================================================
router
  .route("/login")
  .get(async (req, res) => {
    if (req.session.user && req.session.user.email) {
      console.log("logged In");
      res.json({ loggedIn: true, user: req.session.user });
    } else {
      console.log("NOT LOGGED IN");
      res.json({ loggedIn: false });
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await pool.query(
        `select * from users where username='${req.body.username}';`
      );

      if (user.rowCount > 0) {
        //check password
        bcrypt.compare(
          req.body.password,
          user.rows[0].password,
          function (err, result) {
            if (!err && result) {
              req.session.user = {
                id: user.rows[0].user_id,
                  name: user.rows[0].name,
                  email: user.rows[0].email,
                  created_on: user.rows[0].created_on,
                  last_login: user.rows[0].last_login,
                  dp_path : user.rows[0].dp_path
              };

              // success msg as responce if password match
              res.status(200).json({
                loggedIn: true,
                message: "success",
                user: {
                  user_id: user.rows[0].user_id,
                  name: user.rows[0].name,
                  email: user.rows[0].email,
                  created_on: user.rows[0].created_on,
                  last_login: user.rows[0].last_login,
                  dp_path : user.rows[0].dp_path
                },
              });
            } else {
              // invalid msg as responce if password match
              res.status(200).json({
                message: "invalid email or password",
              });
            }
          }
        );
      } else {
        res.status(401).json({
          loggedIn: false,
          message: "wrong username or password",
        });
      }
    } catch (error) {
      // error msg as responce
      res.status(401).json({
        message: "something went wrong",
        error: error,
      });
    }
  });



  
// ==================== POST user logout ===================================================
router.post("/logout", async function (req, res, next) {
  try {
    res.clearCookie("name");
    // success msg as responce if password match
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    // error msg as responce
    res.status(401).json({
      message: "something went wrong",
      error: error,
    });
  }
});


// ==================== Put user Follow ===================================================
router.put("/follow", async function (req, res, next) {
  try {
    const follow = await pool.query(
      `update users set follower = array_append(follower, ${req.body.uid}) where user_id = ${req.body.target_uid};
      update users set following = array_append(following, ${req.body.target_uid}) where user_id = ${req.body.uid};`
    );
    res.status(200).json({
      message: "success"
    });
  } catch (error) {
    // error msg as responce
    res.status(401).json({
      message: "something went wrong",
      error: error,
    });
  }
});

// ==================== Put user unFollow ===================================================
router.put("/unfollow", async function (req, res, next) {
  try {
    const follow = await pool.query(
      `update users set follower = array_remove(follower, ${req.body.uid}) where user_id = ${req.body.target_uid};
      update users set following = array_remove(following, ${req.body.target_uid}) where user_id = ${req.body.uid};`
    );
    res.status(200).json({
      message: "success"
    });
  } catch (error) {
    // error msg as responce
    res.status(401).json({
      message: "something went wrong",
      error: error,
    });
  }
});

// ==================== post user check Follow ===================================================
router.post("/follow", async function (req, res, next) {
  try {
    const follow = await pool.query(
      `select * from users where '${req.body.uid}'=ANY(follower) and  user_id = ${req.body.target_uid};`
    );
    if (follow.rowCount !== 0) {
      res.status(200).json({
        message: true
      });
    } else {
      res.status(200).json({
        message: false
      });
    }
  } catch (error) {
    // error msg as responce
    res.status(401).json({
      message: "something went wrong",
      error: error,
    });
  }
});


// ==================== get user search ===================================================
router.get("/search/:q", async function (req, res, next) {
  // try {
    const follow = await pool.query(
      `SELECT user_id, username, dp_path FROM users WHERE username LIKE '${req.params.q}%' OR name LIKE '${req.params.q}%';`
    );
      res.status(200).json({
        data : follow.rows
      });
  // } catch (error) {
  //   // error msg as responce
  //   res.status(401).json({
  //     message: "something went wrong",
  //     error: error,
  //   });
  // }
});

module.exports = router;
