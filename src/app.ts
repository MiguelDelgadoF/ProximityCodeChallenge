import * as express from 'express';
import bodyParser = require('body-parser');
import { routes } from "./router";
import { connect, closeDatabase, clearDatabase } from './db/dbHabler';
const app = express();


app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
    next();
});


app.use(express.static(__dirname));
app.use(express.json());

routes(app);

connect().then(async () => {
    app.listen(app.get("port"), () =>
        console.log(`App listening port ${app.get("port")}`),
    );
}).catch((err) => {
    console.log(err);
});



