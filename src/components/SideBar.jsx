import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Divider, Box, useMediaQuery, useTheme, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; 

export const SideBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  



  return (
    <>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"} 
        anchor="left"
        open={isMobile && open}
        onClose={toggleDrawer}
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: "#f8f9fa",
            height: "100vh",
          },
        }}
      >
        <Box sx={{ padding: "20px" }}>
          <h3>Expense Tracker</h3>
          <Divider />
          <List>
            <ListItem  >
              <ListItemText>
                <Link to="/home" style={{ textDecoration: "none", color: "#000" }}>
                  Dashboard
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem  >
              <ListItemText>
                <Link to="/addexpense" style={{ textDecoration: "none", color: "#000" }}>
                  Add Expense
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem  >
              <ListItemText>
                <Link to="/expenseList" style={{ textDecoration: "none", color: "#000" }}>
                  List Expense
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem  >
              <ListItemText>
                <Link to="/dailyincome" style={{ textDecoration: "none", color: "#000" }}>
                  Add Income
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem  >
              <ListItemText>
                <Link to="/incomelist" style={{ textDecoration: "none", color: "#000" }}>
                   List Income
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem  >
              <ListItemText>
                <Link to="/profile" style={{ textDecoration: "none", color: "#000" }}>
                   Profile
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Button onClick={handleLogout} style={{ textDecoration: "none", color: "#000" }}>
                   Logout
                </Button>
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {isMobile && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 1201,
            backgroundColor: "white",
            borderRadius: "50%",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </>
  );
};

