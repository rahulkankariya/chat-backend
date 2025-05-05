const validation = require('../../validation/v1/auth')
const authService = require('./../../services/v1/authService')
const message = require('../../common/stringconstant');
const stringconstant = require('../../common/stringconstant');

exports.signUp = async (req, res) => {
    try {
        const { error } = validation.signup(req.body);
     
        if (error) {
            return res.status(200).send({
                status: 400,
                message: error.details[0].message,
                data: {},
            });
        } else {
            let info = await authService.signup(req, res);
            if (info.executed == 1) {
                res.json({ status: 200, message: stringconstant.SUCESS, data: info.data });
            }
            else if (info.executed == 2) {
                res.json({ status: 400, message: stringconstant.EMAILALREADYEXISTS, data: {} });
            }
            else {
                res.json({ status: 400, message: stringconstant.SOMETHINGWENTWRONG, data: {} });
            }
        }
    } catch (error) {
       
        res.json({ status: 503, message: stringconstant.SOMETHINGWENTWRONG, data: error });
    }

}
exports.login = async (req, res) => {
    try {
        const { error } = validation.login(req.body);
        
        if (error) {
            return res.status(200).send({
                status: 400,
                message: error.details[0].message,
                data: {},
            });
        } else {
            let info = await authService.login(req, res);
           
            if (info.executed == 1) {
                res.json({ status: 200, message: stringconstant.SUCESS, data: info.data });
            }
            else if (info.executed == 2) {
                res.json({ status: 400, message: stringconstant.PASSWORDDOESNOTMATCH, data: {} });
            }
            else if (info.executed == 3) {
                res.json({ status: 400, message: stringconstant.EMAILNOTEXISTS, data: {} });
            }
            else {
                stringconstant
                res.json({ status: 400, message: message.SOMETHINGWENTWRONG, data: {} });
            }
        }
    } catch (error) {

        res.json({ status: 503, message: stringconstant.SOMETHINGWENTWRONG, data: error });
    }

}
exports.getProfile = async (req, res) => {
    try {

        let info = await authService.getProfile(req, res);

        if (info.executed == 1) {
            res.json({ status: 200, message: stringconstant.SUCESS, data: info.data });
        }
        else {
            res.json({ status: 400, message: stringconstant.EMAILALREADYEXISTS, data: {} });
        }

    } catch (error) {

        res.json({ status: 503, message: stringconstant.SOMETHINGWENTWRONG, data: error });
    }

}
exports.userList = async (req, res) => {
    try {

        let info = await authService.userList(req, res);

        if (info.executed == 1) {
            res.json({ status: 200, message: stringconstant.SUCESS, data: info.data });
        }
        else {
            res.json({ status: 400, message: stringconstant.NODATAFOUND, data: info.data });
        }

    } catch (error) {

        res.json({ status: 503, message: stringconstant.SOMETHINGWENTWRONG, data: error });
    }

}
exports.chatMessageList = async (req, res) => {
    try {

        let info = await authService.userList(req, res);

        if (info.executed == 1) {
            res.json({ status: 200, message: stringconstant.SUCESS, data: info.data });
        }
        else {
            res.json({ status: 400, message: stringconstant.NODATAFOUND, data: info.data });
        }

    } catch (error) {

        res.json({ status: 503, message: stringconstant.SOMETHINGWENTWRONG, data: error });
    }

}