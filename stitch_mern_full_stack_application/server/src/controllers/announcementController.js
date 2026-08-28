import Announcement from '../models/Announcement.js';

export const listAnnouncements = async (req, res) => {
  try {
    const { course, audience } = req.query;
    const filter = {};

    if (course) filter.course = course;
    if (audience) filter.audience = audience;

    const announcements = await Announcement.find(filter)
      .populate('course', 'title code')
      .populate('createdBy', 'name email role')
      .sort({ isPinned: -1, createdAt: -1 });

    return res.status(200).json({ announcements });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to load announcements', error: error.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { course, audience, title, message, createdBy, isPinned } = req.body;

    if (!title || !message || !createdBy) {
      return res.status(400).json({ success: false, message: 'Title, message, and creator are required' });
    }

    const announcement = await Announcement.create({
      course: course || null,
      audience: audience || 'all',
      title,
      message,
      createdBy,
      isPinned: Boolean(isPinned),
    });

    return res.status(201).json({ success: true, message: 'Announcement created', data: announcement });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create announcement', error: error.message });
  }
};

export default { listAnnouncements, createAnnouncement };
