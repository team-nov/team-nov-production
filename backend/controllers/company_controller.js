const express = require('express');
const mongoose = require('mongoose');
const Company = require('../models/company_model');

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

exports.postCompany = async (req, res, next) => {

    const company = new Company({
        _id: new mongoose.Types.ObjectId(),
        company: req.body.company,
        company: req.body.company,
        companyLogo: req.body.companyLogo,
        companyLocation: req.body.companyLocation,
        companyDescription: req.body.companyDescription
    });

    try {
        await company.save()
        res.status(201).json({
            message: "Successfully added a new company",
            company: company
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}