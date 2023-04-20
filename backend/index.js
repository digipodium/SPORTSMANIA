const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const gameRouter = require('./routers/gameRouter');
const tournamentRouter = require('./routers/tournamentRouter');
const playerRouter = require('./routers/playerRouter');
const utilRouter = require('./routers/utils');
const matchRouter = require('./routers/matchRouter');
const teamRouter = require('./routers/teamRouter');

const cors = require('cors');
const { PORT } = require('./config');

const app = express();

app.use(cors(
    {
        origin : 'http://localhost:3000',
        credentials : true
    }
));
app.use(express.json());
// app.use(express.urlencoded({extended : true}));
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/game', gameRouter);
app.use('/tournament', tournamentRouter);
app.use('/player', playerRouter);
app.use('/match', matchRouter);
app.use('/util', utilRouter);
app.use('/team', teamRouter);

app.use(express.static('./static/uploads'));

app.get('/', (req, res) => {
    console.log('Request at index');
    res.status(299).send('Working Perfectly!!');
})

app.listen(PORT, () => console.log(`Express server has started at ${PORT}`));