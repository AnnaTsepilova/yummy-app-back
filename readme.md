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

| HTTP метод | Endpoint                | Описание                        |
|-----------|------------------------|--------------------------------|
| POST      | `/auth/signup`           | User registration       |
| POST      | `/auth/signin`           | User login    |
| POST      | `/auth/logout`           | User logout       |
| POST      | `/auth/refresh`          | User refresh          |
| GET       | `/auth/:userId:`         | Get user By Id    |
| PUT       | `/auth/:userId`         | Update user by Id    |
| POST      | `/auth/avatars`          | Upload a file  |


### Recipes Endpoints

| Method | Endpoint                | Description                   |
| ------ | -----------------------| ----------------------------- |
| GET    | `/recipes/category-list` | Get category list             |
| GET    | `/recipes/main-page`     | Get main page                  |
| GET    | `/recipes/:category`    | Get recipes by category       |
| GET    | `/recipes/id/:id`       | Get recipe by id              |
| GET    | `/recipes/`              | Get user's recipes            |
| GET    | `/recipes/search/recipes`| Search recipe by title/ingredient |
| POST   | `/recipes/add`           | Add new Recipe                 |
| DELETE | `/recipes/remove/:id`   | Remove recipe by id            |




### Shoping-list endpoints      

HTTP Method | Endpoint                       | Description
-----------| ------------------------------| ----------------------------
GET        | `/shopping-list/`             | Get shopping-list
POST       | `/shopping-list/add`          | Add to shopping-list
DELETE     | `/shopping-list/remove/:id`  | Delete ingredients




### Ingredients endpoints

| HTTP Method                | Endpoint             | Description |
| -----------------------| ------------------------| ----------- |
|GET  | `/ingredients/list`     | Get Ingredients list         |
|GET  | `/ingredients/:title` | Get recipes by ingredient         |




### Recipe's favorite endpoints


| HTTP Method   | Endpoint   | Description   |
| -------------| ---------| --------------|
|GET    | `/favorite/list`   | Get favorite recipe's   |
|POST   |` /favorite/:id`   | Add recipe to favorite   |
|PUT    | `/favorite/:id`   | Update recipe in favorite   |




### Subscribe endpoints


| HTTP Method      | Endpoint          | Description |
|---------------|----------------------|-------------|
| POST | `/subscribe/`    | Subscribe for news        |
| GET | `/subscribe/remove/:email` | Unsubscribe for news         |


### Popular-recipe endpoints


HTTP Method | Endpoint | Description|
------------|----------|------------|
GET         | `/popular-recipe/` | Get popular recipes|



[![Swagger](https://res.cloudinary.com/dbcvume5y/image/upload/v1681079866/2023-04-10_013619_zh7eij.jpg)](https://y-3wt8.onrender.com/api-docs/)


**Any questions you may have about the project can be answered by our team - just write us!**

[Front-end Part](https://github.com/AnnaTsepilova/yummy-app-front)

</div>