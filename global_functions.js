// let ElasticLog = require('./elasticSearch');
// const ErrorLogService = require('./services/v1/auditLog/errorLog.service');
// const rollBarService = require('./services/v1/rollbar.service');
// const validationService = require('./services/v1/validationQuery.service');
// require('await-to-js');
// const to = require('await-to-js').default


Error.prepareStackTrace = (err, stack) => JSON.stringify({
    message: err.message,
    stack: stack.map(frame => ({
        file: frame.getFileName(),
        function: frame.getFunctionName(),
        column: frame.getColumnNumber(),
        line: frame.getLineNumber()
    }))
});

to = function (promise) {//global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
    return promise
        .then(data => {
            return [null, data];
        }).catch(err =>
            [pe(err)]
        );
}

pe = require('parse-error');//parses error so you can read error message and handle them accordingly

TE = function (err_message, log) { // TE stands for Throw Error
    if (log === true) {
        console.error(err_message);
    }

    throw new Error(err_message);
}


ReE = async function (res, err, code) { // Error Web Response
    // if (typeof err == 'object' && typeof err.message != 'undefined') {
    //     err = err.message;
    // }
    // let storeId = err.storeId ? err.storeId : null;
    if (err) {
        if (err.details == 'Validation error') {
            console.log({ info: 'Validation error occurred' });
            // validationService.commonValidationService();
        }
        // [errorLog, log] = await to(ErrorLogService.createErrorLog(err, storeId));
        // Let we need to check Api is crittcal or not
        // if (log && CONFIG.unWantedRollBarApi.indexOf(err.instance) == -1) {
        // if (CONFIG.app !== "local" && CONFIG.app !== "test")
        //     [errData, rollBar] = await to(rollBarService.errorLog((storeId ? ('Cid no ' + storeId + ' - ') : 'Zenbasket -') + err.instance + ' - ' + err.details));
        // }
    }
    if (typeof code !== 'undefined') res.statusCode = code;
    // if (CONFIG.environment !== "local" && CONFIG.environment !== "test") {
    //     ElasticLog.createLog(res, { response_status: 'Failure', message: err && err.details ? err.details : err.message, statusCode: code });
    // }
    return res.json({ success: false, error: err });
}


ReS = function (res, data, code) { // Success Web Response
    let send_data = { success: true };

    if (typeof data == 'object') {
        send_data = Object.assign(data, send_data);//merge the objects
    }

    if (typeof code !== 'undefined') res.statusCode = code;
    // if (CONFIG.environment !== "local" && CONFIG.environment !== "test") {
    //     ElasticLog.createLog(res, { response_status: (res.statusCode === 200 ? 'Success' : 'Failure'), message: 'Successfully Completed', statusCode: code ? code : 200 });
    // }
    return res.json(send_data)
};


//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});



