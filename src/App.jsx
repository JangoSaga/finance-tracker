import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Incomes from "./Pages/Incomes";
import Expenses from "./Pages/Expenses";
import Categories from "./Pages/Categories";
import Budgets from "./Pages/Budgets";
import Savings from "./Pages/Savings";
import AppLayout from "./AppLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserLayout from "./UserLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ProtectedRoute";
import GlobalStyles from "./Styles/GlobalStyles";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/incomes" element={<Incomes />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Route>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Navigate to={"/login"} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 4000,
            style: {
              background: "white",
              color: "black",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "white",
              color: "black",
            },
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
