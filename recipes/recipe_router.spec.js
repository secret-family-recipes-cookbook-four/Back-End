const request = require('supertest');
const server = require('../api/server.js');
//test the get all recipes
describe('GET /recipes to not display without auth', () => {
    it('should return 401', () => {
        return request(server)
            .get('/api/recipes')
            .then(res => {
                expect(res.status).toBe(401)
            })
    })

    it('should return JSON', function() {
        return request(server).get('/api/recipes')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
    })
})


//test new recipe for user
describe('POST new recipe to not work without auth', () => {
    it('should return 401', () => {
        return request(server)
            .post('/api/recipes/:id/user')
            .then(res => {
                expect(res.status).toBe(401)
            })
    })

    it('should return JSON', function() {
        return request(server).get('/api/recipes/:id/user')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
    })
})


//test recipe by id
describe('GET recipe by id to not work without auth', () => {
    it('should return 401', () => {
        return request(server)
            .get('/api/recipes/:id')
            .then(res => {
                expect(res.status).toBe(401)
            })
    })

    it('should return JSON', function() {
        return request(server).get('/api/recipes/:id/user')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
    })
})


//test for recipe for specific user
describe('GET recipe for specific user to not work without auth', () => {
    it('should return 401', () => {
        return request(server)
            .get('/api/recipes/:id/user')
            .then(res => {
                expect(res.status).toBe(401)
            })
    })

    it('should return JSON', function() {
        return request(server).get('/api/recipes/:id')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
    })
})


//test update recipe
describe('PUT  update recipe to not work without auth', () => {
    it('should return 401', () => {
        return request(server)
            .put('/api/recipes/:id')
            .then(res => {
                expect(res.status).toBe(401)
            })
    })

    it('should return JSON', function() {
        return request(server).get('/api/recipes/:id')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
    })
})


//test delete
describe('DELETE recipe to not work without auth', () => {
    it('should return 401', () => {
        return request(server)
            .post('/api/recipes/:id')
            .then(res => {
                expect(res.status).toBe(401)
            })
    })

    it('should return JSON', function() {
        return request(server).get('/api/recipes/:id')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
    })
})