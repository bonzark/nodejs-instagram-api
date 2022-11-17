var express = require("express");
var router = express.Router();
const pool = require("../db");
const multer = require("multer");
const path = require("path");


// ==================== get all comments with post_id api ===================================================

router.get('/post/:post_id',async (req, res, next) => {
  try {
      const product = await pool.query(`select * from comments where post_id = '${req.params.post_id}' ORDER BY created_on DESC;`) ;
      res.status(200).json(product.rows);
  } catch (error) {
      res.status(200).json({
          massage : error.massage
      })    
  }
});


// ==================== get all comments with post_id api ===================================================

router.post('/',async (req, res, next) => {
    try {
        const comment = await pool.query(`insert into comments (user_id , post_id , content , created_on) values('${req.body.user_id}' , '${req.body.post_id}' , '${req.body.content}' , current_timestamp); update posts set comments = comments + 1 where post_id = ${req.body.post_id}`) ;
        res.status(200).json(comment);
    } catch (error) {
        res.status(200).json({
            massage : error.massage
        })    
    }
  });

module.exports = router;