
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
       tbl.increments();
       
       tbl.string('first_name', 64).notNullable();
       tbl.string('last_name', 64).notNullable();
       tbl.string('email', 128).notNullable().unique();
       tbl.string('username', 64).notNullable().unique();
       tbl.string('password', 64).notNullable()
       
    })

    .createTable('recipes', tbl => {
        tbl.increments();
        tbl.string('title', 64).notNullable().index();
        tbl.string('cooks_name', 64).index();
        tbl.string('ingredients', 720).notNullable();
        tbl.string('instructions', 720).notNullable();
        tbl.string('category', 64).notNullable().index();
        tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  
    })
};
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('recipes')
    .dropTableIfExists('users')
};
