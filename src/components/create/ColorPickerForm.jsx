import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
  width: "75%",
  "& .chrome-picker": {
    margin: "2rem 0 0",
  },
}));

// upper: styled components and styled items, below: component

export default function ColorPickerForm(props) {
  // init
  const {
    color,
    colors,
    onChangeComplete,
    form,
    addColor,
    change,
    colorName,
    isfull,
  } = props;
  const ColorPickerForm = {
    addBtnColor: {
      backgroundColor: color,
      width: "100%",
      padding: 1,
      mt: 1,
      fontSize: "1.5rem",
    },
    textValidate: {
      width: "100%",
      mt: 2,
    },
  };

  // fn
  const handleChangeComplete = (color) => {
    onChangeComplete(color);
  };
  const addNewColor = (evt) => {
    addColor(evt);
  };
  const handleChange = (evt) => {
    change(evt);
  };
  useEffect(() => {
    // custom rule will have name 'isNameUnique'
    ValidatorForm.addValidationRule("isNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule("isColorUnique", () => {
      return colors.every(({ color }) => color !== props.color);
    });
  }, [colors, props.color]);

  // render
  return (
    <Div>
      <ChromePicker
        width="100%"
        color={color}
        onChangeComplete={handleChangeComplete}
      />
      <ValidatorForm
        ref={form}
        onSubmit={addNewColor}
        onError={(errors) => console.log(errors)}
      >
        <TextValidator
          label="Color Name"
          onChange={handleChange}
          name="colorName"
          value={colorName}
          sx={ColorPickerForm.textValidate}
          validators={["required", "isNameUnique", "isColorUnique"]}
          errorMessages={[
            "this field is required",
            "color name must be unique",
            "color already used!",
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          // onClick={addNewColor}
          disabled={!isfull}
          sx={ColorPickerForm.addBtnColor}
        >
          {isfull ? "Add Color" : "Palette Full"}
        </Button>
      </ValidatorForm>
    </Div>
  );
}
