import express from 'express';


const router = express.Router();

router.get('/ping',(req,res)=>{
    res.status(StatusCodes.OK)
    res.send('ok');
});

export default router;