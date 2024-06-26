import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import PieChartComponent from '../visualizations/PieChart';
import BarChartComponent from '../visualizations/BarChart';
import BudgetTable from './BudgetTable';
import AddBudgetModal from './AddBudgetModal';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ChartBlock = styled.div`
  width: 49%;
`;

const Dashboard = () => {
  const { authToken, logout } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://138.197.24.120:3000/api/budgets", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setBudgets(response.data);
    } catch (error) {
      console.error("Failed to fetch budgets", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [authToken]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    fetchBudgets();
    setModalOpen(false);
  };

  const totalSpending = budgets.reduce((acc, cur) => acc + cur.cost, 0);

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>Add Budget</Button>
        <Button variant="contained" color="secondary" onClick={logout} style={{ marginLeft: "10px" }}>Logout</Button>
      </div>
      <ChartContainer>
        <ChartBlock>
          <PieChartComponent data={budgets} />
          <p>Total budget distribution by category.</p>
        </ChartBlock>
        <ChartBlock>
          <BarChartComponent data={budgets} />
          <p>Total spending: ${totalSpending.toFixed(2)}</p>
        </ChartBlock>
      </ChartContainer>
      <BudgetTable data={budgets} />
      <AddBudgetModal open={modalOpen} handleClose={handleCloseModal} />
    </div>
  );
};

export default Dashboard;
