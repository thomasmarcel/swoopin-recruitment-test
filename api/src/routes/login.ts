import Logger from '@harmonyjs/logger'
import EncryptionService from 'services/encryption'

const logger = Logger({
    name: 'AccountLogin',
    configuration: {
        console: true,
    },
})

const LoginRoute = async (server : any, opts : any, next: () => void) => {
    server.route({
        method: 'POST',
        url: '/login',
        async handler(req: any, res: any) {
            let body = req.body;
            console.log({body})
            // Getting the accout from db or something, here simulating getting the account by mail
            // User not found should return { statusCode: 401, error: 'Bad Request', message: 'user_not_found' })
            // curl -X POST "http://localhost:10000/login" -H "Content-Type: application/json"  --data email:admin@swoopin.green curl -X POST "http://localhost:10000/login" -H "Content-Type: application/json"  --data password:xSsFoDBgizoNYxK2NxOlXvUkeLmpJ9UWdth/EC9a2atZzgadjoMK1dsLV/A=
            let account =  req.conf.account;

            let encryptedPwd = EncryptionService.encryptPassword({password: body.password, salt: account.id});
            let login = EncryptionService.comparePassword({ password: body.password, salt: account.id, encrypted: encryptedPwd });
            if (login) {
                let token = server.jwt.sign({ userId: account.id, name: account.name, isAdmin: false })
                res.send({token});
            } else {
                res.send({ statusCode: 401, error: 'Bad Request', message: 'wrong_credentials' });
            }
        },
    })
    next()
}

export default LoginRoute
