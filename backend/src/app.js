require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const projectsRoutes = require('./routes/projects');
const messagesRoutes = require('./routes/messages');
const educationRoutes = require('./routes/education');
const experiencesRoutes = require('./routes/experiences');
const skillsRoutes = require('./routes/skills');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experiences', experiencesRoutes);
app.use('/api/skills', skillsRoutes);


const PORT = process.env.PORT || 4000;
app.get('/api/test', (req, res) => {
  res.json({ message: 'API OK' });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));