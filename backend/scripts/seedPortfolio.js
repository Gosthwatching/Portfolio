require('dotenv').config();
const connectDB = require('../src/db/connection');

// Import models
const Experience = require('../src/models/experience');
const Skill = require('../src/models/Skill');
const Project = require('../src/models/Project');
const Education = require('../src/models/Education');

async function seedData() {
  try {
    await connectDB();
    console.log('🌱 Seeding MongoDB...');

    // Clear existing data (optional)
    await Experience.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Education.deleteMany({});

    // Seed Experiences
    const experiences = [
      {
        company: 'Entreprise A',
        position: 'Développeur Full Stack',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2022-12-31'),
        description: 'Développement d\'applications web avec React et Node.js'
      },
      {
        company: 'Entreprise B',
        position: 'Développeur Frontend',
        startDate: new Date('2023-01-01'),
        description: 'Création d\'interfaces utilisateur modernes'
      }
    ];
    await Experience.insertMany(experiences);
    console.log('✓ Experiences seeded');

    // Seed Skills
    const skills = [
      { name: 'JavaScript', category: 'Langage', level: 'Avancé' },
      { name: 'React', category: 'Framework', level: 'Avancé' },
      { name: 'Node.js', category: 'Backend', level: 'Intermédiaire' },
      { name: 'MongoDB', category: 'Base de données', level: 'Intermédiaire' }
    ];
    await Skill.insertMany(skills);
    console.log('✓ Skills seeded');

    // Seed Projects
    const projects = [
      {
        title: 'Portfolio Personnel',
        description: 'Site web portfolio avec React et Node.js',
        link: 'https://github.com/user/portfolio'
      },
      {
        title: 'Application Todo',
        description: 'Application de gestion de tâches',
        link: 'https://github.com/user/todo-app'
      }
    ];
    await Project.insertMany(projects);
    console.log('✓ Projects seeded');

    // Seed Education
    const educations = [
      {
        school: 'Université XYZ',
        degree: 'Master en Informatique',
        year: '2020'
      }
    ];
    await Education.insertMany(educations);
    console.log('✓ Education seeded');

    console.log('🎉 Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedData();