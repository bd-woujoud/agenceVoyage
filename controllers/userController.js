
const User = require('../Models/userModel')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const { UserValidation, ValidateLoginData } = require('../validation/validateuser');

function signToken(userID) {

  return jwt.sign({
    iss: 'moonServer',
    sub: userID
  }, process.env.SECRET_KEY, { expiresIn: '1h' })

}

module.exports = {

  registre: async (req, res) => {

  
    const { error } = UserValidation(req.body)

    if (error)
        return res.status(422).json({
            success: false,
            errors: error,
            message: 'user data validation error'
        })

    else {
      const { password, email } = req.body
        // tester l'existance de user avec email

      User.findOne({ email }, function (err, user) {

        if (err)

          return res.status(500).json({ msg: err.message, error: true })

          if (user)
          return res.status(422).json({
              message: 'user invalid credantials',
              errors: {
                  details: [
                      {
                          "message": "user with this email is already exist!",
                          "path": [
                              "email"
                          ]
                      }
                  ]
              }
          })

        else {

          const newUser = new User(req.body)
          newUser.email = req.body.email,
            newUser.password = req.body.password,
            newUser.nom = req.body.nom,
            newUser.prenom = req.body.prenom,
            newUser.Num_passport = req.body.Num_passport,
             newUser.role = req.body.role,


            newUser.save((err, user) => {

              if (err)

                return res.status(500).json({ msg: err.message, error: true })
              else {

                return res.status(200).json({ msg:newUser })
              }
            })
        }
      }
      )
    }
  },


  login: async (req, res) => {

    const { password, email } = req.body

    const { error } = ValidateLoginData(req.body)

    if (error)
        return res.status(422).json({
            success: false,
            errors: error,
            message: 'user data validation error'
        })


    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(422).json({
            success: false,
            errors: {
                details: [
                    {
                        path: ['email'], message: 'user with this email does not exist'
                    }
                ]
            },
        })
    }

    const ismatch = await bcrypt.compare(password, user.password) 
    console.log(ismatch);
    if (!ismatch) {
        res.status(422).json({
            success: false,
            errors: {
                details: [
                    {
                        path: ['password'], message: 'invalid password try again'
                    }
                ]
            },
        })
    }

       else {
    const { _id, email, role } = req.user;
    const token = signToken(_id);
    console.log("eeeeeeeeeeeee", req.body);
    res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });
    return res.status(200).json({ isAuthenticated: true, user: { email, role }, token })
  }
    
},


  logout: (req, res) => {

    res.clearCookie("access_token");
    res.status(200).json({

      isconnected: false,
      message: "succesffully logged out",

    })

  },


  //Check auth status everytime front-end app refreshes
  authenticated: function (req, res) {

    const { email, role, Num_passport, tel, nom, prenom, adresse, _id, avatar, password } = req.user;
    return res.status(200).json({ isAuthenticated: true, user: { email, role, Num_passport, tel, nom, prenom, adresse, _id, avatar, password } })
  },


  getAllbyrole: function (req, res) {


    User.find({ role: "agent" }, function (err, agent) {


      if (err) {


        res.json({ message: 'error get agent ' + err, data: null, status: 500 })
      }
      else {

        res.json({ message: 'all agent in DB ', data: agent, status: 200 })
      }

    })

  },

  deleteuserById: function (req, res) {

    User.findByIdAndDelete({ _id: req.params.id }, function (err, agent) {


      if (err) {


        res.json({ message: 'error delete  user by id ' + err, data: null, status: 500 })
      }
      else {

        res.json({ message: 'user deleted successufly', data: agent, status: 200 })
      }

    })

  },


  updateuserById: function (req, res) {

    User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, user) {

      if (err) {

        res.json({ message: 'error update  user by id ' + err, data: null, status: 500 })
      }
      else {

        res.json({ message: 'user updated successufly', data: user, status: 200 })
      }

    })

  },

  uploadavatar: (req, res) => {
    const data = {
      avatar: req.file.filename,
    };

    User.findByIdAndUpdate({ _id: req.params.id }, data, (err, user) => {
      if (err) {
        res.status(500).json({ message: "avatar not uploaded" });
      } else {
        User.findById({ _id: user.id }, (err, user) => {
          if (err) {
            res.json("error");
          } else {
            res.status(200).json({
              message: "user updated",
              data: user,
            });
          }
        });
      }
    });
  },


}