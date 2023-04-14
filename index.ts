import { app } from "./src/app"

var http = app.get('http');

const port = /* process.env.PORT || */ 3309;


http.listen(port, () => {
  console.log(`Servidor iniciado, porta ${port}... ☑`);
});