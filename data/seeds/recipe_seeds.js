
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {id: 1, title: 'Cake', ingredients: 'cake mix, egg, water', directions: 'Preheat the oven. mix ingredients togther in a bowl. pour batter into a pan and bake for 25 minutes.', category: 'desert'},
        {id: 2, title: 'Buger', ingredients: 'ground beef, salt, pepper', directions: 'season the ground beef with the salt and pepper. heat pan on medium, cook for 5 minutes on each side.', category: 'dinner'},
        {id: 3, title: 'Pancakes', ingredients: 'pancake mix, egg, milk', directions: 'mix together indgrients in a bowl. heat pan on medium, pour 1/4 cup of batter onto pan and cook 2 miuntes on each side', category: 'breakfast'},
      ]);
    });
};
