import * as express from 'express';
import { Request, Response } from 'express';

const app = express();

// Middleware to log request time
app.use((req: Request, res: Response, next: Function) => {
  console.log('Request received at:', new Date().toISOString());
  next();
});

// Route: Home
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Route: About
app.get('/about', (req: Request, res: Response) => {
  res.send('This is the About page');
});

// Route: Users
app.get('/users', (req: Request, res: Response) => {
  // Simulated data
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
  ];

  res.json(users);
});

// Route: User by ID
app.get('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  // Simulated data
  const user = { id: userId, name: 'User ' + userId };

  res.json(user);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error('Error:', err);
  res.status(500).send('Something went wrong');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
