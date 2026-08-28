import Notification from '../models/Notification.js';

export const listNotifications = async (req, res) => {
  try {
    const { recipient } = req.query;
    const filter = recipient ? { recipient } : {};

    const notifications = await Notification.find(filter)
      .populate('recipient', 'name email')
      .populate('relatedResource', 'title code')
      .sort({ createdAt: -1 });

    return res.status(200).json({ notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to load notifications', error: error.message });
  }
};

export const createNotification = async (req, res) => {
  try {
    const { recipient, type, title, message, relatedResource } = req.body;

    if (!recipient || !title || !message) {
      return res.status(400).json({ success: false, message: 'Recipient, title, and message are required' });
    }

    const notification = await Notification.create({
      recipient,
      type: type || 'announcement',
      title,
      message,
      relatedResource: relatedResource || null,
    });

    return res.status(201).json({ success: true, message: 'Notification created successfully', data: notification });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create notification', error: error.message });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    return res.status(200).json({ success: true, message: 'Notification marked as read', data: notification });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update notification', error: error.message });
  }
};

export default { listNotifications, createNotification, markNotificationRead };
