import {ExpenseFirstScreen} from "../../components/expense/expense-first-screen/Expense-first-screen"
import {months} from '../../data/months.ts'
import leftArrow from '../../images/icons/arrowLEFT.svg'
import rightArrow from '../../images/icons/arrowRIGHT.svg'
import {useState} from "react";
import "./reports.css";
import { expensesResult } from "../../data/expensesResult.ts";

export const ReportsPage = () => {
    const [date, setDate] = useState(new Date());

    const handlePrev = () => {
        const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        setDate(prevMonth);
    }

    const handleNext = () => {
        const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        setDate(nextMonth);
    }
    return (
        <section className="reports">
            {/* <ExpenseFirstScreen /> */}
            
            <div className='period-container'>
                <p className="period-label">Поточний період</p>
                
                <div className="period-picker">
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

            <ul className='results-list'>
                <li className='result-item-outgg'>Витрати:
                    <span className="result-item-outgg-amount">- грн.</span>
                </li>
                <li className='result-item-income'>Доходи:
                    <span className="result-item-income-amount">+ грн.</span>
                </li>
            </ul>
            
            <div className="expenses-results-box">
                <div className="report-period-picker">
                    <button className="report-arrow-btn">
                        <img src={leftArrow} alt="left arrow" />
                    </button>
                    
                    <div className="report-period-text">
                        <p>ВИТРАТИ</p>
                    </div>

                    <button className="report-arrow-btn">
                        <img src={rightArrow} alt="right arrow" />
                    </button>
                </div>
            
                <ul className="expense-results-list">
                 {expensesResult.map((expense) => (
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