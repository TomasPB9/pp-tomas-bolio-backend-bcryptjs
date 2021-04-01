const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt = require('bcryptjs');


const PeopleSchema=new Schema({
  name:String,
  email:String,
  phone:Number,
  password:{type:String, select:true},
  age:Number,
  gender:String,
  hobbie:String,
  date:{type:Date, default:Date.now()}
});

PeopleSchema.pre('save',function(next){
  let people=this
  if(!people.isModified('password')) return next()

  bcrypt.genSalt(10, (err,salt)=>{
    if(err) return next(err)

    bcrypt.hash(people.password,salt,null,(err,hash)=>{
      if(err) return next(err)

      people.password=hash
      next()
    })
  })
})

module.exports=mongoose.model('people',PeopleSchema);

