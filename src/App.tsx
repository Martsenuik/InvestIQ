import './App.css'
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { ExpensesPage } from "./pages/ExpensesPage/ExpensesPage";
import { IncomePage } from "./pages/IncomePage/IncomePage"
import { ReportsPage } from "./pages/ReportsPage/ReportsPage" 
import { Header } from './components/header/Header';
import { TransactionTab } from './components/expense/transactionTab/TransactionTab';
import type { ReactNode } from "react";


function App() {
  
  const isAuthenticated = () => {
    return Boolean(localStorage.getItem("userEmail"));
  };
  
  const PrivateRoute = ({ children }: { children: ReactNode }) => {
    return isAuthenticated() ? children : <Navigate to="/auth" replace />;
};

  return (
    <>
      <section className="section">
        <BrowserRouter>
          <Suspense
            fallback={<div className="loading">Завантаження сторінки...</div>}
          >
            <Header />
                    <nav >
        <Link to="/auth">Auth</Link>
        <Link to="/">Expenses</Link>
        <Link to="/income">Income</Link>
        <Link to="/reports">Reports</Link>
      </nav>
            <Routes>
            <Route path="/auth" element={<AuthPage />} />

            <Route 
                path="/" 
                element={
                    <PrivateRoute>
                        <ExpensesPage />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/income" 
                element={
                    <PrivateRoute>
                        <IncomePage />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/reports" 
                element={
                    <PrivateRoute>
                        <ReportsPage />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/transaction-tab" 
                element={
                    <PrivateRoute>
                        <TransactionTab />
                    </PrivateRoute>
                } 
            />
        </Routes>
          </Suspense>
        </BrowserRouter>
      </section>
    </>
  )
}

export default App
