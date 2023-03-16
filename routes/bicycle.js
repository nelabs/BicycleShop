const express = require('express');
const router = express.Router();


const { storeBicycle, fetchAllBicyclesAPI, fetchAllBicyclesWEB, fetchOneBicycleWEB, deleteBicycle, updateBicycle} = require('../controller/bicycle');
const { postComment } = require('../controller/comment');


router.post('/bicycle', storeBicycle);

router.post('/bicycle/:id', postComment);

router.get('/bicycles', fetchAllBicyclesAPI);

router.get('/', fetchAllBicyclesWEB);

router.get('/bicycle/:id', fetchOneBicycleWEB);


router.delete('/bicycle/:id', deleteBicycle);

router.patch('/bicycle/:id', updateBicycle);


module.exports = router;
