import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/todos', TodoRoutes.routes);
        // router.use('/api/user', UserRoutes.routes);
        // router.use('/api/client', ClientRoutes.routes);

        return router;

    }


}