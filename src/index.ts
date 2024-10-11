import express from 'express';
import taskApi from './api/taskApi';

const app = express();
app.use(express.json());
app.use('/api', taskApi);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});