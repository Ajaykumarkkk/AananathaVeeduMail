var express = require('express');
var router = express.Router();
var DemoServices = require('../services/demo.services');
// var await = require('await-to-js');
// require('../global_functions');
// const to = require('await-to-js').default

// to = function (promise) {
//     return promise
//         .then(data => {
//             return [null, data];
//         }).catch(err =>
//             [pe(err)]
//         );
// }


const addDefaultTemplateDetails = async function (req, res) {
    // function addDefaultTemplateDetails(req, res) {
    console.log("addDefaultTemplateDetails");
    // let [updateCampaignMailErr, updateCampaignMail] = await to(DemoServices.updateCampaignMappingDetails(req));
    let [updateCampaignMailErr, updateCampaignMail] = await to(DemoServices.sendMail(req?.body));
    // return true;
    // console.log("updateCampaignMailErr ", updateCampaignMailErr);
    if (updateCampaignMailErr) {
        // console.log("updateCampaignMailErr ", updateCampaignMailErr);
        console.log({ ERROR: 'Failed to send mail template for email marketting mail - ' + updateCampaignMailErr.message });
        // return ReE(res, Object.assign(MSG.SEND_MAIL_FAILED, { details: sendMailErr.message }), 422);
        return ReE(res, {
            //  details: updateCampaignMailErr.message
            statusCode: 'send-mail-err-001',
            message: 'Failed to send mail',
            detail: 'Failed to send mail',
            instance: '/campaign'
        }, 422);
        //   return TE(err.message);
    }
    console.log("updateCampaignMail ", updateCampaignMail);
    return ReS(res,
        {
            response: updateCampaignMail,
            statusCode: 200,
            msg: "MSG.CREATE_STORE_DEFAULT_TEMPLATE_SUCCESS.message"
        },
        200);

}



const sendMailTemplate = async function (req, res) {
    console.log("sendMailTemplate");
    let [updateCampaignMailErr, updateCampaignMail] = await to(DemoServices.sendMailTemplate(req?.body));
    if (updateCampaignMailErr) {
        console.log({ ERROR: 'Failed to send mail template for email marketting mail - ' + updateCampaignMailErr.message });
        return ReE(res, {
            statusCode: 'send-mail-err-001',
            message: 'Failed to send mail',
            detail: 'Failed to send mail',
            instance: '/campaign'
        }, 422);
    }
    console.log("updateCampaignMail ", updateCampaignMail);
    return ReS(res,
        {
            response: updateCampaignMail,
            statusCode: 200,
            msg: "MSG.CREATE_STORE_DEFAULT_TEMPLATE_SUCCESS.message"
        },
        200);

}

module.exports.sendMailTemplate = sendMailTemplate;

router.get('/template/add', addDefaultTemplateDetails);
router.post('/mail', addDefaultTemplateDetails);
router.post('/mailTemplate', sendMailTemplate);

module.exports = router;

// module.exports = {
//  addDefaultTemplateDetails
//   }