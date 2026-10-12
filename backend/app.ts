import express from 'express';
import logger from 'morgan';
import expensesRouter from './routes/expenses.ts';
import cors from 'cors';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:5173', /\.onrender\.com$/]
    })
);
// Route pour tester le serveur
app.get('/ping', (req, res) => {
    res.sendStatus(204);
});

// Connexion du routeur des dépenses
app.use('/api', expensesRouter);

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});

export default app;
