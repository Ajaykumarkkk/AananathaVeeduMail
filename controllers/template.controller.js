var express = require('express');
var router = express.Router();
var TemplateServices = require('../services/template.services');
var CommonService = require('../services/commonService');
var StoreCreditsService = require('../services/storeCreditsService');
let MSG = require('../config/messages/emailMarketing/template').MSG;



const addTemplateDetails = async function (req, res) {
    // console.log("req.connection.remoteAddress",req.connection);
    // console.log("req.connection.remoteAddress",req.connection?.remoteAddress);
    // console.log("req.socket.localAddress",req.socket?.localAddress);
    // const ip = res?.socket?.remoteAddress;
    // console.log('IP Address:', ip);

    // let [addTemplateDetailsErr, addTemplateDetails] = await to(TemplateServices.createTemplate(req?.body));
    let [addTemplateDetailsErr, addTemplateDetails] = await to(StoreCreditsService.getOneStoreCredit(req?.body?.pincode));

    if (addTemplateDetailsErr) {
        console.log({ ERROR: 'Failed to send mail template for email marketting mail - ' + addTemplateDetailsErr.message });
        return ReE(res, {
            //  details: updateCampaignMailErr.message
            statusCode: 'template-err-001',
            message: 'Failed to create template mail',
            detail: addTemplateDetailsErr.message,
            instance: '/template/add'
        }, 422);
    }


    return ReS(res,
        {
            response: addTemplateDetails,
            statusCode: 200,
            msg: "MSG.CREATE_STORE_DEFAULT_TEMPLATE_SUCCESS.message"
        },
        200);

}
// module.exports.addTemplateDetails = addTemplateDetails;


const encryptDetails = async function (req, res) {
    console.log({ 'INFO': 'encryptDetails function is called' });

    // let [addTemplateDetailsErr, addTemplateDetails] = await to(CommonService.encryptDetails(req?.body?.data, req?.body?.secretKey ));
    // let [addTemplateDetailsErr, addTemplateDetails] = await to(StoreCreditsService.encryptDetails(req?.body?.data, req?.body?.secretKey ));
    // let [addTemplateDetailsErr, addTemplateDetails] = await to(StoreCreditsService.getOneStoreCredit1('hello', 'ajay'));
    let [addTemplateDetailsErr, addTemplateDetails] = await to(StoreCreditsService.decryptDetails(req?.body?.data, req?.body?.secretKey));
    console.log("yes bro");

    if (addTemplateDetailsErr) {
        console.log({ ERROR: 'Failed to send mail template for email marketting mail - ' + addTemplateDetailsErr.message });
        return ReE(res, {
            //  details: updateCampaignMailErr.message
            statusCode: 'template-err-001',
            message: 'Failed to create template mail',
            detail: addTemplateDetailsErr.message,
            instance: '/template/add'
        }, 422);
    }


    return ReS(res,
        {
            response: addTemplateDetails,
            statusCode: 200,
            msg: "MSG.CREATE_STORE_DEFAULT_TEMPLATE_SUCCESS.message"
        },
        200);



}


const getOneTemplate = async function (req, res) {
    console.log({ 'INFO': 'getOne marketing template function is called' });

    let [getOneTemplateDetailsErr, getOneTemplateDetails] = await to(TemplateServices.getOneTemplate(req?.params));

    if (getOneTemplateDetailsErr) {
        console.log({ ERROR: 'Failed to get one template for template controller - ' + getOneTemplateDetailsErr.message });
        return ReE(res, Object.assign(MSG.TEMPLATE_GET_ONE_FAILED, { details: getOneTemplateDetailsErr.message }), 422);
    }

    console.log({ 'INFO': 'getOne marketing template function is success' });
    return ReS(res, { response: getOneTemplateDetails, statusCode: MSG.TEMPLATE_GET_ONE_SUCCESS.statusCode, msg: MSG.TEMPLATE_GET_ONE_SUCCESS.message }, 200);
}

// module.exports = router;




router.post('/add', addTemplateDetails);
router.post('/encryptDetails', encryptDetails);
// router.put('/mail/send', sendMailTemplate);
router.get('/:templateId/one', getOneTemplate);

module.exports = {
    router, addTemplateDetails, getOneTemplate, encryptDetails
};