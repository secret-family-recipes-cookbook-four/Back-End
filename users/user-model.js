const db = require('../data/dbConfig')

module.exports = {
    add,
    find,
    findByUser, 
    usersRecipes,
    usersById
};

function find(filter) {
    return db('users').where(filter);
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return usersById(id);
}

function findByUser(username) {
    return db('users')
    .where(username)
    .first();
}

function usersById(id) {
    return db('users')
        .where({ id })
        .first();
}

function usersRecipes(id) {
    return db('recipes as r')
    .select('r.id','r.title', 'r.cooks_name', 'r.ingredients', 'r.instructions', 'r.category')
    .where('r.user_id', id)
    // .orderBy('r.user_id', id);
}