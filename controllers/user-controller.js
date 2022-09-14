const { User } = require('../models');
const { Op } = require('sequelize');
const { stringify } = require('uuid');

class userController {
    static async register (req,res){
        try{
            const cekAvailability = await User.findOne({
              where :{
                name: req.body.name,
                email: req.body.email
              }
            })
            if (cekAvailability != null){
              return res.status(400).json({
                msg: 'Name or Email has been Taken'
              })
            }

            let birth = req.body.birthdate
            let birth2 = birth[2]+birth[3]+birth[5]+birth[6]
            let firstId = `${birth2}%`
            const lastID = await User.findOne({
              where :{
                id: {
                  [Op.like]: firstId
                }
              },
              order: [
                ['id', 'DESC'],
            ],
            })

            let ubah;
            if(lastID?.id) {
              ubah = parseInt(lastID.id)+1
              ubah = ubah.toString()
            } else {
              ubah = birth2+"0001"
            }

              const newUser = {
                  id: ubah,
                  name: req.body.name,
                  email: req.body.email,
                  mobile: req.body.mobile,
                  birthdate: req.body.birthdate,
                  address: req.body.address,
              }
          await User.create(newUser);
              
          return res.status(201).json({
              message: 'Successfully add User',
              user_email: newUser.email
            })
            
          }
          catch(err){
              return res
              .status(err.status ||  500)
              .json({ message: err.message || 'Internal server error' })
      }
    }

    static async getAllUser(req, res) {
        const rows = await User.findAll({
        });
        return res.status(200).json({
          message: 'Successfully get all User',
          data: rows
        })
    }

    static async getUserbyID(req, res) {
        try {
        const searchR = req.body.search
        const rows = await User.findAll({
            where:{
            [Op.or]:[
              {id: searchR},
              {name: searchR},
              {email: searchR}
              ]
            },
          }
        );  

        if (rows == 0){
            return res.status(404).json({
              message: "User not Found"
            })
          }
          else{
            return res.status(200).json({
              message: 'Succesfully get user information',
              data: rows
            })}

        } catch (err) {
          return res
            .status(err.status ||  500)
            .json({ message: err.message || 'Internal server error' })
    }}

    static async getDetail(req, res) {
      try {
      const searchR = req.params.id
      const rows = await User.findAll({
          where:{
            id: searchR,
          },
        }
      );  

      if (rows == 0){
          return res.status(404).json({
            message: "User not Found"
          })
        }
        else{
          return res.status(200).json({
            message: 'Succesfully get user information',
            data: rows
          })}

      } catch (err) {
        return res
          .status(err.status ||  500)
          .json({ message: err.message || 'Internal server error' })
  }}

    static async editUserbyID(req, res) {
        try{
             await User.update({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                birthdate: req.body.birthdate,
                address: req.body.address,
               },{
                 where:{
                   id:req.params.id
                 }
               });
               return res.status(200).json({
                   message: "Successfully updated info."
               })
           } catch (err) {
               return res
                 .status(err.status || 500)
                 .json({
                   message: err.message || 'Internal server error.',
                 })
             }   
         }

    static async deleteUser(req, res) {
            try {
              if (!req.params.id) return { status: 400, message: 'ID cannot be empty' }
        
              await User.destroy({
                where: { id: req.params.id }
              });
        
              return res.status(200).json({
                message: 'Successfully delete User'
              })
            } catch (err) {
              return res
                .status(err.status ||  500)
                .json({ message: err.message || 'Internal server error' })
        }}
}

module.exports = userController