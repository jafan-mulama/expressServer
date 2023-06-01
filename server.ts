import express, { Request, Response } from 'express';
import axios from 'axios';

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
app.get('/users', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;

    // Generate HTML table
    let table = `
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Address</th>
        
        </tr>`;

    for (const user of users) {
      table += `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}
              ${user.address.geo.lat}, ${user.address.geo.lng}
          </td>
         
        </tr>`;
    }

    table += '</table>';

    res.send(table);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Something went wrong');
  }
});

// Route: User by ID
app.get('/users/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = response.data;
    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Something went wrong');
  }
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
