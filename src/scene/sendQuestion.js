const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../../secretkey.json');
require('dotenv').config();
module.exports = (nameUser, phoneUser, questionUser) => {
  (async function accessSpreadsheet(nameUser, phoneUser, questionUser) {
    try {
      const doc = new GoogleSpreadsheet('1yWrjwjbcQtyFVHiyIJhqGq72D8LMvmddQLO7nn0U1NE');
      const time = new Date();
      let curr_date = time.getDate();
     let curr_month = time.getMonth() + 1;
      let curr_year = time.getFullYear();
      let fulldata= curr_year + "-" + curr_month + "-" + curr_date
      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
      });
      await doc.loadInfo(); // loads document properties and worksheets
      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
      // append rows
      const larryRow = await sheet.addRow({
        Name: nameUser,
        Phone: phoneUser,
        Question: questionUser,
        Data: fulldata,
      });
    } catch (error) {
      console.log(error);
    }
  })(nameUser, phoneUser, questionUser);
};
