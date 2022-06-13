
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/KaianFerreira/Book-Tracker">
    <img src="logo.png" alt="Logo" >
  </a>

  <h3 align="center">Book Tracker</h3>

  <p align="center">
    <br />
    <br />
    <br />
  </p>
</p>



<!--Tabela de conteúdo -->
<details open="open">
  <summary> Summary</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#made-with">Made with</a></li>
      </ul>
    </li>
    <li>
      <a href="#starting">Starting</a>
      <ul>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#running-the-project">Running the project</a></li>
      </ul>
    </li>
    <li><a href="#usage-example"> Usage examples</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contato">Contact</a></li>
    <li><a href="#resources">Resources</a></li>
  </ol>
</details>


## About the project

Simple project to track a list of books 

### Made with ❤️

* [Vuejs](https://vuejs.org/)
* [Nodejs](https://nodejs.org/en/)



<!-- GETTING STARTED -->
## Starting🚀

To run this project, a minimum knowledge of Javascript is required.

### Requirements
* Node.js - version 16.15.0 or above, see how [here](https://nodejs.org/en/download/).
* PostgresSQL - version 14.1 or above, see how to install postgres using docker [here](https://dev.to/shree_j/how-to-install-and-run-psql-using-docker-41j2)
* Text editor of your preference, but recomended is [Visual Studio Code](https://code.visualstudio.com/download)
* Terminal of your preference, but recomended is [cmder](https://code.visualstudio.com/docs/editor/integrated-terminal#_can-i-use-cmders-shell-with-the-terminal-on-windows) if you use windows

### Running the project

1. On root folder, you'll go to the `backend` folder and then run in your terminal the following command: ``npm install``
2. After the comand finish you'll need to create two `.env` files with the follwing name: 
`.env` and `.env.test`.
*PS:(For security reasons the ```.env``` file inst in the repository)*
3. Make sure that you created a database on postgres for the project. If you want to use test script you'll need to create a database for tests too.
4. The content of those files must follow the example file named `example-env`
5. Now for the frontend you'll need to do the same thing as first step but on folder `frontend`
*PS: on frontend we have some .env files that contain the baseURL for our api on localhost:3000*
6. After installing all dependecies you can run the project by opening two terminals, one for backend in `backend` folder and other for frontend on `frontend` folder.
7. On backend terminal run the following command: `npm run start`, if everything is setup properly you should see `info: Server listening on port 3000 ` on terminal
8. On frontend terminal just run `npm run dev` and if everything is setup properly you should see 
	`DONE  Compiled successfully in 40186ms`
	 `App runing at: - Local http://localhost:8080`
9. Then go to http://localhost:8080 and the project should be running on this addres by default.

### Run unit test
  ```npm run test```

### Database
If you wanna take a look to the Database Schema you can look on the folder `backend/migrations`. There will be all tables used in this project
<!-- USAGE EXAMPLES -->
## Usage examples

You can use this project to store you current book reading list so you can track when, and what is your rating about the book




<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Kaian Santos - kaianfsantos@gmail.com
Linkedin - https://www.linkedin.com/in/kaianf/


<!-- ACKNOWLEDGEMENTS -->
## Resources

##### frontend
* [Vue.Js](https://vuejs.org/)
* [Vue router](https://router.vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Sass](https://sass-lang.com/)
* [Vuetify](https://vuetifyjs.com)
* [Moment](https://momentjs.com/)

##### backend
* [Webpack](https://webpack.js.org/)
* [Node.js](https://nodejs.org/en/)
* [Jest](https://jestjs.io/)
* [Express](http://expressjs.com/)
* [Joi](https://joi.dev/)
* [Knex](http://knexjs.org/)
* [Winston](https://github.com/winstonjs/winston#readme)

