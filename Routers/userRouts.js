const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../modals/user');
const validator = require('validator');



router.get("/", (req, res) => {
    res.send("<h2>WELCOME TO VITASOFT FORM API</h2>");
})

router.post("/save-details", async (req, res) => {

    try {
        const { fname, mname, lname, email, phone, address, country, state, zipcode, height, weight, password, cpassword } = req.body;

        if (!fname, !lname || !email || !phone || !address || !country || !state || !zipcode || !height || !weight || !password || !cpassword) {
            return res.status(422).json({ error: "plz fill the all field" });
        }
        if (!validator.isEmail(email)) {
            return res.status(422).json({ error: "Email Invalid ex- info@vitasoft.com" });
        }
        if (phone.toString().length != 10 || !/[6-9][0-9]{9}/.test(phone)) {
            return res.status(422).json({ error: "Phone Number must be 10 digit and start with 6,7,8 or 9" });
        }
    

        const UserExist = await User.findOne({ email: email });
        // console.log(dbEmail);
        if (UserExist) {
            return res.status(411).json({ error: "User Exist" });
        }
        if (password != cpassword) {
            return res.status(422).json({ error: "password are not matched" });
        }
        const user = new User({ fname, mname, lname, email, phone, address, country, state, zipcode, height, weight, password, cpassword });

        const userRegister = await user.save();
        // console.log(userRegister);
        res.status(201).json({ message: 'user successfully added' });
    } catch (e) {
        console.log(e + "error");
    }




})
router.get("/save-details", (req, res) => {
    res.send("hello register");
})

router.post("/login", async (req, res) => {
    // console.log(req.body);


    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: 'Plz filled all field properly' });
        }
        const userLogin = await User.findOne({ email: email });//first email from db and second is req email
        // console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            if (!isMatch) {
                res.status(422).json({ error: 'Invalid Credentials' });
            } else {
                const token = await userLogin.generateAuthToken();
                res.cookie("jwttoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });
                res.send(userLogin);
                // res.json({ message: 'user login successfully' });
                console.log(userLogin);

            }
        } else {
            res.status(422).json({ error: 'Invalid Credentials' });
        }

    } catch (err) {
        console.log(err);
    }
})

router.get("/login", (req, res) => {
    res.cookie("test", "manish");
    res.send("hello login");
})


router.delete("/delete-details/:id", async (req, res) => {
    try {
       
        const deleteUser = await User.findByIdAndDelete(req.params.id);

      
        
        if(!deleteUser){
            res.status(422).json({ error: 'Not Found' });
        }else {
            res.status(200).json({ message: 'Delete Successfully' });
        }
       
    } catch (e) {
        res.send(e);
    }
});


module.exports = router;


