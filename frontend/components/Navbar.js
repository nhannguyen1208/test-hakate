import { AppBar, Toolbar, Typography, Button, IconButton, Container, Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const [forceUpdate, setForceUpdate] = useState(0);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, [forceUpdate]); 
const handleLogin = async () => {
  localStorage.setItem("user", JSON.stringify({ email }));
  setForceUpdate((prev) => prev + 1);
};


  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ overflow: "hidden" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap", px: 2 }}>
          {/* Logo */}
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#002776" }}>
            hekate
          </Typography>

          {/* Menu items */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
            <Button href="/home" color="inherit">Home</Button>
            <Button color="inherit">About Us</Button>
            <Button color="inherit">Services</Button>
            <Button color="inherit">Success Stories</Button>
            <Button color="inherit">Blog</Button>
            <Button color="inherit">Contact</Button>
          </div>

          {/* Ngôn ngữ + Đăng nhập/Email */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IconButton>
              <LanguageIcon sx={{ color: "#002776" }} />
            </IconButton>

            {user ? (
              <>
                {/* Hiển thị email thay vì Login */}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#002776",
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 3,
                  }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  {user.email}
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                href="/login"
                variant="contained"
                sx={{
                  backgroundColor: "#002776",
                  borderRadius: "20px",
                  textTransform: "none",
                  px: 3,
                }}
              >
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
