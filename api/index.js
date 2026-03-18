import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// URL encode the '@' character in the password if necessary
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Construction:Construction%40334@cluster0.8kr84vh.mongodb.net/constructionApp?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB via mongoose'))
  .catch(err => console.error('MongoDB connection error:', err));

const AppDataSchema = new mongoose.Schema({
  properties: Array,
  agents: Array,
  testimonials: Array,
  categories: Array,
  hero: Object,
  locations: Array,
  propertyTypes: Array
}, { timestamps: true });

// Check if model exists to avoid OverwriteModelError in serverless environments
const AppData = mongoose.models.AppData || mongoose.model('AppData', AppDataSchema);

// GET /api/data - Fetch all application data
app.get('/api/data', async (req, res) => {
  try {
    let data = await AppData.findOne();
    if (!data) {
      data = new AppData({
        properties: [], agents: [], testimonials: [], categories: [], hero: {}, locations: [], propertyTypes: []
      });
      await data.save();
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/data - Save/Update application data
app.post('/api/data', async (req, res) => {
  try {
    const newData = req.body;
    let data = await AppData.findOne();
    
    if (data) {
      data.properties = newData.properties || data.properties;
      data.agents = newData.agents || data.agents;
      data.testimonials = newData.testimonials || data.testimonials;
      data.categories = newData.categories || data.categories;
      data.hero = newData.hero || data.hero;
      data.locations = newData.locations || data.locations;
      data.propertyTypes = newData.propertyTypes || data.propertyTypes;
      await data.save();
    } else {
      data = new AppData(newData);
      await data.save();
    }
    
    res.json({ success: true, message: 'Data updated successfully', data });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the Express API for Vercel
export default app;
