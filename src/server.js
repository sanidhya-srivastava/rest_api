import express from "express";
import helmet from "helmet";
import { rateLimit } from 'express-rate-limit'
import compression from 'compression';

import userRoutes from './user.routes.js';
import mainRoutes from './main.routes.js';


const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})

const app = express();
const port = 3000;

app.use(compression())
app.use(limiter);
app.use(express.json());
app.use(helmet());

app.use('/v1',mainRoutes)
app.use('/v1/user',userRoutes)

app.listen(port, () =>  {
    console.log(`server started on http://localhost:${port}`);
})