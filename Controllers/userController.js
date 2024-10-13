const UserModelDTO = require('../Models/userModelDTO');
const userService = require('../Services/userServices');

const registerUser = async(req,res)=>{
    const userData = req.body;
    const userDTO = new UserModelDTO(userData);
    try{
        const newUser =await userService.registerUser(userDTO);
        if(newUser){
            res.status(201).send({message: 'User created successfully'});
        }
    }catch(err){
        res.status(400).send({message: err.message});
    }
}

const loginUser = async(req,res)=>{
    const userData = req.body;
    const userDTO = new UserModelDTO(userData);
    try{
        const token = await userService.loginUser(userDTO);
        if(token){
            const bearerToken = 'Bearer ' + token;
            console.log(bearerToken);
            res.header('Authorization', bearerToken);
            res.status(200).send({message: 'User logged in successfully'});
        }
    }catch(err){
            res.status(400).send({message: err.message});
        }
};

const userPreferences = async(req,res)=>{
    const userData = req.body;
    try{
        const userPreferences = await userService.userPreferences(userData);
        res.send({userPreferences});
    }catch(err){
        res.status(400).send({message: err.message});
    }
};

const updateUserPreferences = async(req,res)=>{
    const userData = req.body;
    try{
        const updatedPreferences = await userService.updatePreferences(userData);
        res.send({message : 'Updated prefrences',updatedPreferences});
    }catch(err){
        res.status(400).send({message: err.message});
    }
};

const getNews = async(req,res)=>{
    const userData = req.body;
    try{
        const news = await userService.getNews(userData);
        res.status(200).send({news});
    }catch(err){
        res.status(400).send({message: err.message});
    }
}


module.exports = {
    registerUser,
    loginUser,
    userPreferences,
    updateUserPreferences,
    getNews
};