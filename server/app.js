import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
const app=express()
app.get('/',(req,res)=>{
    console.log('App is running on PORT 3000')
    res.send('Hello World!')
})
app.listen(process.env.PORT)
