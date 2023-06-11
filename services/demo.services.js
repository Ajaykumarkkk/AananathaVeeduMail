const nodemailer = require('nodemailer');


const updateCampaignMappingDetails = async function (data) {
    // console.log("updateCampaignMappingDetails", data.body.name);
    // let name = data.body.name;
    // setTimeout(10000);
    // for (var i = 0; i <= 10; i++) {

    // printNumbersForEvery2Sec(10);
    // aprint(i);
    // await to(aprint(i));
    // }
    // sendMail()
    let [updateCampaignMailErr, updateCampaignMail] = await to(sendMail(data.body));

    if (updateCampaignMail) {
        // return {name: name};
        console.log("updateCampaignMail", updateCampaignMail);
        return true;
    } else {
        // console.log("updateCampaignMailErr", updateCampaignMailErr);
    }


    // return true;
}
module.exports.updateCampaignMappingDetails = updateCampaignMappingDetails;

// const printNumbersForEvery2Sec = (n) => {
//     for (let i = 0; i < n; i++) {
//         setTimeout(() => {
//             console.log(i)
//         }, i * 2000);
//         console.log("i",i);
//         if (i == (n - 1)) {
//             console.log("yes1 bro " + i, (n - 1));
//         }
//     }
//     // console.log("yes bro");
// }


const sendMail = async function (data) {
    console.log({ "info": "sendMail function called" })
    let dynamicData = data?.mailData;
    if (data?.sender) {
        //   return TE("err.message dummy bro");

        // let mailTransporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'ajaysixfacegod@gmail.com',
        //         pass: 'sgwhnncqxdghktwa'
        //     }
        // });
        let [mailTransporterErr, mailTransporter] = await to(createMailTransport(data));
        console.log("mailTransporterErr", mailTransporterErr);

        let mailDetails = {
            from: 'ajaysixfacegod@gmail.com',
            // to: 'ajay44@mailinator.com',
            to: data?.sender ?? 'ajay44@mailinator.com',
            subject: data?.subject ?? 'Test mail',
            text: data?.content ?? 'Test mail',
            // html: data?.html ? data?.html : dynamicData ? eval('`' + data?.html + '`') : '<h1>Test mail</h1>'
            html: dynamicData ? eval('`' + data?.html + '`') : data?.html ? data?.html : '<h1>Test mail</h1>'
            // html: eval('`' + data?.html + '`')
        };

        let [updateCampaignMailErr, updateCampaignMail] = await to(mailTransporter.sendMail(mailDetails));
        // mailTransporter.sendMail(mailDetails, function (err, data) {
        //     if (err) {
        //         console.log('Error Occurs', err);
        //     } else {
        //         console.log('Email sent successfully', data);

        //     }
        //     return data;
        // });
        // console.log({ "info": "sendMail function sucessfully" });
        // console.log("updateCampaignMailErr", updateCampaignMailErr);
        // console.log("updateCampaignMail", updateCampaignMail);
        // if(updateCampaignMail){
        //     return true;
        // }
        return updateCampaignMail;
    } else {
        return data?.sender ? "Content is missing" : "Sender is missing"

    }
    // return true;

}
module.exports.sendMail = sendMail;




const createMailTransport = async function (data) {
    let mailTransporter;
    if (data?.mailId && data?.code && data?.service) {
        mailTransporter = nodemailer.createTransport({
            service: data?.service ?? 'gmail',
            auth: {
                user: data?.mailId ?? 'ajaysixfacegod@gmail.com',
                pass: data?.code ?? 'sgwhnncqxdghktwa'
            }
        });
    } else {
        mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ajaysixfacegod@gmail.com',
                pass: 'sgwhnncqxdghktwa'
            }
        });
    }

    return mailTransporter;
}
module.exports.createMailTransport = createMailTransport;




const sendMailTemplate = async function (data) {
    if (data) {
        if (data.name && data.component && data.item && data.action && data.senders && data.senders.length) {
            let sendMailErr, sendMails;
            // let senders = ['ajay40@mailinator.com'];
            let senders = data.senders;
            let htmlContentForAdd = (data?.action == 'Add') ?
                '<div style="width:85%; padding-left:10%; padding-right:10%;color:black;font-family:Roboto, sans-serif;line-height:1.5em;font-size:15px; "> <span> <div style="display: flex;justify-content: center;"> <img src="https://aanandhaveedu.netlify.app/assets/av_logo.png" alt="Aanandhaveedu" style="width:auto !important; height:100px; display: block; margin: auto;"/></div><div style="text-align: center;color: #038b40;"> <h2>Aanandhaveedu</h2></div></span> <div> <h2 style="text-align: center;color:#740057;">Budget Notification</h2> </div> <div style="width:75%; padding-left:10%; padding-right:10%;margin:auto;color:black;"> <hr style=" border-top: 2px solid #2d5cff"> <div style="padding:0 2%;color:black;"> <p style="font-size:14px;color:black"> <span style="font-weight:bold;">Hi ${data.customerName}</span>,<br></p> <p style=" text-indent: 50px; text-align: justify;font-size:13px;color:black;">${data.name}, ${data.action} ${data.item} in ${data.component}.</p><p style=" text-indent: 50px; text-align: justify;font-size:13px;color:black;">Amount: - ${data.amount}</p><p style=" text-indent: 50px; text-align: justify;font-size:13px;color:black;">Remaining Balance: ${data.balance}</p><p style="font-size:13px; line-height:2.0; text-align: justify; font-family: Roboto, sans-serif;color:black"><b> Thank you for your contribution! <br>If you have any inquiries, contact us here </b><br><b>${data.phone}</b></p> </div><hr style=" border-top: 2px solid #2d5cff"> <div style="max-width: 65%; margin:auto"> <p style="color:#740057;margin: 0px;font-weight: bold;text-align: center;">Powered by <a href="https://instagram.com/sixfacegod_407?igshid=ZGUzMzM3NWJiOQ==" target="_blank" style="text-decoration: none; color:#038b40;">SixFaceGod</a></p> </div></div></div>'
                : '<div style="width:85%; padding-left:10%; padding-right:10%;color:black;font-family:Roboto, sans-serif;line-height:1.5em;font-size:15px; "> <span> <div style="display: flex;justify-content: center;"> <img src="https://aanandhaveedu.netlify.app/assets/av_logo.png" alt="Aanandhaveedu" style="width:auto !important; height:100px; display: block; margin: auto;"/></div><div style="text-align: center;color: #038b40;"> <h2>Aanandhaveedu</h2></div></span> <div> <h2 style="text-align: center;color:#740057;">Budget Notification</h2> </div> <div style="width:75%; padding-left:10%; padding-right:10%;margin:auto;color:black;"> <hr style=" border-top: 2px solid #2d5cff"> <div style="padding:0 2%;color:black;"> <p style="font-size:14px;color:black"> <span style="font-weight:bold;">Hi ${data.customerName}</span>,<br></p> <p style=" text-indent: 50px; text-align: justify;font-size:13px;color:black;">${data.name}, ${data.action} ${data.item} in ${data.component}.</p><p style=" text-indent: 50px; text-align: justify;font-size:13px;color:black;">Current Balance: - ${data.balance}</p><p style="font-size:13px; line-height:2.0; text-align: justify; font-family: Roboto, sans-serif;color:black"><b> Thank you for your contribution! <br>If you have any inquiries, contact us here </b><br><b>${data.phone}</b></p> </div><hr style=" border-top: 2px solid #2d5cff"> <div style="max-width: 65%; margin:auto"> <p style="color:#740057;margin: 0px;font-weight: bold;text-align: center;">Powered by <a href="https://instagram.com/sixfacegod_407?igshid=ZGUzMzM3NWJiOQ==" target="_blank" style="text-decoration: none; color:#038b40;">SixFaceGod</a></p> </div></div></div>';
            let subject = 'Aanandhaveedu!!! - ' + data.name + ' ' + data.action + ' ' + data.item + ' ' + ' in ' + data.component;
            for (let i = 0; i < senders.length; i++) {
                [sendMailErr, sendMails] = await to(sendMail({
                    html: htmlContentForAdd,
                    subject: subject,
                    sender: senders[i]?.mailId,
                    customerName: senders[i]?.customerName,
                    mailData: data,
                    name: data.name ?? null,
                    action: data.action ?? null,
                    item: data.item ?? null,
                    component: data.component ?? null,
                    balance: data.balance ?? null,
                    amount: data.amount ?? null,
                    phone: data.phone ?? '9345682746'
                }));
                console.log("sendMailErr", sendMailErr);
                console.log("sendMails count : ", (i + 1), " ", sendMails);

            }

            return { sendMails: true };

        } else {
            console.log("data is ");
            console.log("name is ", data?.name);
            console.log("component is ", data?.component);
            console.log("item is ", data?.item);
            console.log("action is ", data?.action);
            console.log("action is ", data?.senders?.length);
        }
    } else {
        console.log("data is missing");
    }
}
module.exports.sendMailTemplate = sendMailTemplate;