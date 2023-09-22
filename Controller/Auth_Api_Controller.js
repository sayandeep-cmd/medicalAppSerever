const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const UserModel=require('../Model/UserModel')

const passwordhash=(pass)=>{
    const password=bcrypt.hashSync(pass,(10))
    return password
}

const tokencreation=(id,name)=>{
    const token=jwt.sign({_id:id,name:name},process.env.JWT_SECRET,{expiresIn:"1hr"})
    return token
}

const UserCreate=async(req,res)=>{
    try{
        const setpassword=passwordhash(req.body.password)
        const user =await new UserModel({
            name: req.body.name,
            email : req.body.email,
            phone:req.body.phone,
            password:setpassword,
        })
       const usersave= await  user.save()
       const token=tokencreation(usersave._id)
            return res.status(200).json({success:true ,Message:"User registered..","token":token, data:usersave})
    }catch(error){
        console.log(error.message);
        return res.status(400).json({success:false,Message:"problem in creating User..." ,error:error.message})
    }
}

const user_login= async(req,res)=>{
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
           return res.status(400).send({status:false, message:"All input is required"});
        }
        // Validate if user exist in our database
        const users = await UserModel.findOne({ email });

        if (users&& (await bcrypt.compare(password, users.password))) {
            // Create token
            const tokendata = await tokencreation(users._id,users.name)
            // user
           return res.status(200).json({"message":"login successfully", "user": users, "token": tokendata});
        }
       return res.status(400).send({ status:false, message: "Invalid Credentials"});
    } catch (err) {
        console.log(err);
    }

}


module.exports={UserCreate,
    user_login}
