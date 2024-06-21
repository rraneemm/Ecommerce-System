<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
  
# E-Commerce Simple APIs with NestJS

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


- This project was an assignment required to implement very basic APIs for an e-commerce app.
- It includes basic CRUD operations for two main entities: cart and order.
- It is beginner-friendly, focusing on learning Nest.js and Swagger.
- The project was completed within two days.

### Resources to Learn Nest.js

To learn more about Nest.js, you can check out the following resources:

- [Nest.js Official Documentation](https://docs.nestjs.com/)
- [YouTube Tutorial: Nest.js Crash Course](https://youtu.be/GHTA143_b-s?si=TSMXYOfi9utLHTYb)

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Docker Setup

To run the application with Docker Compose, follow these steps:

1. **Clone the repository:**

   ```bash
   $ git clone https://github.com/nestjs/nest.git
   $ cd nest
   ```

2. **Build and start the Docker containers:**

   ```bash
   $ docker-compose up -d
   ```

   This command will start the application containers in detached mode.
   
  3. **Access Swagger UI:**

     Once the application is running, you can access the Swagger UI to explore and test the API endpoints. The Swagger UI is typically available at:

     [http://localhost:3000/api](http://localhost:3000/api)
  

### Cloning Steps

To clone this repository and get started, use the following commands:

```bash
$ git clone https://github.com/nestjs/nest.git
$ cd nest
```

### Running Environment

Make sure you have Node.js and pnpm installed. Then, install dependencies and start the application:

```bash
$ pnpm install
$ pnpm run start:dev
```


## Testing API Endpoints

You can test the API endpoints using Postman. Import the provided collection into Postman and start testing:

1. Start the Nest application.
2. Open Postman.
3. Import the collection `NestJS_API.postman_collection.json` located in the `postman` directory.
4. Test the endpoints as needed.

## Database Diagram
This is a diagram that showcases the database relations and entities.

**Database Diagram** at `db-diagram/e-commerce assessment.pdf`

## Contribution

This project welcomes contributions from anyone interested in learning or improving their skills with Nest.js. It's especially beginner-friendly, offering opportunities for refactoring practice and getting acquainted with the framework.

### How to Contribute

1. Fork the repository and clone it locally.
   
   ```bash
   $ git clone https://github.com/your-username/nest.git
   $ cd nest
   ```

2. Create a new branch for your changes.

   ```bash
   $ git checkout -b feature/your-feature-name
   ```

3. Make your modifications and improvements, focusing on refactoring or enhancing the existing codebase.

4. Test your changes thoroughly.

5. Commit your changes and push to your forked repository.

   ```bash
   $ git add .
   $ git commit -m "Add your commit message here"
   $ git push origin feature/your-feature-name
   ```

6. Open a pull request against the `main` branch of the original repository.

### Ways to Contribute

- Refactor existing code for clarity and maintainability.
- Add missing comments or documentation.
- Implement small features or enhancements.
- Improve test coverage or add new tests.

### Contribution Guidelines

- Follow the existing code style and conventions.
- Ensure your changes do not introduce linting errors or warnings.
- Write clear commit messages and PR descriptions.

By contributing to this project, you'll gain valuable experience with Nest.js and software development best practices. Don't hesitate to ask questions or seek guidance if you're new to contributing to open-source projects.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- [Raneem Yasser](ranyseleem@gmail.com)

  
## License

Nest is [MIT licensed](LICENSE).
