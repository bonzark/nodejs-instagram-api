var express = require("express");
var router = express.Router();
const pool = require("../db");
const multer = require("multer");
const path = require("path");


// ==================== get all post api ===================================================

router.get('/all',async (req, res, next) => {
  try {
      const product = await pool.query(`select * from posts ORDER BY created_on DESC;`) ;
      res.status(200).json(product.rows);
  } catch (error) {
      res.status(200).json({
          massage : error.massage
      })    
  }
});




// ==================== get post based on following api ===================================================

router.get('/:uid',async (req, res, next) => {
  try {
      const current_user = req.params.uid;
      const product = await pool.query(`SELECT * FROM posts where (user_id IN (select unnest(following) from users where user_id = ${current_user})) or user_id = ${current_user};`) ;
      res.status(200).json(product.rows);
  } catch (error) {
      res.status(200).json({
          massage : error.massage
      })    
  }
});


// ==================== get user post api ===================================================


router.get('/profile/:user_id',async (req, res, next) => {
  try {
      const product = await pool.query(`select * from posts where user_id = '${req.params.user_id}' ORDER BY created_on DESC;`) ;
      res.status(200).json(product.rows);
  } catch (error) {
      res.status(200).json({
          massage : error.massage
      })    
  }
});



// ==================== likes api ===================================================
router.get('/likes/:post_id',async (req, res, next) => {
  try {
    const likes = await pool.query(`select * from likes where post_id = '${req.params.post_id}';`) ;
      res.status(200).json({
        result : likes.rowCount
      });
} catch (error) {
    res.status(200).json({
        massage : error.massage
    })    
}
});

router.delete('/likes/:post_id/:user_id',async (req, res, next) => {
  try {
    const likes = await pool.query(`delete from likes where post_id = '${req.params.post_id}' and user_id = '${req.params.user_id}';`) ;
      res.status(200).json({
        result : likes.rowCount
      });
} catch (error) {
    res.status(200).json({
        massage : error.massage
    })    
}
});

router.post('/likes/:post_id/:user_id',async (req, res, next) => {
  try {
    const likes = await pool.query(`insert into likes(post_id , user_id) values ('${req.params.post_id}' , '${req.params.user_id}');`) ;
      res.status(200).json({
        result : likes.rowCount
      });
} catch (error) {
    res.status(200).json({
        massage : error.massage
    })    
}
});


router.get('/likes/:post_id/:user_id',async (req, res, next) => {
  try {
    const likes = await pool.query(`select * from likes where post_id = '${req.params.post_id}' and user_id = '${req.params.user_id}';`) ;
    if (likes.rowCount == 0) {
      res.status(200).json({
        result : "false"
      });
    } else {
      res.status(200).json({
        result : "true"
      });
    }
} catch (error) {
    res.status(200).json({
        massage : error.massage
    })    
}
});



// ==================== upload post api ===================================================

const storage = multer.diskStorage({
  destination: "./upload/images/post",
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

router.post("/upload", upload.single("postImg"), async (req, res) => {

    const posts = await pool.query(`insert into posts(user_id,img_path,caption,created_on) values ('${req.body.user_id}','http://localhost:9000/postStatic/${req.file.filename}','${req.body.caption}',current_timestamp );`)


  res.json({
    message : "ok",
    caption : `${req.body.caption}`,
    user_id : `${req.body.user_id}`,
    post_url : `http://localhost:9000/postStatic/${req.file.filename}`
  })
});

module.exports = router;