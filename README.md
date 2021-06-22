# Weblists (server)

Create and share a list with anyone on the web, without creating an account.

_Create your first list here: [www.weblists.io](https://www.weblists.io)_

## Technology

This is a node.js web server that uses Fastify to define REST endpoints for the client to communicate with. You find the code for the frontend [here](https://github.com/albingroen/frontend-lists).

- REST framwork: **Fastify**
- Database: **PostgresQL**
- ORM: **Prisma**

## Developing

Start by forking this repository, and then cloning the fork to your computer. Since this is a JavaScript app, you have to start by installing the dependencies specified in `package.json`. To do this, you run the following command.

    yarn

If you'd rather use npm, you can run the following command instead.

    npm install

---

### Starting the project

To start the project, run the dev command.

    yarn dev

Same here, if you want to use npm, you can run the following command instead.

    npm run dev

## Contributing

Pull requsts are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests & documentation as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
