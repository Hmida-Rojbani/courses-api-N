require('./db-conn');
const express = require('express');
const port = process.env.PORT || 3000;
const course_router = require('./routers/courses')

const app = express();
app.use(express.json());
app.use('/api/courses',course_router);

app.listen(port,()=> console.log(`Server on ${port}`));
