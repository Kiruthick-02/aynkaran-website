// backend/controllers/companyController.js
import { ObjectId } from 'mongodb';

function parseJsonArray(value, fallback = []) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string' || !value.trim()) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function normalizePoints(arr) {
  return (Array.isArray(arr) ? arr : [])
    .filter((p) => p && String(p.text || p).trim())
    .map((p, i) => ({
      text: String(typeof p === 'string' ? p : p.text).trim(),
      order: typeof p?.order === 'number' ? p.order : i,
    }));
}

export class CompanyController {
  constructor(db) {
    this.col = db.collection('insurance_companies');
  }

  // GET /api/companies
  list = async (_req, res) => {
    try {
      const rows = await this.col.find({}).sort({ createdAt: -1 }).toArray();
      res.json(
        rows.map((c) => ({
          ...c,
          id: c._id.toString(),
          _id: c._id.toString(),
        }))
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // POST /api/companies  (multipart)
  create = async (req, res) => {
    try {
      const name = String(req.body.name || '').trim();
      if (!name) return res.status(400).json({ error: 'Company name is required' });

      const insuranceTypes = parseJsonArray(req.body.insuranceTypes, []);
      const descriptionPoints = normalizePoints(
        parseJsonArray(req.body.descriptionPoints, [])
      );

      const logoPath = req.files?.logo?.[0]
        ? `/uploads/companies/${req.files.logo[0].filename}`
        : req.file?.fieldname === 'logo'
          ? `/uploads/companies/${req.file.filename}`
          : null;

      // If using upload.fields([{ name: 'logo' }, { name: 'backgroundImage' }]):
      const logo =
        req.files?.logo?.[0]
          ? `/uploads/companies/${req.files.logo[0].filename}`
          : null;
      const backgroundImage =
        req.files?.backgroundImage?.[0]
          ? `/uploads/companies/${req.files.backgroundImage[0].filename}`
          : null;

      const doc = {
        name,
        registrationCode: req.body.registrationCode || 'N/A',
        type: req.body.type || insuranceTypes[0] || 'Life Insurance',
        insuranceTypes,
        address: String(req.body.address || '').trim(),
        contact: String(req.body.contact || '').trim(),
        status: req.body.status || 'Active',
        websiteVisibility: req.body.websiteVisibility || 'show',
        consultationEnabled: String(req.body.consultationEnabled) === 'true',
        descriptionPoints,
        stopStartDate: req.body.stopStartDate || null,
        stopEndDate: req.body.stopEndDate || null,
        stopReason: req.body.stopReason || '',
        logo,
        backgroundImage,
        policies: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await this.col.insertOne(doc);
      res.status(201).json({
        ...doc,
        id: result.insertedId.toString(),
        _id: result.insertedId.toString(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // PUT /api/companies/:id  (multipart)
  update = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid company id' });
      }

      const insuranceTypes = parseJsonArray(req.body.insuranceTypes, []);
      const descriptionPoints = normalizePoints(
        parseJsonArray(req.body.descriptionPoints, [])
      );

      const $set = {
        name: String(req.body.name || '').trim(),
        registrationCode: req.body.registrationCode || 'N/A',
        type: req.body.type || insuranceTypes[0] || 'Life Insurance',
        insuranceTypes,
        address: String(req.body.address || '').trim(),
        contact: String(req.body.contact || '').trim(),
        status: req.body.status || 'Active',
        websiteVisibility: req.body.websiteVisibility || 'show',
        consultationEnabled: String(req.body.consultationEnabled) === 'true',
        descriptionPoints,
        stopStartDate: req.body.stopStartDate || null,
        stopEndDate: req.body.stopEndDate || null,
        stopReason: req.body.stopReason || '',
        updatedAt: new Date(),
      };

      if (req.files?.logo?.[0]) {
        $set.logo = `/uploads/companies/${req.files.logo[0].filename}`;
      }
      if (req.files?.backgroundImage?.[0]) {
        $set.backgroundImage = `/uploads/companies/${req.files.backgroundImage[0].filename}`;
      }

      const result = await this.col.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set },
        { returnDocument: 'after' }
      );

      const doc = result.value || result; // driver version differences
      if (!doc) return res.status(404).json({ error: 'Company not found' });

      res.json({
        ...doc,
        id: doc._id.toString(),
        _id: doc._id.toString(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // POST /api/companies/:companyId/policies
  addPolicy = async (req, res) => {
    try {
      const companyId = req.params.companyId || req.params.id;
      if (!ObjectId.isValid(companyId)) {
        return res.status(400).json({ error: 'Invalid company id' });
      }

      const name = String(req.body.name || '').trim();
      if (!name) return res.status(400).json({ error: 'Policy name is required' });

      const scheme = {
        id: `pol-${Date.now()}`,
        name,
        keyFeatures: normalizePoints(req.body.keyFeatures),
        eligibilityCriteria: normalizePoints(req.body.eligibilityCriteria),
        websiteVisibility: req.body.websiteVisibility || 'show',
        createdAt: new Date(),
      };

      // If a brochure file was uploaded via multipart, attach path and filename
      if (req.file && req.file.filename) {
        scheme.brochurePath = `/uploads/${req.file.filename}`;
        scheme.brochureFileName = req.file.originalname || req.file.filename;
      } else if (req.body.brochurePath) {
        scheme.brochurePath = String(req.body.brochurePath);
      } else if (req.body.brochureUrl) {
        scheme.brochureUrl = String(req.body.brochureUrl);
      }

      const result = await this.col.findOneAndUpdate(
        { _id: new ObjectId(companyId) },
        {
          $push: { policies: scheme },
          $set: { updatedAt: new Date() },
        },
        { returnDocument: 'after' }
      );

      const doc = result.value || result;
      if (!doc) return res.status(404).json({ error: 'Company not found' });

      res.status(201).json(scheme);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // PUT /api/companies/:companyId/policies/:schemeId
  updatePolicy = async (req, res) => {
    try {
      const companyId = req.params.companyId || req.params.id;
      const schemeId = req.params.schemeId || req.params.policyId;
      if (!ObjectId.isValid(companyId)) {
        return res.status(400).json({ error: 'Invalid company id' });
      }

      const name = String(req.body.name || '').trim();
      if (!name) return res.status(400).json({ error: 'Policy name is required' });

      const keyFeatures = normalizePoints(req.body.keyFeatures);
      const eligibilityCriteria = normalizePoints(req.body.eligibilityCriteria);

      const result = await this.col.findOneAndUpdate(
        { _id: new ObjectId(companyId) },
        {
          $set: {
            'policies.$[p].name': name,
            'policies.$[p].keyFeatures': keyFeatures,
            'policies.$[p].eligibilityCriteria': eligibilityCriteria,
            updatedAt: new Date(),
          },
        },
        {
          arrayFilters: [{ 'p.id': schemeId }],
          returnDocument: 'after',
        }
      );

      // If a brochure file was uploaded, set its path for the matching policy
      if (req.file && req.file.filename) {
        await this.col.updateOne(
          { _id: new ObjectId(companyId), 'policies.id': schemeId },
          {
            $set: {
              'policies.$.brochurePath': `/uploads/${req.file.filename}`,
              'policies.$.brochureFileName': req.file.originalname || req.file.filename,
              updatedAt: new Date(),
            },
          }
        );
      }

      const doc = result.value || result;
      if (!doc) return res.status(404).json({ error: 'Company not found' });

      res.json({
        id: schemeId,
        name,
        keyFeatures,
        eligibilityCriteria,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // DELETE /api/companies/:companyId/policies/:schemeId
  deletePolicy = async (req, res) => {
    try {
      const companyId = req.params.companyId || req.params.id;
      const schemeId = req.params.schemeId || req.params.policyId;
      if (!ObjectId.isValid(companyId)) {
        return res.status(400).json({ error: 'Invalid company id' });
      }

      await this.col.updateOne(
        { _id: new ObjectId(companyId) },
        {
          $pull: { policies: { id: schemeId } },
          $set: { updatedAt: new Date() },
        }
      );

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}