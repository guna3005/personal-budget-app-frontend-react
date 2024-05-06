import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddBudgetModal = ({ open, handleClose }) => {
  const [budgetData, setBudgetData] = useState({
    name: '',
    cost: '',
    month: '',
    colour: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBudgetData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const isValidHex = (colour) => /^#([0-9A-F]{3}){1,2}$/i.test(colour);

  const areFieldsValid = () => {
    const { name, cost, month, colour } = budgetData;
    return name && cost && month && colour && isValidHex(colour);
  };

  const handleSubmit = async () => {
    if (!areFieldsValid()) {
      alert('Please fill all fields correctly. Make sure the color is a valid hexadecimal value.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/budgets', budgetData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      });
      if (response.status === 201) {
        alert('Budget added successfully!');
        handleClose();  
      } else {
        alert('Failed to add budget');
      }
    } catch (error) {
      alert('Error adding budget: ' + error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-budget-modal-title"
      aria-describedby="add-budget-modal-description"
    >
      <Box sx={modalStyle}>
        <h2 id="add-budget-modal-title">Add New Budget</h2>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={budgetData.name}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Cost"
          name="cost"
          type="number"
          value={budgetData.cost}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Month"
          name="month"
          value={budgetData.month}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Colour"
          name="colour"
          value={budgetData.colour}
          onChange={handleInputChange}
          margin="normal"
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddBudgetModal;
