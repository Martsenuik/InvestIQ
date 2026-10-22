import { TransactionTab } from "../../components/expense/transactionTab/TransactionTab"
import diagram from '../../images/icons/diagram.svg'
import "./Expense.css"
import { useState } from "react"
import arrow from '../../images/icons/arrow.svg'

export const ExpensesPage = () => {
    const [mobileStep, setMobileStep] = useState('welcome')   
    // welcome, add-transaction, main
    const [activeTab, setActiveTab] = useState('outgoing');
    // outgoing, income
    const [transactions, setTransactions] = useState<any[]>([]);
    const [initialBalance, setInitialBalance] = useState(0)

    const handleDelete = (id: string) => {
        setTransactions(prevTransactions => prevTransactions.filter(item => (item._id || item.id) !== id));
    };

    return (
        <section className="expense">

            {mobileStep === 'welcome' && (
                <>
                    <div className="expense-first-screen"> 
                        <p className="expense-go-calcuations">
                            Перейти до розрахунків 
                            <span>
                                <img className="expense-icon-diagram" src={diagram} alt="diagram" />
                            </span>
                        </p>
                        <p className="expense-balance-p">Баланс:</p>
                        <div className="expense-balancce-box">
                            <input
                                type="number"
                                className="expense-balance-money"
                                placeholder="00.00 UAH"
                                onChange={(e) => setInitialBalance(Number(e.target.value))} 
                            /> 
                            <button 
                                className="expense-succes-balance" 
                                onClick={() => setMobileStep('add-transaction')}
                            >
                                Підтвердити
                            </button>
                        </div>
                    </div>

                    {initialBalance === 0 && (
                        <div className="welcome-popup-container">
                            <div className="welcome-bubble">
                                Привіт! Для початку роботи внесіть свій поточний баланс рахунку! 
                                Ви не можете витрачати гроші, поки їх у Вас немає 
                            </div>
                        </div>
                    )}
                </>
            )}

            <div className={`transaction-wrapper-mob ${mobileStep !== "welcome" ? "visible" : ""}`}>
                <button onClick={() => setMobileStep('welcome')}>
                    <img src={arrow} alt="arrow" />
                </button>
                <TransactionTab 
                    type={activeTab} 
                    transactions={transactions} 
                    onDelete={handleDelete} 
                    
                />
            </div>

            <div className="expense-outANDinc-btn-box">
                <button 
                    className={`expense-btn-outgg ${activeTab === 'outgoing' ? 'active' : ''}`}
                    onClick={() => setActiveTab('outgoing')}
                >
                    витрати
                </button>
                <button 
                    className={`expense-btn-incmg ${activeTab === 'income' ? 'active' : ''}`}
                    onClick={() => setActiveTab('income')}
                >
                    дохід
                </button>
            </div>
        </section>
    )
}