import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import chroma from "chroma-js";

const dragBxTheme = createTheme({
  components: {
    Boxes: {
      styleOverrides: {
        root: {},
        boxContainer: {
          width: "20%",
          height: "25%",
          margin: "0 auto -4px",
          display: "inline-block",
          position: "relative",
          cursor: "pointer",
          "&:hover .deleteIcon": {
            color: "#808080",
            transform: "scale(1.5)",
          },
          "@media (max-width: 991.98px)": {
            width: "25%",
            height: "20%",
          },
          "@media (max-width: 767.98px)": {
            width: "50%",
            height: "10%",
          },
          "@media (max-width: 575.98px)": {
            width: "100%",
            height: "5%",
          },
          "& .boxContent": {
            width: "100%",
            padding: "10px",
            position: "absolute",
            left: "0",
            bottom: "0",
            color: "inherit",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontSize: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "& .deleteIcon": {
              transition: "all 0.3s ease-in-out",
            },
          },
        },
      },
    },
  },
});

const Boxes = styled("div", {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "classes" && prop !== "variant" && prop !== "sx",
  name: "Boxes",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.classes === "boxContainer" && styles.boxContainer,
  ],
})(({ theme }) => ({}));

// upper: styled components and styled items, below: component

export default function DraggableColorBox(props) {
  const { box, deleteBox } = props;
  // const isDarkColor = chroma(box.color).luminance() <= 0.08;
  const isLightColor = chroma(box.color).luminance() >= 0.6;

  // fn
  const handleDelete = (e) => {
    e.stopPropagation();
    deleteBox();
  };

  // render
  return (
    <ThemeProvider theme={dragBxTheme}>
      <Boxes
        sx={{
          backgroundColor: box.color,
          color: isLightColor ? "#000" : "#fff",
        }}
        classes="boxContainer"
      >
        <div className="boxContent">
          <span>{box.name}</span>
          <DeleteRoundedIcon className="deleteIcon" onClick={handleDelete} />
        </div>
      </Boxes>
    </ThemeProvider>
  );
}
