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

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) return cachedConnection;
  if (mongoose.connection.readyState === 1) {
    cachedConnection = mongoose;
    return cachedConnection;
  }
  try {
    cachedConnection = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // Timeout quickly if IP is blocked
    });
    console.log('Connected to MongoDB via mongoose');
    return cachedConnection;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

const AppDataSchema = new mongoose.Schema({
  properties: Array,
  agents: Array,
  testimonials: Array,
  categories: Array,
  hero: Object,
  locations: Array,
  propertyTypes: Array,
  siteStats: Object,
  companyInfo: Object,
  priceRanges: Array
}, { timestamps: true });

// Check if model exists to avoid OverwriteModelError in serverless environments
const AppData = mongoose.models.AppData || mongoose.model('AppData', AppDataSchema);

// GET /api/data - Fetch all application data
app.get('/api/data', async (req, res) => {
  try {
    await connectDB();
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    let data = await AppData.findOne();
    if (!data) {
      data = new AppData({
        properties: [], agents: [], testimonials: [], categories: [], hero: {}, locations: [], propertyTypes: [], siteStats: {}, companyInfo: {}, priceRanges: []
      });
      await data.save();
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Server error: ' + (error.message || error.toString()) });
  }
});

// POST /api/data - Save/Update application data
app.post('/api/data', async (req, res) => {
  try {
    await connectDB();
    const newData = req.body;
    let data = await AppData.findOne();
    
    if (data) {
      if (newData.properties) data.properties = newData.properties;
      if (newData.agents) data.agents = newData.agents;
      if (newData.testimonials) data.testimonials = newData.testimonials;
      if (newData.categories) data.categories = newData.categories;
      if (newData.hero) data.hero = newData.hero;
      if (newData.locations) data.locations = newData.locations;
      if (newData.propertyTypes) data.propertyTypes = newData.propertyTypes;
      if (newData.siteStats) data.siteStats = newData.siteStats;
      if (newData.companyInfo) data.companyInfo = newData.companyInfo;
      if (newData.priceRanges) data.priceRanges = newData.priceRanges;
      
      data.markModified('properties'); // Ensure mongoose detects changes in arrays
      data.markModified('agents');
      data.markModified('testimonials');
      data.markModified('categories');
      data.markModified('hero');
      data.markModified('locations');
      data.markModified('propertyTypes');
      data.markModified('siteStats');
      data.markModified('companyInfo');
      data.markModified('priceRanges');

      await data.save();
    } else {
      data = new AppData(newData);
      await data.save();
    }
    
    res.json({ success: true, message: 'Data updated successfully', data });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Server error: ' + (error.message || error.toString()) });
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
