const BannerModel=require('../Model/Homemodel/Banner')
const PersonalCareModel=require('../Model/Homemodel/Service')
const PatientCareModel=require('../Model/Homemodel/Patient_care')


const NewBanner=(req,res)=>{
    new BannerModel({
        Banner_image:req.file.path,
        Title:req.body.Title,
        Short_description:req.body.shortdescription
    }).save().then(result=>{
        console.log("banner added")
    }).catch(err=>{
        console.error('Error in adding banner', err)
    })
}

const GetBannerAPI=async(req,res)=>{
    try{
        await BannerModel.aggregate([{$match:{"Active":true}}]).then(data=>{
            return res.status(200).json({success:true,data:data,message:'Active banner fetched'})
        })
    }catch{
        return  res.status(400).json({success:false,message:"cannot fetch"})
    }
}

const NewPersonalCare=(req,res)=>{
    new PersonalCareModel({
        image1:req.file.path,
        image2:req.file.path,
        image3:req.file.path,
        title:req.body.title,
        small_description:req.body.small_description
    }).save().then(result=>{
        console.log("Personal Care added")
    }).catch(err=>{
        console.error('Error in adding Personal Care', err)
    })
}

const GetPersonalCareAPI=async(req,res)=>{
    try{
        await PersonalCareModel.find().then(data=>{
            return res.status(200).json({success:true,data:data,message:'Personal Care fetched'})
        })
    }catch{
        return  res.status(400).json({success:false,message:"cannot fetch"})
    }
}

const PatientCareSection=(req,res)=>{
    new PatientCareModel({
        image:req.file.path,
        Title:req.body.Title,
        Short_Description:req.body.Short_Description
    }).save().then(result=>{
        console.log("Patient Care added")
    }).catch(err=>{
        console.error('Error in adding Patient Care', err)
    })
}

const GetPatientCaresectionAPI=async(req,res)=>{
    try{
        await PatientCareModel.find().then(data=>{
            return res.status(200).json({success:true,data:data,message:'Patient Care fetched'})
        })
    }catch{
        return  res.status(400).json({success:false,message:"cannot fetch"})
    }
}


module.exports={
    NewBanner,
    GetBannerAPI,
    NewPersonalCare,
    GetPersonalCareAPI,
    PatientCareSection,
    GetPatientCaresectionAPI
}