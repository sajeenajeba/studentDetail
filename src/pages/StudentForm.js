import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import axios from "axios";

export default function SelectOtherProps() {
  const data = require("../config/data");

  const studentInfo = {
    name: "",
    gender: "",
    date: "",
    standard: "",
    division: "",
  };

  const [formValues, setFormValues] = useState(studentInfo);

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
    setFormErrors(validate(formValues));
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {};
    formData["name"] = formValues.name;
    formData["gender"] = formValues.gender;
    formData["date"] = formValues.date;
    formData["standard"] = formValues.standard;
    formData["division"] = formValues.division;
    console.log(formData);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/create",
        data: formData,
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-z-\s]+$/i;
    if (!values.name) {
      errors.name = "Name is required!";
    } else if (!regex.test(values.name)) {
      errors.name = "This is not a valid format of name!";
    }
    return errors;
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      marginTop={10}
    >
      <form onSubmit={handleSubmit}>
        <Grid item>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            value={formValues.name}
            onChange={handleChange}
            sx={{ width: 220 }}
          />
        </Grid>
        <p>{formErrors.name}</p>
        <Grid item>
          <TextField
            id="date"
            label="Date of Birth"
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
            fullWidth
            sx={{ marginTop: 5 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <p>{formErrors.date}</p>
        <Grid item>
          <TextField
            select
            label="Standard"
            name="standard"
            value={formValues.standard}
            onChange={handleChange}
            fullWidth
            sx={{ marginTop: 5 }}
          >
            {data.rawData[1].standardData.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            select
            label="Division"
            name="division"
            value={formValues.division}
            onChange={handleChange}
            fullWidth
            sx={{ marginTop: 5 }}
          >
            {data.rawData[0].divisionData.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel id="gender" sx={{ marginTop: 5 }}>
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender"
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <Button fullWidth variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
