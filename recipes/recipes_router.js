const express = require('express');
const router = express.Router();
const db = require('../recipes/recipes_model')

const Users = require('../users/user-model')
const Recipes = require('./recipes_model');


//get all
router.get('/', (req, res) => {
    Recipes.getAllRecipes()
        .then(recipes => {
            res.status(200).json(recipes);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errMessage: 'couldnt get recipes', message: err.message })
        })
});

//new recipe for a user
router.post('/:id/user', validate, (req, res) => {
    const id = req.params.id;
    req.body.user_id = id;
    const recipeData = req.body;

    Recipes.insert(recipeData)
     .then(newRecipe => {
        res.status(200).json({ newRecipe });
    })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'There was an error herrr', message: err.message });
    });
});

//recipe by id
router.get("/:id", validateRecipeId, (req, res) => {
    const recipeID = req.params.id;
  
    db.byId(recipeID)
      .then(specificRecipe => {
        if (specificRecipe) {
          res.status(200).json(specificRecipe);
        } else {
          res.status(500).json({
            error: "cant find recipe"
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'recipe by id no worky', message: err.message });
      });
  });

   //re4cipe for spceifc user
   router.get('/:id/user', validateUserId, (req, res) => {
     const id = req.params.id; 
console.log(id)
      Users.usersRecipes(id)
     .then(recipes => {
          res.status(200).json(recipes);
      })
      .catch(err => {
        
          res.status(500).json({ message: err.message });
      })
  });

//update
router.put('/:id', validateRecipeId, (req, res) => {
    const id = req.params.id;
    const recipeData = req.body;

    Recipes.update(id, recipeData)
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'The recipe could not be modified', message: err.message });
    })
});

//delete
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Recipes.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(200).json({deleted});
        } else {
            res.status(404).json({ error: 'Failed to delete', message: err.message });
        }
    })
})


//middleware
function validate(req, res, next) {
    const data = req.body;
    if (!data) { res.status(400).json({ error: 'need more info' })
    }
     else if (!data.title) { res.status(400).json({ error: 'need title' })
    }
     else if (!data.ingredients) { res.status(400).json({ error: 'need ingredients' })
    }
     else if (!data.instructions) { res.status(400).json({ error: 'need instructions' })
    }
     else if (!data.category) { res.status(400).json({ error: 'need category' }) 
    }
     else if (!data.user_id) { res.status(400).json({ error: 'need user_id' })
    }
     else {
        next();
    }
}

function validateRecipeId(req, res, next) {
    const recipeID = Number(req.params.id);
    if (typeof recipeID === "number") {
      next();
    } else {
      res.status(404).json({
        message: "The recipe with the specific ID does not exist"
      });
    }
  }

  function validateUserId(req, res, next) {
    const id = req.params.id;
      Users.usersById(id) 
      .then(user => {
          if (user) {
              req.user = user;
              next();
          } else {
              res.status(404).json({ message: 'invalid user id' })
          }
      })
      .catch(error => {
            res.status(500).json({ error: 'The user information could not be retrieved.' })
      })   
}

module.exports = router;