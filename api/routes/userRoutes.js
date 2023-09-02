const { register, login,setAvatar, getallUsers } = require('../controllers/userController');

const router = require('express').Router();

router.post('/register',register);
router.post('/login',login);
router.post('/setAvatar/:id',setAvatar);
router.get('/allUsers/:id',getallUsers)

module.exports = router