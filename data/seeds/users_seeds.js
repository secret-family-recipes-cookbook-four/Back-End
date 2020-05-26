
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first_name: 'test', last_name: 'test', email: 'test@gmail.com', username: 'test', password: 'password'},
        {id: 2, first_name: 'nancy', last_name: 'grandma', email: 'grandma@gmail.com',username: 'grandma', password: 'ilovemygrandkids'},
        {id: 3, first_name: 'matt', last_name: 'kearn', email: 'matt@gmail.com',username: 'mattk', password: 'pass'}
      ]);
    });
};
