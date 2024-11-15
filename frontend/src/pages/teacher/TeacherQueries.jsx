import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, CssBaseline, Toolbar, Drawer, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import TeacherSideBar from '../../components/TeacherSidebar';

const drawerWidth = 240;

const TeacherQueries = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  const handleRespondClick = (queryId) => {
    navigate(`/teacher/respond/${queryId}`); // Navigate to respond page with query ID
  };

  const styles = {
    container: {
      margin: '0 auto',
      maxWidth: '700px',
      width: '90%',
      padding: '40px',
      backgroundColor: '#f5f7fb',
      borderRadius: '10px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#e3f2fd',
      margin: '10px 0',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    button: {
      backgroundColor: '#3f51b5',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#303f9f',
      },
    },
    mainContent: {
      flexGrow: 1,
      padding: '24px',
      backgroundColor: '#f6f7f9',
      transition: 'margin-left 0.3s ease',
      marginLeft: open ? `${drawerWidth}px` : '70px',
    },
    drawerStyled: {
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: open ? drawerWidth : '70px',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Drawer variant="permanent" sx={styles.drawerStyled}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <TeacherSideBar open={open} />
      </Drawer>

      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" gutterBottom>Student Queries</Typography>
          <List>
            {[
              { id: 1, text: 'Assistance needed with assignment.' },
              { id: 2, text: 'Clarification on topic covered last class.' },
            ].map((query) => (
              <ListItem key={query.id} style={styles.listItem}>
                <ListItemText primary={`Query: ${query.text}`} />
                <Button
                  variant="contained"
                  sx={styles.button}
                  onClick={() => handleRespondClick(query.id)}
                >
                  Respond
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      </Box>
    </Box>
  );
};

export default TeacherQueries;
