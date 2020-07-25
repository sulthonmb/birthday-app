import runSQL from '../utils/runSQL';

import {
    errorMessage, successMessage, status,
} from '../helpers/status';

const get = async (email) => {
    const signinAdminQuery = 'SELECT * FROM admin WHERE email = $1';
    try {
        const { rows } = await runSQL.query(signinAdminQuery, [email]);
        const dbResponse = rows[0];
        return { status: status.success, data: dbResponse };
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return { status: status.error, data: errorMessage };
    }
}
   
module.exports = {
    get
}