import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    publicPath: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, routes, publicPath = 'public' } = options;
        this.port = port;
        this.routes = routes;
        this.publicPath = publicPath;
    }

    async start() {

        //*middlewares

        /*middleware de express para parsear la info del body y convertir en json
        cualquier petición que pase por mi servidor pasara por este middleware, por
        ejemplo si pasa el body se serializa como un json */
        this.app.use(express.json()); //para metodo post: raw
        this.app.use(express.urlencoded({ extended: true })); //para metodo post: x-www-form-urlencoded

        //*public folder
        this.app.use(express.static('public'));

        //*ruta api/todos
        // this.app.get('/api/todos', (req, res) => {
        //     res.json([
        //         { id: 1, name: 'milk', created: new Date() },
        //         { id: 2, name: 'bread', created: null },
        //         { id: 3, name: 'butter', created: new Date() },
        //     ])
        //     return;
        // })

        // ??????????????
        this.app.use(this.routes)


        //*curlquier ruta no definida va a pasar por aquí
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            // console.log(req.url)
            // res.send('hola mundo')
        })

        this.app.listen(this.port, () => {
            console.log('Server running');
        })
    }

}