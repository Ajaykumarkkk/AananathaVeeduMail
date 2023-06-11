const CryptoJS = require('crypto-js');

const models = require("../models");

/**
 * Original Author	: Karthikeyan T
 * Author		        : Karthikeyan T
 * Created On		    : 03-04-2023.
 * Modified on      : 03-04-2023.
 * Function: excecuteQuery
 * Function excecuteQuery is used to Excecute the raw html query
 * @param query  contains raw string of sql query
 * @param replacements contains object of replaced values
 * @return  query result
 */
const excecuteQuery = async (query, replacements, Querytype) => {
  // console.log({ Info: "Excecuting the Following Query" });
  // console.log({ QUERY: query });
  let [err, queryReturn] = await to(models.sequelize.query(
    query, { replacements: replacements, type: models.sequelize.QueryTypes + '.' + Querytype },
  ));
  if (err) return TE(err.message);
  // console.log({ INFO: "Query Excecution Completed" });
  return queryReturn;

}
module.exports.excecuteQuery = excecuteQuery;

/**
 * Original Author	: Karthikeyan T
 * Author		        : Karthikeyan T
 * Created On		    : 03-04-2023.
 * Modified on      : 03-04-2023.
 * Function: replaceQueryContent
 * Function replaceQueryContent is used to replace the query values
 * @param content  contains content string with ${replacementValue}
 * @param keyObject contains object of replaced values
 * @return replaced string
 */
const replaceQueryContent = async (content, keyObject) => {
  for (let key in keyObject) {
    const replaceText = '${' + key + '}';
    content = content && (content.split(replaceText).join(keyObject[key]));
  }
  return content;
}
module.exports.replaceQueryContent = replaceQueryContent;

/**
 * async function for encrypting the tokens and id details
 */
const encryptDetails = async (data, secretKey) => {
  if (data) {
    console.log("data", data);
    const text = CryptoJS.AES.encrypt(data.toString(), secretKey ? secretKey : 'ajay').toString();
    const datas = text.replace(/\\/g, '|');
    console.log("data", datas);
    return datas;
  } else {
    return null;
  }
}
module.exports.encryptDetails = encryptDetails;