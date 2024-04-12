const jwt = require('jsonwebtoken');



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: "15d",
    });
};

module.exports = generateToken;
