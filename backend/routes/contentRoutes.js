import express from 'express';

function shapeNews(doc) {
  return {
    id: doc.id || doc._id?.toString(),
    title: doc.title,
    description: doc.description,
    category: doc.category,
    coverImage: doc.coverImage || doc.image,
    image: doc.coverImage || doc.image,
    publishDate: doc.publishDate,
    readTime: doc.readTime || '4 min read',
    author: doc.author || 'Aynkaran Team',
    content: doc.content || doc.description,
    tags: doc.tags || [],
  };
}

function shapeGallery(doc) {
  const url = doc.url || doc.image || '';
  const type =
    doc.type ||
    (/\.(mp4|webm|mov|m4v|ogg)$/i.test(url) ? 'video' : 'image');
  return {
    id: doc.id || doc._id?.toString(),
    title: doc.title,
    category: doc.category,
    description: doc.description || '',
    url,
    image: doc.image || doc.url || url,
    type,
  };
}

function shapePoster(doc) {
  return {
    id: doc.id || doc._id?.toString(),
    audience: doc.audience || 'customers',
    order: typeof doc.order === 'number' ? doc.order : 0,
    url: doc.url,
    fileName: doc.fileName || '',
    updatedAt: doc.updatedAt,
  };
}

function shapeAnnouncement(doc) {
  return {
    id: doc.id || doc._id?.toString(),
    audience: doc.audience || 'customers',
    text: doc.text || '',
    label: doc.label || '',
    order: typeof doc.order === 'number' ? doc.order : 0,
    createdAt: doc.createdAt,
  };
}

export function contentRoutes(db) {
  const router = express.Router();
  const postersCol = db.collection('content_posters');
  const newsCol = db.collection('content_news');
  const galleryCol = db.collection('content_gallery');
  const announcementsCol = db.collection('content_announcements');
  const categoriesCol = db.collection('content_categories');
  const claimHelpCol = db.collection('content_claimhelp');
  const claimHelpProceduresCol = db.collection('content_claimhelp_procedures');
  const claimHelpHelplinesCol = db.collection('content_claimhelp_helplines');

  // GET /api/content
  router.get('/', async (_req, res) => {
    try {
      const claimHelpDocs = await claimHelpCol.find({}).sort({ companyName: 1, createdAt: -1 }).toArray();
      const claimHelpProcedures = await claimHelpProceduresCol.find({}).sort({ companyId: 1, order: 1, createdAt: -1 }).toArray();
      const claimHelpHelplines = await claimHelpHelplinesCol.find({}).sort({ companyId: 1, order: 1, createdAt: -1 }).toArray();

      const proceduresMap = new Map();
      for (const entry of claimHelpProcedures) {
        const companyId = entry.companyId?.toString();
        if (!companyId) continue;
        if (!proceduresMap.has(companyId)) proceduresMap.set(companyId, []);
        proceduresMap.get(companyId).push({
          id: entry._id?.toString() || entry.id,
          text: entry.text || '',
          order: Number.isFinite(Number(entry.order)) ? Number(entry.order) : 0,
        });
      }

      const helplinesMap = new Map();
      for (const entry of claimHelpHelplines) {
        const companyId = entry.companyId?.toString();
        if (!companyId) continue;
        if (!helplinesMap.has(companyId)) helplinesMap.set(companyId, []);
        helplinesMap.get(companyId).push({
          id: entry._id?.toString() || entry.id,
          number: entry.number || '',
          order: Number.isFinite(Number(entry.order)) ? Number(entry.order) : 0,
        });
      }

      const companies = claimHelpDocs.map((company) => {
        const companyId = company._id?.toString() || company.id;
        const companyProcedures = (proceduresMap.get(companyId) || []).sort((a, b) => (a.order || 0) - (b.order || 0));
        const companyHelplines = (helplinesMap.get(companyId) || []).sort((a, b) => (a.order || 0) - (b.order || 0));
        return {
          id: companyId,
          companyName: company.companyName || '',
          companyProfileImage: company.companyProfileImage || '',
          procedures: companyProcedures,
          helplineNumbers: companyHelplines,
        };
      }).filter((company) => company.companyName || company.id);

      const posterDocs = await postersCol.find({}).sort({ order: 1, updatedAt: -1 }).toArray();
      const customers = [];
      const advisors = [];

      for (const d of posterDocs) {
        const shaped = shapePoster(d);
        if (d.slot) {
          if (d.slot.startsWith('left')) {
            shaped.audience = 'customers';
            customers.push(shaped);
          } else {
            shaped.audience = 'advisors';
            advisors.push(shaped);
          }
        } else if (d.audience === 'advisors') {
          advisors.push(shaped);
        } else {
          customers.push(shaped);
        }
      }
      customers.sort((a, b) => a.order - b.order);
      advisors.sort((a, b) => a.order - b.order);

      const news = await newsCol.find({}).sort({ createdAt: -1 }).toArray();
      const gallery = await galleryCol.find({}).sort({ createdAt: -1 }).toArray();

      const annDocs = await announcementsCol.find({}).sort({ order: 1, createdAt: -1 }).toArray();
      const annCustomers = [];
      const annAdvisors = [];
      for (const d of annDocs) {
        const s = shapeAnnouncement(d);
        if (s.audience === 'advisors') annAdvisors.push(s);
        else annCustomers.push(s);
      }
      annCustomers.sort((a, b) => a.order - b.order);
      annAdvisors.sort((a, b) => a.order - b.order);

      const catDocs = await categoriesCol.find({}).toArray();
      const newsCats = ['Educational', 'Industry Updates', 'Tips & Guide', 'Recruitment'];
      const galCats = ['Events', 'Training', 'Meetings', 'Awards', 'Office'];
      catDocs.forEach((c) => {
        if (c.type === 'news' && !newsCats.includes(c.name)) newsCats.push(c.name);
        if (c.type === 'gallery' && !galCats.includes(c.name)) galCats.push(c.name);
      });

      res.json({
        claimHelp: {
          companies,
        },
        posters: { customers, advisors },
        news: news.map(shapeNews),
        gallery: gallery.map(shapeGallery),
        announcements: { customers: annCustomers, advisors: annAdvisors },
        categories: { news: newsCats, gallery: galCats },
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get('/posters', async (_req, res) => {
    try {
      const docs = await postersCol.find({}).sort({ order: 1 }).toArray();
      const customers = [];
      const advisors = [];
      for (const d of docs) {
        const s = shapePoster(d);
        if (d.slot?.startsWith('left') || d.audience === 'customers') customers.push(s);
        else advisors.push(s);
      }
      customers.sort((a, b) => a.order - b.order);
      advisors.sort((a, b) => a.order - b.order);
      res.json({ customers, advisors });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get('/news', async (_req, res) => {
    try {
      const rows = await newsCol.find({}).sort({ createdAt: -1 }).toArray();
      res.json(rows.map(shapeNews));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get('/gallery', async (_req, res) => {
    try {
      const rows = await galleryCol.find({}).sort({ createdAt: -1 }).toArray();
      res.json(rows.map(shapeGallery));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get('/announcements', async (_req, res) => {
    try {
      const docs = await announcementsCol.find({}).sort({ order: 1 }).toArray();
      const customers = [];
      const advisors = [];
      for (const d of docs) {
        const s = shapeAnnouncement(d);
        if (s.audience === 'advisors') advisors.push(s);
        else customers.push(s);
      }
      res.json({ customers, advisors });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
}

