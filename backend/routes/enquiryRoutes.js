import express from 'express';

export function enquiryRoutes(db) {
  const router = express.Router();
  const collection = db.collection('enquiries');

  router.post('/', async (req, res) => {
    try {
      const { name, phone, email, notes, type, ...rest } = req.body;
      const doc = {
        name: name || 'Anonymous',
        phone: phone || '',
        email: email || '',
        notes: notes || '',
        type: type || 'General Enquiry',
        ...rest,
        status: 'NEW',
        createdAt: new Date(),
        source: 'Website',
      };
      const result = await collection.insertOne(doc);
      res.status(201).json({ success: true, id: result.insertedId.toString(), enquiry: doc });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

