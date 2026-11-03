import { ExpenseFirstScreen } from "../../components/expense/expense-first-screen/Expense-first-screen";
import { months } from '../../data/months.ts';
import leftArrow from '../../images/icons/arrowLEFT.svg';
import rightArrow from '../../images/icons/arrowRIGHT.svg';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./reports.css";
import { formatNumber } from "../../helperFunctions/formatNumber.tsx";
import { reportsCategoriesOutgg } from '../../data/reportsCategoriesOutgg.ts';
import { reportsCategoriesIncm } from "../../data/reportsCategoriesIncm.ts";

interface Transaction {
    _id?: string;
    id?: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'outgoing' | 'incoming' | 'income';
}

export const ReportsPage = () => {
    const [date, setDate] = useState(new Date());
    const [reportType, setReportType] = useState<'outgoing' | 'incoming'>('outgoing');

    const handleToggleReport = () => {
        setReportType(prev => prev === 'outgoing' ? 'incoming' : 'outgoing');
    };

    const location = useLocation();
    const state = location.state as { transactions?: Transaction[] } | null;
    
    const savedUsers = localStorage.getItem("allUsers");
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    let currentUserEmail = localStorage.getItem("userEmail");
    if (!currentUserEmail || currentUserEmail === "undefined") {
        currentUserEmail = users.length > 0 ? users[0].email : null;
    }

    const currentUser = users.find((user: any) => user.email === currentUserEmail);
    const initialBalance = currentUser && currentUser.balance !== undefined ? Number(currentUser.balance) : 0;
    
    const transactions: Transaction[] = state?.transactions || (currentUser && currentUser.transactions ? currentUser.transactions : []);
    
    const totalBalance = initialBalance + transactions.reduce((acc: number, item: any) => acc + Number(item.amount), 0);

    const selectedMonthIndex = date.getMonth();
    const selectedYear = date.getFullYear();

    let totalExpensesForMonth = 0;
    let totalIncomeForMonth = 0;

    const categoryTotals: { [key: string]: number } = {};

    transactions.forEach((item: Transaction) => {
        if (!item.date) return;
        const parts = item.date.split('.');
        if (parts.length === 3) {
            const itemMonthIndex = Number(parts[1]) - 1;
            const itemYear = Number(parts[2]);

            if (itemMonthIndex === selectedMonthIndex && itemYear === selectedYear) {
                const isOutgoing = item.type === 'outgoing';
                const isIncoming = item.type === 'incoming' || item.type === 'income';

                if (isOutgoing) {
                    totalExpensesForMonth += Number(item.amount);
                } else if (isIncoming) {
                    totalIncomeForMonth += Number(item.amount);
                }

                if ((reportType === 'outgoing' && isOutgoing) || (reportType === 'incoming' && isIncoming)) {
                    const cat = item.category || 'Something Else';
                    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(item.amount);
                }
            }
        }
    });

    const currentCategories = reportType === 'outgoing' ? reportsCategoriesOutgg : reportsCategoriesIncm;

    const currentResultData = currentCategories.map((cat, index) => ({
        id: index + 1,
        category: cat.name,
        icon: cat.icon,
        amount: categoryTotals[cat.name] || 0
    }));
      
    const handlePrev = () => {
        const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        setDate(prevMonth);
    };

    const handleNext = () => {
        const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        setDate(nextMonth);
    };

    return (
        <section className="reports">
            <div className="reports-top-block">
               <ExpenseFirstScreen
                    initialBalance={totalBalance}
                    setInitialBalance={() => {}} 
                    handleChange={() => {}} 
                    handleConfirmBalance={() => {}} 
                    totalBalance={totalBalance}
                    mobileStep="main"
                    setMobileStep={() => {}}
                    setActiveTab={() => {}}
                    disabled={true} 
                    isReportsPage={true}
                />
                
                <div className='period-container'>
                    <p className="period-label">Поточний період</p>
                    
                    <div className="period-period-picker period-picker">
                        <button className="arrow-btn" onClick={handlePrev}>
                            <img src={leftArrow} alt="left arrow" />
                        </button>
                        
                        <div className="period-text">
                            <span className="month">{months[date.getMonth()]}</span>
                            <br />
                            <span className="year">{date.getFullYear()}</span>
                        </div>

                        <button className="arrow-btn" onClick={handleNext}>
                            <img src={rightArrow} alt="right arrow" />
                        </button>
                    </div>
                </div>
            </div>

            <ul className='results-list'>
                <li className='result-item-outgg'>
                    Витрати:
                    <span className="result-item-outgg-amount">- {formatNumber(totalExpensesForMonth)} грн.</span>
                </li>
                <li className='result-item-income'>
                    Доходи:
                    <span className="result-item-income-amount">+ {formatNumber(totalIncomeForMonth)} грн.</span>
                </li>
            </ul>
            
            <div className="expenses-results-box">
                <div className="report-period-picker">
                    <button className="report-arrow-btn" onClick={handleToggleReport}>
                        <img src={leftArrow} alt="left arrow" />
                    </button>

                    <p className="report-period-text">{reportType === 'outgoing' ? 'ВИТРАТИ' : 'ДОХОДИ'}</p>
                    
                    <button className="report-arrow-btn" onClick={handleToggleReport}>
                        <img src={rightArrow} alt="right arrow" />
                    </button>
                </div>
            
                <ul className="expense-results-list">
                 {currentResultData.map((expense) => (
                     <li className="expense-results-item" key={expense.id}>
                         <p className="expense-results-amount">{expense.amount.toFixed(2)}</p>
                         <img className="expense-results-icon" src={expense.icon} alt={expense.category} />
                         <p className="expense-results-category">{expense.category}</p>
                     </li>
                 ))}
                </ul>
            </div>
        </section>
    );
};