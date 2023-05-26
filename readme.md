 <div align="center">

# SO-YUMMY Backend Part
![SO-YUMMY](https://res.cloudinary.com/dbcvume5y/image/upload/v1681084557/20230410025245_pc5btv.png)
</div>

---

- A project app for recipe lovers, which can be accessed via authorization.

- The project is based on Node.js, Express, and MongoDB. The Cloudinary service is connected. The [documentation](https://y-3wt8.onrender.com/api-docs/) was created using the Swagger service.

- To run the project locally, follow these steps:

1. Clone the repository;
2. Install the dependencies;
3. Run the following command: `npm run dev`;
----

<div align="center">

### Auth Endpoints

| HTTP Method | Endpoint         | Description       |
|-------------|------------------|-------------------|
| POST        | `/auth/signup`   | User registration |
| POST        | `/auth/signin`   | User login        |
| POST        | `/auth/logout`   | User logout       |
| POST        | `/auth/refresh`  | User refresh      |
| GET         | `/auth/current`  | Get user info     |
| PUT         | `/auth`         | Update user info  |
| POST        | `/auth/avatars`  | Upload a file     |


### Recipes Endpoints

| HTTP Method | Endpoint                  | Description                          |
|-------------|---------------------------| -------------------------------------|
| GET         | `/recipes/category-list`  | Get category list                    |
| GET         | `/recipes/main-page`      | Get main page                        |
| GET         | `/recipes/:category`      | Get recipes by category              |
| GET         | `/recipes/id/:id`         | Get recipe by id                     |
| GET         | `/recipes/search`         | Search recipe by title or ingredient |
| GET         | `/recipes/popular`        | Get popular recipes                  |

### Own Recipes Endpoints

| HTTP Method | Endpoint                  | Description           |
|-------------|---------------------------| ----------------------|
| GET         | `/ownRecipes`            | Get user's recipes    |
| POST        | `/ownRecipes`            | Add new Recipe        |
| DELETE      | `/ownRecipes/:id`         | Remove recipe by id   |
| POST        | `/ownRecipes/recipeImage` | Upload recipe's image |

### Shopping-list endpoints

| HTTP Method | Endpoint                         | Description                           |
|-------------| ---------------------------------| --------------------------------------|
| GET         | `/shopping-list`                | Get shopping-list                     |
| POST        | `/shopping-list`                | Add to shopping-list                  |
| DELETE      | `/shopping-list/:shoppingListId` | Delete ingredients from shopping-list |

### Ingredients endpoints

| HTTP Method | Endpoint                       | Description               |
|-------------|--------------------------------| --------------------------|
| GET         | `/ingredients`            | Get Ingredients list      |
| GET         | `/ingredients/:ingredientTtl`  | Get recipes by ingredient |

### Recipe's favorites endpoints

| HTTP Method | Endpoint          | Description               |
|-------------| ------------------| --------------------------|
| GET         | `/favorites` | Get favorite recipe's     |
| POST        | `/favorites/:id`  | Add recipe to favorite    |
| DELETE      | `/favorites/:id`  | Delete recipe in favorite |

### Subscribe endpoints

| HTTP Method | Endpoint                   | Description          |
|-------------|----------------------------|----------------------|
| POST        | `/subscribe`               | Subscribe for news   |
| DELETE      | `/subscribe/:email`        | Unsubscribe for news |

[![Swagger](https://res.cloudinary.com/dbcvume5y/image/upload/v1681079866/2023-04-10_013619_zh7eij.jpg)](https://y-3wt8.onrender.com/api-docs/)

**Any questions you may have about the project can be answered by our team - just write us!**

[Front-end Part](https://github.com/AnnaTsepilova/yummy-app-front)

</div>