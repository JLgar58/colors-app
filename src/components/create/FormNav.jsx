import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddToPhotos from "@mui/icons-material/AddToPhotos";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DialogForm from "./DialogForm";

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // backgroundColor: "#656565",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const btnBreaks = {
  "@media (max-width: 991.98px)": {},
  "@media (max-width: 767.98px)": {},
  "@media (max-width: 575.98px)": {
    lineHeight: "1",
    padding: "3px 8px",
  },
};
// upper: styled components and styled items, below: component

export default function FormNav(props) {
  // init
  const [dialogShow, setDialog] = useState(false);
  const navigate = useNavigate();
  const { open, DrawerOpen, clearIn, Save, Change, palettes, paletteName } =
    props;

  // fn
  const handleDrawerOpen = () => {
    DrawerOpen();
  };
  const handleSave = (emoji) => {
    Save(emoji);
  };
  const displayDialog = () => {
    setDialog(true);
  };
  const handleClose = () => {
    setDialog(false);
    clearIn();
  };

  // render
  return (
    <AppBar position="fixed" color="default" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            mr: 2,
            ...(open && { display: "none" }),
            "@media (max-width: 991.98px)": {},
            "@media (max-width: 767.98px)": {
              m: 0,
            },
            "@media (max-width: 575.98px)": {},
          }}
        >
          <AddToPhotos />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            "@media (max-width: 991.98px)": {},
            "@media (max-width: 767.98px)": {
              width: "50%",
            },
            "@media (max-width: 575.98px)": {},
          }}
        >
          Create your palette
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            margin: "0 0 0 auto",
            "@media (max-width: 991.98px)": {
              m: 0,
            },
            "@media (max-width: 767.98px)": {
              width: "42%",
              justifyContent: "flex-end",
              alignItems: "center",
            },
            "@media (max-width: 575.98px)": {},
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={btnBreaks}
            onClick={() => navigate("/")}
          >
            Go Back!
          </Button>
          <Button
            variant="contained"
            sx={btnBreaks}
            color="primary"
            onClick={displayDialog}
          >
            Save it!
          </Button>
          {dialogShow && (
            <DialogForm
              change={Change}
              paletteName={paletteName}
              save={handleSave}
              palettes={palettes}
              close={handleClose}
              clearIn={clearIn}
              show={dialogShow}
            />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
