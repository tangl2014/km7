import express from 'express'
import navRouter from './nav'
import userRouter from './user'
import catetoryRouter from './category'
import tagRouter from './tag'
import aritcleRouter from './article'

import Permission from '../controllers/permission'
const router = express.Router()


router.use('*', (req,res,next)=>{
    let start = new Date();
    logger.log(`--> api request: ${req.originalUrl}`)
    let calResponseTime = function () {
        let end = new Date(); 
        logger.log(`<-- api response: ${req.originalUrl}, ${end-start}`)
    }
    next()  
    res.once('close', calResponseTime);
})
router.use('/user', userRouter)
router.use('/nav', navRouter)
router.use('/article', aritcleRouter)

//article manage at background
router.use(Permission.needLogin)
router.use('/category', catetoryRouter)
router.use('/tag', tagRouter)


export default router