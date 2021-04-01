const express=require('express');
const router=express.Router();

const People=require('../models/people');

router.get('/add',  (req, res) => {
  res.render('addUser');
});

 router.get('/deleteUser', async (req, res) => {
   const people = await People.find();
   res.render('deleteUser', {
     people
   });
 });

router.get('/deleteUser/:id', async (req, res) => {
  const { id } = req.params;
  await People.remove({ _id: id });
  res.redirect('/');
});

router.get('/consultUser', async (req, res) => {
  const people = await People.find();
  res.render('consultUser', {
    people
  });
});


router.get('/', async (req,res)=>{
  const people=await People.find();
  res.render('index',{
    people
  });
});

router.post('/add', async(req,res)=>{
  const people=new People(req.body);
  await people.save();
  res.render('newUser');
});

router.get('/delete/:id', async (req,res)=>{
  const{id}=req.params;
  await People.remove({_id:id});
  res.redirect('/');
});


module.exports=router;