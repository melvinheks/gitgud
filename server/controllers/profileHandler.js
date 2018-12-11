const userProfile = require('../database/models/userProfile');

const createUserProfile = (req, res) => {
  let userProfInst = new userProfile({
    summary: req.body.summary,
    userId: req.user._id,
    img: req.body.img
  });
  userProfInst.save(function (err, profile) {
    if(err) {
      console.log(err);
      res.status(500).json({error:"Unable to create user profile"});
    }
    else{
      res.status(200).json({msg:"Profile created"});
    }
  });
};

const updateProfile = (req, res) => {
  userProfile.updateOne({userId:req.user._id}, {summary: req.body.summary, img: req.body.img}, function(err, profile){
    if(err){
      res.status(500).json({error:"Unable to update Profile"});
    }
    else{
      res.status(200).json({msg:"Profile updated"});
    }
  });
};

const retrieveProfile = (req, res) => { 
  const queryField = {userId:req.body.userId};
  if (req.isAuthenticated() && !req.body.userId) {
    queryField.userId = req.user._id;
  }
  userProfile.findOne(queryField, function(err, profileData){
    if(err || !profileData){
      return res.status(404).json({error:"Unable to find Profile"});
    }
    if (profileData) {
      // check if documents are private before sending
      return res.status(200).json({profile:profileData});
    }
  });
};

const deleteProfile = (req, res) => {
  userProfile.deleteOne({userId:req.user._id}, function(err){
    if(err){
      res.status(500).json({error:"Unable to delete profile"});
    }
    else{
      res.status(200).json({msg:"Profile deleted"});
    }
  });
};

module.exports = {createUserProfile, updateProfile, retrieveProfile, deleteProfile};