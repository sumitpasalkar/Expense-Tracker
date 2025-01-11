import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Routes, Route, useLocation } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Home } from "./components/Home";
import { AddExpense } from "./components/AddExpense";
import { ExpenseList } from "./components/ExpenseList";
import { EditExpense } from "./components/EditExpense";
import { DailyIncome } from "./components/DailyIncome";
import { IncomeList } from "./components/IncomeList";
import { EditIncome } from "./components/EditIncome";
import { Profile } from "./components/Profile";
import { Box ,useMediaQuery ,useTheme } from "@mui/material";

export const App = () => {
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  const noSidebarRoutes = ["/login", "/", "/register"];

  return (
    <>
    {!noSidebarRoutes.includes(location.pathname) && userId && <SideBar/>}

<Box sx={{marginLeft : isMobile ? "0px" : "250px" }}>
   <Routes>
       {/* <Route path="/sidebar" element={<SideBar/>}/> */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addexpense" element={<AddExpense />} />
        <Route path="/editExpense/:id" element={<EditExpense />} />
        <Route path="/expenseList" element={<ExpenseList />} />
        <Route path="/dailyincome" element={<DailyIncome />} />
        <Route path="/incomelist" element={<IncomeList />} />
        <Route path="/editIncome/:id" element={<EditIncome />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add a fallback for unmatched routes */}
        <Route path="*" element={<Login />} />
      </Routes>
</Box>
     

      {/* Render Footer only if userId exists */}
    </>
  );
};
