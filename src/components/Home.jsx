import React, { useState } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { red, blue } from "@mui/material/colors";
import MiniPalette from "./MiniPalette";

import appTheme from "../css/styles/ColorsApp";
import "../css/App.css";
import "../css/animation1.css";

const PaletteList = styled("section", {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "classes" && prop !== "variant" && prop !== "sx",
  name: "PaletteList",
  slot: "Main",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.main,
    props.classes === "home" && styles.home,
    props.classes === "container" && styles.container,
    props.classes === "palettes" && styles.palettes,
  ],
})(({ theme }) => ({
  // backgroundColor: "blue",
}));
const sxHome = {
  backgroundColor: "#030133",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='519' height='519' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23424244' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23ECEDF2'%3E%3Ccircle cx='769' cy='229' r='6'/%3E%3Ccircle cx='539' cy='269' r='6'/%3E%3Ccircle cx='603' cy='493' r='6'/%3E%3Ccircle cx='731' cy='737' r='6'/%3E%3Ccircle cx='520' cy='660' r='6'/%3E%3Ccircle cx='309' cy='538' r='6'/%3E%3Ccircle cx='295' cy='764' r='6'/%3E%3Ccircle cx='40' cy='599' r='6'/%3E%3Ccircle cx='102' cy='382' r='6'/%3E%3Ccircle cx='127' cy='80' r='6'/%3E%3Ccircle cx='370' cy='105' r='6'/%3E%3Ccircle cx='578' cy='42' r='6'/%3E%3Ccircle cx='237' cy='261' r='6'/%3E%3Ccircle cx='390' cy='382' r='6'/%3E%3C/g%3E%3C/svg%3E")`,
};

export default function Home(props) {
  // init
  const { palettes, deletePalette } = props;
  const [deletingId, setDeleting] = useState("");
  const [open, setOpen] = useState(false);

  // fn
  const handleOpen = (id) => {
    setOpen(true);
    setDeleting(id);
  };
  const handleClose = () => {
    setOpen(false);
    setDeleting("");
  };
  const handleDelete = () => {
    deletePalette(deletingId);
    handleClose();
  };

  const paletteList = palettes.map((p) => (
    <CSSTransition key={p.id} classNames="fade" timeout={500}>
      <MiniPalette
        palette={p}
        key={p.id}
        // deletePalette={deletePalette}
        openDialog={handleOpen}
      />
    </CSSTransition>
  ));
  // render
  return (
    <ThemeProvider theme={appTheme}>
      <PaletteList classes="home" sx={sxHome}>
        <PaletteList classes="container">
          <nav className="nav">
            <h1 className="title">React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <PaletteList classes="palettes">
            <TransitionGroup className="palettes" component={null}>
              {paletteList}
            </TransitionGroup>
          </PaletteList>
        </PaletteList>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Are you sure do you you want to dele it?</DialogTitle>
          <List>
            <ListItemButton onClick={handleDelete}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Sure, Delete</ListItemText>
              </ListItem>
            </ListItemButton>
            <ListItemButton onClick={handleClose}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                    <CloseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>No, Cancel</ListItemText>
              </ListItem>
            </ListItemButton>
          </List>
        </Dialog>
      </PaletteList>
    </ThemeProvider>
  );
}
