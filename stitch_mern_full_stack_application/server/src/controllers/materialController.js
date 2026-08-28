import Material from '../models/Material.js';

export const listMaterials = async (req, res) => {
  try {
    const { course } = req.query;
    const filter = course ? { course } : {};

    const materials = await Material.find(filter)
      .populate('course', 'title code')
      .populate('uploadedBy', 'name email role')
      .sort({ createdAt: -1 });

    return res.status(200).json({ materials });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to load materials', error: error.message });
  }
};

export const createMaterial = async (req, res) => {
  try {
    const { course, title, type, description, fileUrl, uploadedBy, isPublished, tags } = req.body;

    if (!course || !title || !uploadedBy) {
      return res.status(400).json({ success: false, message: 'Course, title, and uploader are required' });
    }

    const material = await Material.create({
      course,
      title,
      type: type || 'document',
      description: description || '',
      fileUrl: fileUrl || '',
      uploadedBy,
      isPublished: isPublished !== false,
      tags: tags || [],
    });

    return res.status(201).json({ success: true, message: 'Material created successfully', data: material });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create material', error: error.message });
  }
};

export default { listMaterials, createMaterial };
