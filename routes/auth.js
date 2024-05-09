const express= require('express');
//controller
const { createOrUpdateUser,currentUser } = require('../controllers/auth');
//middleware
const {authCheck,adminCheck} = require('../middlewares/auth')

const router= express.Router();

router.post('/create-or-update-user', authCheck , createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
