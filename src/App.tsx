import './App.css'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Suspense } from "react";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { ExpensesPage } from "./pages/ExpensesPage/ExpensesPage";
import { IncomePage } from "./pages/IncomePage/IncomePage"
import { ReportsPage } from "./pages/ReportsPage/ReportsPage" 
import { Header } from './components/header/Header';
import { TransactionTab } from './components/expense/transactionTab/TransactionTab';


function App() {

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
              <Route path="/" element={<ExpensesPage />} />
              <Route path="/income" element={<IncomePage />}/>
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/transaction-tab" element={<TransactionTab />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </section>
    </>
  )
}

export default App
