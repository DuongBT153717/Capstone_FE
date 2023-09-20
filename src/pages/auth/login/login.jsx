import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  IconButton,
  Link
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  // const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   setOpen(true);
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  // };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          height: '100vh'
        }}
      >
        <Grid container sx={{ flex: "1 1 auto" }}>
          <Grid
            xs={12}
            lg={6}
            sx={{
              backgroundColor: "background.paper",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
            item
          >
            <Box
              sx={{
                backgroundColor: "background.paper",
                flex: "1 1 auto",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  maxWidth: 550,
                  px: 3,
                  py: "100px",
                  width: "100%",
                }}
              >
                <div>
                  <Stack spacing={1} sx={{ mb: 3 }}>
                    <Typography sx={{ fontSize: "35px", fontWeight: "700" }}>
                      Đăng nhập
                    </Typography>
                    <Typography color="text.secondary" fontSize="15px">
                      Chưa có tài khoản? &nbsp;
                      <Link
                        sx={{ fontSize: "15px", color: "rgb(99, 102, 241)" }}
                        href="/register"
                        underline="hover"
                        
                      >
                        Đăng kí
                      </Link>
                    </Typography>
                  </Stack>
                  <form noValidate>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Địa chỉ Email"
                        name="email"
                        type="email"
                      />
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="new-password"
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                              onClick={handleClickShowPassword}
                              size="large"
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          ),
                        }}
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      mt={1}
                    >
                      <FormControlLabel
                        sx={{ width: "60%" }}
                        onClick={() => setRemember(!remember)}
                        control={<Checkbox checked={remember} />}
                        label="Nhớ mật khẩu"
                      />
                      <Typography
                        variant="body1"
                        component="span"
                        onClick={() => {
                          navigate("/reset-password");
                        }}
                        style={{ marginTop: "10px", cursor: "pointer",color: "rgb(99, 102, 241)" }}
                      >
                        Quên mật khẩu?
                      </Typography>
                    </Stack>
                    <Button
                      fullWidth
                      size="large"
                      sx={{
                        mt: 2,
                        bgcolor: "rgb(99, 102, 241)",
                        p: "11px 24px",
                        borderRadius: "12px",
                      }}
                      type="submit"
                      variant="contained"
                    >
                      Xác nhận
                    </Button>
                  </form>
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid
            xs={12}
            lg={6}
            sx={{
              alignItems: "center",
              background:
                "radial-gradient(circle, rgba(9,50,121,1) 16%, rgba(0,212,255,1) 100%)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              "& img": {
                maxWidth: "100%",
              },
            }}
            item
          >
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
