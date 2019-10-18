const server = require('./server.js')

const request = require('supertest')

describe('This is to make sure we are using the right environment!', () => {
    it('Checks that DB_ENV = test!', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
})

describe('This is to test our users endpoint!', () => {
    it('Checks that we can log in!', async () => {
        const response = await request(server).post('/api/login').send({username: "Test Admin", password: "pass"})
        expect(response.status).toBe(200)
    })
    it('gets our list of users!', async () => {
        const response = await request(server).post('/api/login').send({username: "Test Admin", password: "pass"})
        const users = await request(server).get('/api/users').set('Authorization', response.body.token)
        expect(users.body)
    })
    it('denies you if you are not in the admin department', async () => {
        const response = await request(server).post('/api/login').send({username: "Test", password: "pass"})
        const users = await request(server).get('/api/users').set('Authorization', response.body.token)
        expect(users.body.message).toBe("You do not have administrative privileges to view this endpoint!")
    })
})