import Koa from 'koa';
import 'dotenv/config';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import routeMiddleWare from './app';

const app = new Koa();

/* 允许跨域 */
const corsMiddleware = cors({
  origin: ({ request }) => {
    console.log('request.header.origin', request.header.origin);
    return request.header.origin || 'Null';
  },
  credentials: true
});

/* 允许跨域 中间件 */
app.use(corsMiddleware);

/* body 解析中间件 */
app.use(bodyParser({ jsonLimit: '50mb' }));

/* 路由信息 */
app.use(routeMiddleWare);

app.listen(4000, () => console.log('💙💙💙💙💙💙💙', '监听在4000端口', '💙💙💙💙💙💙💙'));
