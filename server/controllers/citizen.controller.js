import Citizen from '../models/citizen.model';
import PasswordGenerator from 'generate-password';
import Crypto from 'crypto';


/*
Route: /api/citizen/check
Method: GET
*/
function check(req, res) {
    res.send('successfully connect to /citizen route');
}


/*
Route: /api/citizen
Method: POST
{
    id: '2222'
}
*/
function postCitizenById(req, res) {
    const _id = req.body['id'];

    if (_id) {
        Citizen.findOne({id: _id}, function (err, citizen) {
            if(err) {
                console.log('ERR');
            } else if(citizen) {
                res.status(200);
                res.json(citizen);
            } else {
                res.status(404);
                const message = {
                    message: 'Invalid citizen ID!'
                }
                res.json(message);
            }
        });
    }
}



function getGeneratedPassword() {
    return PasswordGenerator.generate({
        length: 10,
        numbers: true
    })
}

function isExist(_id) {
    return Citizen.findOne({ id: _id }, function (err, citizen) {
            return true
    });

}

/*
Route: /api/citizen/generatePassword
Method: POST
{
    id: '2222'
}
*/
async function postGeneratePassword(req, res) {
    const _id = req.body['id'];
    const _defaultPassword = getGeneratedPassword();
    const query = { id: _id };
    const updateValues = {
        $set:
            { defaultPassword: Crypto.createHash('md5').update(_defaultPassword).digest('hex') }
    };

    if (_id) {
        Citizen.updateOne(
            query,
            updateValues,
            { overwrite: true, upsert: false },
            function (err, rawResponse) {});
    }

    res.json({ password: _defaultPassword });
}

export default {
    check,
    postCitizenById,
    postGeneratePassword
}