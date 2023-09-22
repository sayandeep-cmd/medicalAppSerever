const UserSchema=require('../Model/UserModel')
const DepartmentModel=require('../Model/Department')
const DoctorModel=require('../Model/Doctor')
const postmodel=require('../Model/Post/PostModel')
const BannerModel=require('../Model/Homemodel/Banner')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


exports.dashboard=(req,res)=>{
    res.render('dashboard',{data1:req.admin})
}
exports.Department=(req,res)=>{
    DepartmentModel.find().then(data=>{
        // console.log(data);
        res.render('Department',{data1:req.admin, data:data})
    }).catch(err=>{
        console.log(err);
    })
    
}
exports.blog=(req,res)=>{
    postmodel.aggregate([{$sort:{createdAt:-1}}]).then(data=>{
        res.render('blog',{data1:req.admin, blogs:data})
    })
    
}
exports.banner=(req,res)=>{
    BannerModel.find().then(data=>{
        res.render('Banner',{data1:req.admin, banner:data})
    })
}
exports.signIn=(req,res)=>{
    res.render('signin')
}
exports.createbanner=(req,res)=>{
    const image=req.file;
    new BannerModel({
        Title:req.body.title,
        Banner_image:image.path,
        Short_description:req.body.sdescription
    }).save().then(data=>{
        console.log('banner created');
        res.redirect('/banner')
    }).catch(err=>{
        console.log(err);
    })
}
exports.activatebanner=(req,res)=>{
        let id = req.params.id;
        BannerModel.findByIdAndUpdate(id,{Active:true}).then(data=>{
            console.log('banner activated');
            res.redirect('/banner')
        }).catch(err=>{
            console.log(err);
        })
}
exports.deletebanner=(req,res)=>{
    BannerModel.deleteOne({_id:req.params.id}).then(da=>{
        console.log(da+"deleted");
        res.redirect('/banner')
    }).catch(err=>{
        console.log(err);
    })
}
exports.createdepartment=(req,res)=>{
    const image=req.file;
    new DepartmentModel({
        Department_Name:req.body.Dname,
        small_image:image.path,
        big_image:req.file.path,
        big_description:req.body.Bdescription,
        services:req.body.services,
        Department_no:req.body.Dno,
    }).save().then(resu=>{
        console.log("Department added")
        res.redirect('/Department')
    }).catch(err=>{
        console.log(err)
    })
}

exports.deletedepartment=(req,res)=>{
    DepartmentModel.deleteOne({_id:req.params.id}).then(da=>{
        console.log(da+"deleted");
        res.redirect('/Department')
    }).catch(err=>{
        console.log(err);
    })
}
exports.doctors=(req,res)=>{
    DepartmentModel.find().then(result1=>{
        DoctorModel.find().populate([{path:'Department'}]).then(result2=>{
            res.render('Doctors',{data1:req.admin,Department:result1,Doctors:result2})
        })
    })
}
exports.createdoctor=(req,res)=>{
    const image=req.file
    new DoctorModel({
        Department:req.body.Department,
        Doctor_Name:req.body.Doctor_name,
        About_myself:req.body.about,
        Image:image.path
    }).save().then(result=>{
        console.log('New Doctor Created');
        res.redirect('/doctors')
    }).catch(err=>{
        console.log('this is the error',err);
    })
}
exports.deletedoctor=(req,res)=>{
    DoctorModel.deleteOne({_id:req.params.id}).then(da=>{
        console.log(da+"deleted");
        res.redirect('/Doctors')
    }).catch(err=>{
        console.log(err);
    })
}

exports.createpost=(req,res)=>{
   const image=req.file
    new postmodel({
        title : req.body.title ,
        subTitle:req.body.subTitle,
        postText:req.body.postText,
        image:image.path
    }).save().then(data=>{
        console.log('post created successfully');
        res.redirect('/blog')
    }).catch(err=>{
        console.log(err);
    })
}

exports.loginadmin=async(req,res)=>{
    
    UserSchema.findOne({email:req.body.email})
    .then(data=>{
        
            if(data){
                
                if(data.role=="admin"){
                    const pwd=data.password
                    // if(bcrypt.compareSync(req.body.password,pwd)){
                        const admintoken=jwt.sign({
                            id:data._id,
                            name:data.name,
                        },process.env.JWT_SECRET,{expiresIn:'1hr'})
                        res.cookie('AdminToken',admintoken)
                        res.redirect('/dashboard')
                    // }
                    // else{
                       

                    //     console.log("Password Not Match.....");
                    // }
                }else{
                    

                    console.log("Admin False...");
                }
            } else{
                console.log(`not admin`);
            }
    }).catch(err=>{
        console.log(err);
    })
   
}



exports.adminauth=(req,res,next)=>{
if(req.admin){
    // console.log(req.admin);
    next();
}else{
    console.log('Err while Admin Auth');
    res.redirect('/')
}
}

exports.logout=(req,res)=>{
    res.clearCookie('AdminToken')
    res.redirect('/')
}