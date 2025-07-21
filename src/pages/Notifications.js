import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper } from '@mui/material';
import { Send, Delete, Add } from '@mui/icons-material';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'System Maintenance', message: 'The system will be down for maintenance on June 1st from 2-4 AM.', date: '2023-05-20' },
    { id: 2, title: 'New Feature', message: 'We have added a new dispute resolution feature. Check it out!', date: '2023-05-18' },
    { id: 3, title: 'Policy Update', message: 'Please review our updated privacy policy.', date: '2023-05-15' },
  ]);

  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
  });

  const handleSend = () => {
    if (newNotification.title && newNotification.message) {
      const notification = {
        id: notifications.length + 1,
        title: newNotification.title,
        message: newNotification.message,
        date: new Date().toISOString().split('T')[0],
      };
      setNotifications([notification, ...notifications]);
      setNewNotification({ title: '', message: '' });
    }
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Send Notifications</Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Create New Notification</Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={newNotification.title}
          onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
        />
        <TextField
          label="Message"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={newNotification.message}
          onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Send />}
          onClick={handleSend}
          disabled={!newNotification.title || !newNotification.message}
          sx={{ mt: 2 }}
        >
          Send Notification
        </Button>
      </Paper>
      
      <Typography variant="h6" gutterBottom>Recent Notifications</Typography>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id}>
            <ListItemText
              primary={notification.title}
              secondary={`${notification.message} - Sent on ${notification.date}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDelete(notification.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Notifications;