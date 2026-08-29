const Material = require('../models/Material');

exports.createMaterial = async (req, res, next) => {
  try {
    const { title, description, course, topic, type, externalLink } = req.body;
    let fileUrl = '';

    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }

    const material = await Material.create({
      title,
      description,
      course,
      topic,
      type,
      fileUrl,
      externalLink: type === 'link' ? externalLink : '',
      uploadedBy: req.user.id
    });

    res.status(201).json({ success: true, data: material });
  } catch (err) {
    next(err);
  }
};

exports.getMaterialsByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { search, topic } = req.query;

    let query = { course: courseId };
    if (topic) query.topic = topic;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const materials = await Material.find(query)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: materials });
  } catch (err) {
    next(err);
  }
};

exports.toggleBookmark = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    const index = material.bookmarks.indexOf(req.user.id);
    if (index === -1) {
      material.bookmarks.push(req.user.id);
    } else {
      material.bookmarks.splice(index, 1);
    }

    await material.save();
    res.status(200).json({ success: true, data: material });
  } catch (err) {
    next(err);
  }
};

exports.deleteMaterial = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    if (material.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized action' });
    }

    await material.deleteOne();
    res.status(200).json({ success: true, message: 'Material deleted successfully' });
  } catch (err) {
    next(err);
  }
};
