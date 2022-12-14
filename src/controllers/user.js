'use strict';

const db = require('../db');
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require("dotenv").config();

// const createCompany = async (req, res) => {

//     const { companyName, companyEmail, companyPassword, companyRole } = req.body;

//     try {
//         let company = await Company.findOne({ companyEmail });

//         if (company && company.companyEmail === companyEmail) {
//             return res.status(400).json({ msg: 'Company already exists' });
//         }

//         company = new Company({
//             companyName,
//             companyEmail,
//             companyRole,
//             companyPassword
//         });

//         const salt = await bcrypt.genSalt(10);

//         company.companyPassword = await bcrypt.hash(companyPassword, salt);

//         await company.save();


//         return res.json({ msg: 'Company registered', company });


//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// }

const createUser = async (req, res) => {
    const { userName, userEmail , userPassword } = req.body;

    try {
        let user = await User.findOne({ userEmail });

        if (user && user.userEmail === userEmail) {
             return res.status(400).json({ msg: 'user already exists' });
        }

      user = new User({
            userName,
            userEmail,
            userPassword,
        });

        const salt = await bcrypt.genSalt(10);

        user.userPassword = await bcrypt.hash(userPassword, salt);

        await user.save();


        return res.json({ msg: 'user registered', user });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

const loginUser = async (req, res) => {
    var {  userEmail, userPassword } = req.body

    try {
        let user = await User.findAll({ userEmail });
         
        let matchUser =  user.filter(u => u.userEmail === userEmail);


        if (!matchUser) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        var password =  userPassword.toString()
        const isMatch = await bcrypt.compare(password, matchUser[0].userPassword);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Your password Wrong' });
        }
        
        const payload = {
            user: {
                user_id: matchUser[0].user_id,
                userName: matchUser[0].userName,
                userEmail: matchUser[0].userEmail,
            }
        };

        var token = jwt.sign({ payload },  process.env.JWT_SECRET, {
            expiresIn:  process.env.JWT_LIFETIME
        });

        var userdata = {
            user_id: matchUser[0].user_id,
            userName: matchUser[0].userName,
            userEmail: matchUser[0].userEmail,
        }    

        return res.json({
            token: token,
            user: userdata
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

// const loginCompany = async (req, res) => {


//     var { companyEmail, companyPassword } = req.body;

//     try {
//         let company = await Company.findAll({ companyEmail });

//         let matchCompany =  company.filter(c => c.companyEmail === companyEmail);

//         console.log(matchCompany);
//         console.log("matchCompany.companyPassword", matchCompany[0].companyPassword)

//         if (!matchCompany) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

    
//         var password =  companyPassword.toString()
//         const isMatch = await bcrypt.compare(password, matchCompany[0].companyPassword);

//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

//         const payload = {
//             company: {
//                 company_id: matchCompany[0].company_id,
//                 companyName:matchCompany[0].companyName,
//                 companyEmail:matchCompany[0].companyEmail,
//             }
//         };

//         var token = jwt.sign({ payload },  process.env.JWT_SECRET, {
//             expiresIn:  process.env.JWT_LIFETIME
//         });

//         var companydata = {
//             company_id: matchCompany[0].company_id,
//             companyName: matchCompany[0].companyName,
//             companyEmail: matchCompany[0].companyEmail,
//             companyRole: matchCompany[0].companyRole
//         }

//         return res.json({
//             token: token,
//             company: companydata
//         });


//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// }

// const getAllCompanies = async (req, res) => {

//     try {
//         let companies = await Company.findAll({
//             attributes: ['company_id', 'companyName', 'companyEmail']
//         });

//         return res.json({ companies });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// }
 

module.exports = {
    createUser,
    loginUser
}