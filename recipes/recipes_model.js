const db = require('../database/dbConfig.js');

module.exports = {
    allRecipes,
    byId,
    insert,
    update,
    remove
}
function byId(id) {
    return db('recipes')
      .where({ id })
      .first();
  }


function allRecipes() {
    return db('recipes as r')
        .select('r.id', 'r.title', 'r.cooks_name', 'r.ingredients', 'r.instructions', 'r.category', 'r.user_id')
        .join('users as u', 'r.user_id', '=', 'u.id')
        .orderBy('r.user_id');
}


function insert(recipe) {
    return db('recipes')
        .insert(recipe, 'id')
        .then(ids => {
            const [id] = ids;

            return db('recipes')
                .where({ id })
                .first();
        });
}


function update(id, changes) {
    return db('recipes')
        .where('id', id)
        .update(changes)
        .then(count => {
            if (count > 0) {
                return getById(id);
            }
        })
}

function remove(id) {
    let deletedRecipe = {};
    db('recipes')
    .where({ id })
    .first()
    .then(recipe => {
        deletedRecipe = recipe;
    });
    return db('recipes')
        .where('id', id)
        .del()
        .then(count => {
            if (count > 0) {
                return deletedRecipe;
            }
        });
}