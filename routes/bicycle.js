const express = require('express');
const router = express.Router();


const { storeBicycle, fetchAllBicyclesAPI, fetchAllBicyclesWEB, fetchOneBicycleWEB, deleteBicycle, updateBicycle} = require('../controller/bicycle');

router.post('/bicycle', storeBicycle);

router.get('/bicycles', fetchAllBicyclesAPI);

router.get('/', fetchAllBicyclesWEB);

router.get('/bicycle/:id', fetchOneBicycleWEB);


router.delete('/bicycle/:id', deleteBicycle);

router.patch('/bicycle/:id', updateBicycle);


module.exports = router;
