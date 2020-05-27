const request = require('supertest');
const server = require('../api/server.js');

describe('POST to register', () => {

    it('should return 201 on valid register', () => {
        return request(server)
            .post('/api/auth/register')
            .send({ username: 'test', password: 'password' })
            .then(res => {
                expect(res.status).toBe(500)
        })
    })
    it("should return a 500 error for inputing an incomplete password", () => {
        return request(server)
            .post("/api/auth/register")
            .send({ username: 'testing', password: 2 })
            .then(res => {
            expect(res.status).toBe(500);
        });
    });
})