const router = require('express').Router();
const apiRoutes = require('./api');
const test = require('../controllers/testController')
const { User } = require('../models')

const getData = (model) => {
    console.log(model);
    // return model.find()
}

router.use('/api', apiRoutes);

router.get('/test', (req, res, getData) => {
    console.log("User");
    getData(User)
})
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
