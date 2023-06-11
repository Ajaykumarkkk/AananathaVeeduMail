const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const MarkettingTemplates = require('../models').markettingTemplates;
const axios = require('axios');
// const twilio = require('twilio');
// const client = twilio('AC82f8ad29f7d96163a12479c6ccde7502', '19dd15da45183eae04140a88a21d8423');

// const username = 'ajay kumar';
// client.lookups.v1
//   .phoneNumbers(username)
//   .fetch()
//   .then(number => {
//     console.log('Phone number:', number.phoneNumber);
//   })
//   .catch(error => {
//     console.error('Error:', error.message);
//   });


// const createTemplate = async function (data) {
//     let addTemplateErr, addTemplateDetails;

//     [addTemplateErr, addTemplateDetails] = await to(MarkettingTemplates.create(data.templateDetails));
//     if (addTemplateErr) {
//         return TE(addTemplateErr.message);
//     }
//     return addTemplateDetails;
// }
// module.exports.createTemplate = createTemplate;

const fetchPostOfficeAddress = async function (pincode) {
    try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = response.data;
        if (data && data[0] && data[0].PostOffice) {
            const postOffice = data[0].PostOffice[0];
            console.log('Post Office:', postOffice);
            console.log('Address:', postOffice.Name, postOffice.District, postOffice.State, postOffice.Country);
            return data;
        } else {
            console.log('Post office address not found for the given pincode');
        }
    } catch (error) {
        console.error('Error fetching post office address:', error);
    }
}
module.exports.fetchPostOfficeAddress = fetchPostOfficeAddress;




// const getOneTemplate = async function (data) {
//     let getOneTemplateErr, getOneTemplateDetails;

//     // [getOneTemplateErr, getOneTemplateDetails] = await to(MarkettingTemplates.findOne(data.templateDetails)); 

//     [getOneTemplateErr, getOneTemplateDetails] = await to(
//         MarkettingTemplates.findOne({
//             where: {
//                 id: data && data.templateId
//             },
//             attributes: ['id', 'templateName', 'subject', 'content', 'jsonData']
//         })
//     );
//     if (getOneTemplateErr) {
//         return TE(getOneTemplateErr.message);
//     }
//     return getOneTemplateDetails;
// }
// module.exports.getOneTemplate = getOneTemplate;