const joi = require('joi');
const {BadRequestError} = require('../Utils/Errors/user_error');

const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    preferences: joi.array().items(joi.string()),
    dateCreated: joi.date()
});

class UserModelDTO {
    constructor(user){
        const {error,val}=userSchema.validate(user);
        if(error){
        throw new BadRequestError(error.message);
        }
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.preferences = user.preferences || [];
        this.dateCreated = user.dateCreated;
    }
}

module.exports = UserModelDTO;