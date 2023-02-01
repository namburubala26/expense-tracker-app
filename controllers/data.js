const expenseApp = require('../models/data')

exports.postData = async (req,res)=>{
    try{
        const {expenseamount,description,category} = req.body
        await expenseApp.create({expenseamount,description,category})
        res.status(201).json({success:true,message:'successful'})
    }
    catch(err){
        res.status(500).json({success:false,message:`failed here--> ${err}`})
    }
}