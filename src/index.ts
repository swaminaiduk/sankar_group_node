import app from './App';
import config from './config/app';
import './database';

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
