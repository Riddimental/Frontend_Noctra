import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Bell } from 'lucide-react'; // If you want to use an icon in the drawer header

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          height: '50%', // Adjust the height as needed
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <h2>Notifications</h2>
        <List>
          {/* Placeholder notifications */}
          {['New Post', 'Comment on your post', 'New Follower'].map((text, index) => (
            <ListItem button key={index}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default NotificationDrawer;
