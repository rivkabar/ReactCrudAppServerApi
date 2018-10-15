// server.js
const jsonServer = require('json-server');
const generate = require('./generate');
const middlewares = jsonServer.defaults();
const server = jsonServer.create();
const router = jsonServer.router(generate());


server.get('/reset', (req, res) => {
  const data = generate();
  router.db.setState(data);
  res.send('DB has been restored to its initial state 🎉');
});

server.use(middlewares);
server.use(router);

const PORT = 4500;
server.listen(PORT, () => {
  console.log(`Server is on http://localhost:${PORT}`);
});