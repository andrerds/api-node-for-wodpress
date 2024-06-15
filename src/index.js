const express = require('express');
const planosRoutes = require('./routes/planosRoutes');
const authenticateAPIKey = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/planos', authenticateAPIKey, planosRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
