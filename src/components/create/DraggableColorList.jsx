import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { ReactSortable } from "react-sortablejs";

export default function DraggableColorList(props) {
  // init
  const { colors, setColors, removeColor } = props;

  // render
  return (
    <ReactSortable
      tag="div"
      list={colors}
      setList={setColors}
      style={{ height: "100%", lineHeight: 1 }}
    >
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          box={color}
          deleteBox={() => removeColor(color.name)}
        />
      ))}
    </ReactSortable>
  );
}
