const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom login endpoint
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find user in database
  const users = router.db.get('users').value();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Generate a simple token (in production, use proper JWT)
    const token = `fake-jwt-token-${Date.now()}-${user.id}`;
    
    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Protect other routes (optional)
server.use((req, res, next) => {
  if (req.path === '/login') {
    return next();
  }
  
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // Simple token validation (in production, use proper JWT verification)
  if (!token.includes('fake-jwt-token')) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  next();
});

server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running on port 5000');
});