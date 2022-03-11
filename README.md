<div id="top"></div>
<!--
***
*** This readme template was inspired by: https://github.com/othneildrew/Best-README-Template/
***
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- ABOUT THE PROJECT -->
## RESTful API Using Express.js

Welcome to the _GitHub repository_ of my fifth back-end project, **Store Manager**!
Here you can find information about the project's development, such as which technologies were used, how to install and run the project, usage and more.

This back-end application was developed during my time at [Trybe](https://www.betrybe.com/) to practice the lessons learned on Express.js and REST architecture. It also uses a _multi-layered architecture_ — which in this case, are the _model_, _service_ and _controller_ layers.
This API is a sales management system, where you can create, view, delete and update products and sales. 

During the development I was able to:

* Understand the function of the **Model layer**;
* Delegate specific responsibilities to the **Model layer**;
* Connect my application to different **databases**;
* Improve the **maintainability** and **reusability** of my code;
* Understand and apply the **REST** constraints;
* Write **unit tests** for my modules using Chai, Mocha and Sinon;
* Write intuitive API signatures;

<br>

---

### Endpoints

A list of all endpoints and supported methods.

* **/products** - Using the `POST` HTTP method, allows the user to create a product with the following JSON structure:
```
{
  "name": "product_name",
  "quantity": "product_quantity"
}
```

The user may also list all products using the `GET` HTTP method;

<br />

* **/products/:id**

  * Using the `PUT` HTTP method, allows the user to edit a product with the provided `id` param and the following JSON structure:
  ```
  {
    "name": "new_product_name",
    "quantity": "new_product_quantity"
  }
  ```

  * The owner of the post may also delete a product using the `DELETE` HTTP method.

<br />

* **/sales** - Using the `POST` HTTP method, allows the user to create (multiple) sales with the following JSON structure:
```
[
  {
    "product_id": "product_id",
    "quantity": "product_quantity",
  }
]
```

The user may also list all sales using the `GET` HTTP method;

<br />

* **/sales/:id**

  * Using the `PUT` HTTP method, allows the user to edit a sale with the provided `id` param and the following JSON structure:
  ```
  [
    {
      "product_id": "id",
      "quantity": "new_quantity"
    }
  ]
  ```

  * The owner of the post may also delete a sale using the `DELETE` HTTP method.

<br />

### Tables

The MySQL schema will contain three tables: **products**, **sales** and **sales_products** (N:N).

<br />

---

### Built With

List of major frameworks/libraries used to bootstrap this project:

* [Express.js](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/) - database
* [Joi](https://joi.dev/) - error handling

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/pedrotrasfereti/store-manager.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the server
   ```sh
   npm start
   ```
4. Visit `http://localhost:3000/` on your browser


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Pedro Trasfereti - [LinkedIn](https://www.linkedin.com/in/pedro-trasfereti/) - pedrotrasfereti@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

List of resources I find helpful and would like to give credit to:

* [ESLint](https://eslint.org/) - javascript linter
* [Img Shields](https://shields.io) - readme
* [Nodemon](https://nodemon.io/) - development
* [Dotenv](https://www.npmjs.com/package/dotenv) - development

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/pedrotrasfereti/store-manager/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/pedrotrasfereti/store-manager/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/pedrotrasfereti/store-manager/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/pedrotrasfereti/store-manager/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/pedro-trasfereti/
