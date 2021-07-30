const express = require('express');
const mongoose = require('mongoose');
const Company = require('../models/company_model');
const User = require('../models/user_model');

exports.getCompanies = async (req, res, next) => {
    try {
        const data = await Company.find()
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

exports.getCompanyById = (req,res,next) => {
    let id = req.params.companyId
    Company
        .findOne({_id:id})
        .exec()
        .then((data)=>{
            console.log(data);
            res.status(200).json(data)
        })
}

exports.postCompany = async (req, res) => {

    const company = new Company({
        _id: new mongoose.Types.ObjectId(),
        company: req.body.company,
        companyLogo: req.body.companyLogo,
        companyLocation: req.body.companyLocation,
        companyDescription: req.body.companyDescription,
        founder: req.body.founder_id
    });

    let userTeam = [];
    let newCompany = {company: company.company, id: company._id}
    console.log(newCompany);

    User
        .findOne({_id:req.body.founder_id})
        .exec()
        .then((data)=>{
            console.log(userTeam);
            User
            .updateOne({_id: req.body.founder_id},{$push:{team: newCompany}})
            .exec()
        })

  company.save()
      .then((result)=>{
          console.log(result)
          res.status(201).json({
              message:"Successfully added company",
              success: true,
              company: company
          })
      })
      .catch(err=>{
          console.log(err);
          res.status(500).json({
              error:err
          })
      });
}

exports.updateCompanyInfo = (req, res, next) => {
    const id = req.body._id
    console.log(id);
    Company
        .updateOne({_id: id},{$set:req.body})
        .exec()
        .then(result=>{
            res.status(200).json({
                success: true
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
}