const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Token validation function
function validateToken(token) {
  if (!token) return false;

  const tokens = router.db.get('tokens').value() || [];
  const tokenData = tokens.find(t => t.token === token);

  if (!tokenData) return false;

  // Check if token is expired
  const now = new Date();
  const expiresAt = new Date(tokenData.expiresAt);

  if (now > expiresAt) {
    // Remove expired token
    const updatedTokens = tokens.filter(t => t.token !== token);
    router.db.set('tokens', updatedTokens).write();
    return false;
  }

  return tokenData;
}

// Custom login endpoint
server.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user in database
  const users = router.db.get('users').value();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Generate a simple token
    const token = `fake-jwt-token-${Date.now()}-${user.id}`;

    // Get existing tokens
    const tokens = router.db.get('tokens').value() || [];

    // Check if token already exists for this user
    const existingTokenIndex = tokens.findIndex(t => t.userId === user.id);

    if (existingTokenIndex !== -1) {
      // Update existing token
      tokens[existingTokenIndex] = {
        token: token,
        userId: user.id,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      };
    } else {
      // Create new token
      tokens.push({
        token: token,
        userId: user.id,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      });
    }

    // Save tokens back to database
    router.db.set('tokens', tokens).write();

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

// Logout endpoint to remove token
server.post('/logout', (req, res) => {
  const token = req.headers.authorization;
  const { userid } = res?.body;

  if (token) {
    // Remove token from database
    const tokens = router.db.get('tokens').value() || [];
    const updatedTokens = tokens.filter(t => t.userId !== userid);
    router.db.set('tokens', updatedTokens).write();
  }

  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// Get current user info based on token
server.get('/me', (req, res) => {
  const token = req.headers.authorization;

  console.log("User token : ", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token provided'
    });
  }

  const tokenData = validateToken(token);

  if (!tokenData) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }

  // Find user from database
  const users = router.db.get('users').value();
  const user = users.find(u => u.id === tokenData.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  // Return user info (excluding password)
  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      // Add any other user fields you want to expose
      ...(user.avatar && { avatar: user.avatar }),
      ...(user.createdAt && { createdAt: user.createdAt })
    }
  });
});


server.get('/dashboard/stats', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token provided'
    });
  }

  const tokenData = validateToken(token);

  if (!tokenData) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }

  // Find user from database
  const dashbaordStatsData = router.db.get('dashbaordStats').value();

  if (!dashbaordStatsData) {
    return res.status(404).json({
      success: false,
      error: 'No data found'
    });
  }

  // Return user info (excluding password)
  res.json({
    success: true,
    data: dashbaordStatsData
  });
});

// Protect other routes
server.use((req, res, next) => {
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/logout', '/register', '/me'];
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token provided'
    });
  }

  const tokenData = validateToken(token);

  if (!tokenData) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }

  // Add user info to request for use in routes
  const users = router.db.get('users').value();
  req.user = users.find(u => u.id === tokenData.userId);

  next();
});

// Get current user profile (alternative to /me)
server.get('/profile', (req, res) => {
  res.json({
    success: true,
    user: req.user ? {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    } : null
  });
});

// Clean up expired tokens periodically
setInterval(() => {
  const tokens = router.db.get('tokens').value() || [];
  const now = new Date();
  const validTokens = tokens.filter(t => new Date(t.expiresAt) > now);
  router.db.set('tokens', validTokens).write();
}, 60 * 60 * 1000); // Run every hour

server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running on port 5000');
});