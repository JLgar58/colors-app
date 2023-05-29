import React, { useEffect, useState, useRef } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { init } from "emoji-mart";

init({ data });

// upper: styled components and styled items, below: component

export default function DialogForm(props) {
  // init
  const form = useRef();
  const [dialog, setDialog] = useState({
    showPicker: false,
    showDialog: false,
  });
  const { save, change, palettes, paletteName, show, close } = props;

  // fn
  const handleClose = () => {
    close();
  };
  const handleSave = (emojiObj) => {
    const emoji = emojiObj.native;
    save(emoji);
    setDialog((st) => ({
      ...st,
      showPicker: !st.showPicker,
      // showDialog: !st.showDialog,
    }));
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }, [palettes]);
  const changeDialog = () => {
    setDialog((st) => ({
      showPicker: !st.showPicker,
      showDialog: !st.showDialog,
    }));
  };

  // render
  return (
    <div>
      <Dialog open={dialog.showPicker} onClose={handleClose}>
        <DialogTitle>Choose an emoji</DialogTitle>
        <Picker data={data} onEmojiSelect={handleSave} theme="light" />
      </Dialog>
      <Dialog open={dialog.showDialog ? !show : show} onClose={handleClose}>
        <DialogTitle>Saving Palette</DialogTitle>
        <ValidatorForm
          ref={form}
          onSubmit={changeDialog}
          onError={(errors) => console.log(errors)}
        >
          <DialogContent sx={{ py: 0 }}>
            <DialogContentText sx={{ my: 1 }}>
              To save the new palette on this website, please provide an unique
              palette name here. then, select an emoji to save it.
            </DialogContentText>
            <TextValidator
              autoFocus
              label="Palette Name"
              sx={{ width: "100%" }}
              onChange={(evt) => change(evt)}
              name="paletteName"
              value={paletteName}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "this field is required",
                "Palette name must be unique",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit" color="success">
              Save
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
