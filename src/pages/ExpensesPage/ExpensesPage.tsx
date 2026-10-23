import { TransactionTab } from "../../components/expense/transactionTab/TransactionTab"
import diagram from '../../images/icons/diagram.svg'
import "./Expense.css"
import { useState } from "react"

import { NavLink } from "react-router-dom"

export const ExpensesPage = () => {
    const [mobileStep, setMobileStep] = useState('welcome')   
    // welcome, add-transaction, main
    const [activeTab, setActiveTab] = useState('outgoing');
    // outgoing, income
    const [transactions, setTransactions] = useState<any[]>([]);
    const [initialBalance, setInitialBalance] = useState(0);


    const handleDelete = (id: string) => {
        setTransactions(prevTransactions => prevTransactions.filter(item => (item._id || item.id) !== id));
    };

      const handleAddTransaction = (newTransactionData: { description: string; category: string; amount: number }) => {
    const newTx = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('uk-UA'),
      description: newTransactionData.description,
      category: newTransactionData.category,
      amount: newTransactionData.amount,
      type: activeTab, 
    };

    setTransactions(prev => [newTx, ...prev]);
        setMobileStep('main')
  };

    return (
        <section className="expense">

            {mobileStep !== 'add-transaction' && (
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
                                // onClick={() => setMobileStep('add-transaction')}
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
            {mobileStep !== 'welcome' && (
                <div className={`transaction-wrapper-mob ${mobileStep !== "welcome" ? "visible" : ""}`}>
                
                    <TransactionTab
                        type={activeTab}
                        transactions={transactions}
                        onDelete={handleDelete}
                        hideDate={true}
                        onBackWelc={() => setMobileStep('welcome')}
                        onAddTransaction={handleAddTransaction}
                        mobileStep={mobileStep}
                        initialBalance={initialBalance}
                    />
                </div>
            )}
 {mobileStep !== "add-transaction" && (
        <div className="expense-outANDinc-btn-box">
          <NavLink
            to={"/transaction-tab"}
            className={`expense-btn-outgg ${activeTab === "outgoing" ? "active" : ""}`}
            onClick={(e) => {
            e.preventDefault();
            setActiveTab("outgoing");
            setMobileStep('add-transaction'); 
        }}
          >
            витрати
          </NavLink>
          <NavLink
            to={"/transaction-tab"}
            className={`expense-btn-incmg ${activeTab === "income" ? "active" : ""}`}
            onClick={(e) => {
            e.preventDefault();
            setActiveTab("income");
            setMobileStep('add-transaction'); 
        }}
          >
            дохід
          </NavLink>
        </div>
      )}
        </section>
    )
}