const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModelDAO = require('../Models/userModelDAO');
const { default: axios } = require('axios');
require('dotenv').config();

const generateToken = (user) => {
    const payload = {email: user.email, id: user.id};
    const secret = process.env.JWT_SECRET;
    const options = {expiresIn: '1h'};
    return jwt.sign(payload, secret, options);
}

const registerUser = async(userDTO)=>{
    const existingUser = await UserModelDAO.findOne({email : userDTO.email});
    if(existingUser){
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(userDTO.password,10);
    userDTO.password = hashedPassword;

    const newUser = await UserModelDAO.createUser(userDTO);
    return newUser;
}

const loginUser = async(userDTO)=>{
    const existingUser = await UserModelDAO.findOne({email : userDTO.email});
    if(!existingUser){
        throw new Error('User does not exist');
    }
    const isMatch = await bcrypt.compare(userDTO.password, existingUser.password);
    if(!isMatch){
        throw new Error('Invalid credentials');
    }
    const token = generateToken(existingUser);
    return token;
}

const userPreferences = async(userData)=>{
    const user = await UserModelDAO.findOne({email : userData.email});
    if(!user){
        throw new Error('User does not exist');
    }else{
        return user.preferences;
    }
}

const updatePreferences = async(userData)=>{
    const user = await UserModelDAO.findOne({ email: userData.email });
    if(!user){
        throw new Error('User does not exist');
    }
    user.preferences = userData.preferences;
    const updatedUser = await UserModelDAO.updateUser(user);
    return updatedUser.preferences;
}

const getNews = async(userData)=>{
    const user = await UserModelDAO.findOne({email : userData.email});
    if(!user){
        throw new Error('User does not exist');
    }
    const preferences = user.preferences;
    const searchQuery = preferences.join(' OR ');
    let url = `https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=popularity&pageSize=3&apiKey=${process.env.API_KEY}`;
    try{
        const response = await axios.get(url);
        const articles = response.data.articles;
        return articles;
    }catch(err){
        throw new Error('Error fetching news');
    }
};

module.exports = {
    loginUser,
    registerUser,
    userPreferences,
    updatePreferences,
    getNews
};