import Logger from '@harmonyjs/logger'
import EncryptionService from 'services/encryption'

const logger = Logger({
    name: 'Vehicles',
    configuration: {
        console: true,
    },
})

const VehicleList = async (server : any, opts : any, next: () => void) => {
    // curl -X GET "http://localhost:10000/vehicles" -H "Content-Type: application/json"  --data email:admin@swoopin.green -H "Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjRlNjBiZTcyNDVmZTRiNmI1NjIzMTciLCJuYW1lIjoiQWRtaW4iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjAxNzQyNTYzLCJleHAiOjE2MzMyNzg1NjN9.MXjgo1XGEflO9gU0EBl_QaqbKwjq6C8UJc_cxSJDAYj3swrYkmKjzTUAjIajwcKwWc76BgNRfJcALtybC92V5g" curl -X GET "http://localhost:10000/vehicles" -H "Content-Type: application/json"  --data password:xSsFoDBgizoNYxK2NxOlXvUkeLmpJ9UWdth/EC9a2atZzgadjoMK1dsLV/A= -H "Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjRlNjBiZTcyNDVmZTRiNmI1NjIzMTciLCJuYW1lIjoiQWRtaW4iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjAxNzQyNTYzLCJleHAiOjE2MzMyNzg1NjN9.MXjgo1XGEflO9gU0EBl_QaqbKwjq6C8UJc_cxSJDAYj3swrYkmKjzTUAjIajwcKwWc76BgNRfJcALtybC92V5g"
    server.route({
        preHandler: server.auth([server.authenticateAccount]),
        method: 'GET',
        url: '/vehicles',
        async handler(req: any, res: any) {
            res.send(200);
        },
    })
    next()
}

export default VehicleList;
