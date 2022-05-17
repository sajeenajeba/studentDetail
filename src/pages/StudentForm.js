import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function SelectOtherProps() {

  const data = require("../config/data");

  const [studentInfo, setStudentInfo] = useState({
    name: "",
    gender: "",
    date: "",
    standard: "",
    division: "",
  });

  const handleChange = (event) => {
    setStudentInfo({ ...studentInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {};
    formData['name'] = studentInfo.name;
    formData['gender'] = studentInfo.gender;
    formData['date'] = studentInfo.date;
    formData['standard'] = studentInfo.standard;
    formData['division'] = studentInfo.division;
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
      console.log(error)
    }

  }

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
            value={studentInfo.name}
            onChange={handleChange}
            sx={{ width: 220 }} />
        </Grid>
        <Grid item>
          <TextField
            id="date"
            label="Date of Birth"
            type="date"
            name="date"
            value={studentInfo.date}
            onChange={handleChange}
            fullWidth
            sx={{ marginTop: 5 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            select
            label="Standard"
            name="standard"
            value={studentInfo.standard}
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
            value={studentInfo.division}
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
            <FormLabel id="gender" sx={{ marginTop: 5 }}>Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender"
              name="gender"
              value={studentInfo.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <Button fullWidth variant="contained" type="submit">Submit</Button>
        </Grid>
      </form>
    </Grid>
  )
}