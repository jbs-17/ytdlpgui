import express from 'express';

const demo = express.Router();
demo.get('/', (r, e)=>{
  try{
    res.end('demo')
  }catch(error){
    next(error);
  }
})



export {demo};