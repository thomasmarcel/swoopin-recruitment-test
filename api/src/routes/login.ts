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
            // Getting the accout from db or something, here simulating getting the account by mail
            let account =  req.conf.account;

            let encryptedPwd = EncryptionService.encryptPassword({password: body.password, salt: account.id});
            let logIn = EncryptionService.comparePassword({ password: body.password, salt: account.id, encrypted: encryptedPwd });
            let token = server.jwt.sign({ userId: account.id, name: account.name, isAdmin: false })
            res.send({token});
        },
    })
    next()
}

export default LoginRoute
