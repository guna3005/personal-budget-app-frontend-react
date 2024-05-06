import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import PieChartComponent from "../visualizations/PieChart";
import BarChartComponent from "../visualizations/BarChart";
import BudgetTable from "./BudgetTable";
import AddBudgetModal from "./AddBudgetModal";
import Button from "@mui/material/Button";

const Dashboard = () => {
  const { authToken, logout } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/budgets", {
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

  return (
    <div>
      <h1>Dashboard</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Add Budget
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={logout}
          style={{ marginLeft: "10px" }}
        >
          Logout
        </Button>
      </div>
      <div>
        <PieChartComponent data={budgets} />
        <BarChartComponent data={budgets} />
        <BudgetTable data={budgets} />
      </div>
      <AddBudgetModal open={modalOpen} handleClose={handleCloseModal} />
    </div>
  );
};

export default Dashboard;
