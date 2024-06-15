require('dotenv').config();

const authenticateAPIKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  console.log('Received API Key:', apiKey);
  if (apiKey && apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Invalid API Key' });
  }
};

module.exports = authenticateAPIKey;
