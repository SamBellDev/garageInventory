import express, {Application, Request, Response} from 'express';
import expressHandlebars from 'express-handlebars';
const router = require('./router');

const app: Application = express()
const port: number = 5000

app.use(express.json())
app.use(express.static('public'))
app.engine('handlebars', expressHandlebars())
app.set('view engine', 'handlebars')

router(app)

app.listen(port, () => console.log('Server running'));