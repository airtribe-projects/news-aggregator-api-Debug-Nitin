const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const bearerToken = req.header('Authorization');
    const token = bearerToken.split(' ')[1];
    if (!token) return res.status(401).send({message : 'Access Denied'});
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) return res.status(400).send({message :'Invalid Token' });
        next();
    });
};

module.exports = verifyUser;
