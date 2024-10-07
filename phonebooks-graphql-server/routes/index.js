var express = require('express');
var router = express.Router();
const User = require('../models/Users')
const path = require('path')
const fs = require('fs')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/:id/avatar', async (req, res, next) => {
  let avatar;
  let uploadPath

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  avatar = req.files.avatar
  let fileName = Date.now() + "-" + avatar.name
  uploadPath = path.join(__dirname, '..', 'public', 'images', fileName)

  const userPrev = await User.findById(req.params.id)
  const oldAvatar = userPrev.avatar

  if (oldAvatar) {
    const filePath = path.resolve(__dirname, '../public/images/', oldAvatar);
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        console.log(err)
      })
    }
  }

  avatar.mv(uploadPath, async (err) => {
    if (err)
      return res.status(500).send(err);

    userPrev.avatar = fileName;
    await userPrev.save();

    res.status(201).json(userPrev);
  })

})


module.exports = router;
