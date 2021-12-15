const express = require('express');
const server = express();
const router = require('./router');

//post 请求表单数据
server.use(express.urlencoded({ extended: true }))
//资源共享
const cors = require('cors')
server.use(cors());

//静态文件托管 ----  访问：http:localhost:8888/图片.jpg
server.use(express.static('upload'))

server.use('/api', router);

server.listen(8888, () => {
    console.log('server');
})