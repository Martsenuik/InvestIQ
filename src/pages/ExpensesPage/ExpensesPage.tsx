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
    const [displayValue, setDisplayValue] = useState('')
    const [initialBalance, setInitialBalance] = useState(() => {
      const currentUserEmail = localStorage.getItem("userEmail");
      if (!currentUserEmail) return 0;
      const savedUsers = localStorage.getItem("allUsers");
      if (!savedUsers) return 0;
      const users = JSON.parse(savedUsers);
      const currentUser = users.find((user: any) => user.email === currentUserEmail);
      return currentUser && currentUser.balance !== undefined ? currentUser.balance : 0;
    });

    const totalBalance = initialBalance + transactions.reduce((acc, item) => acc + Number(item.amount), 0);


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
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        if (!rawValue) {
            setDisplayValue('');
            return;
        }
        const formatted = Number(rawValue).toLocaleString('uk-UA');

        setDisplayValue(formatted);
    };

    const handleConfirmBalance = () => {
      const currentUserEmail = localStorage.getItem("userEmail");
      const savedUsers = localStorage.getItem("allUsers");
    
      if (currentUserEmail && savedUsers) {
        let users = JSON.parse(savedUsers);
    
        users = users.map((user: any) => {
          if (user.email === currentUserEmail) {
            return { ...user, balance: initialBalance }; 
          }
          return user;
        });
    
        localStorage.setItem("allUsers", JSON.stringify(users));
      }
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
                                type="text"
                                className="expense-balance-money"
                                placeholder="00.00 UAH"
                                onChange={(e) => {
                                    handleChange(e);
                                    const rawValue = e.target.value.replace(/\s/g, '');
                                    setInitialBalance(Number(rawValue) || 0);
                                }}
                                readOnly={mobileStep === 'main'}
                                value={
                                    mobileStep === 'main' 
                                        ? Number(totalBalance || 0).toLocaleString('uk-UA') 
                                        : (initialBalance === 0 ? '' : initialBalance.toLocaleString('uk-UA'))
                                }
                            />
                            <button 
                                className="expense-succes-balance" 
                                disabled={mobileStep === 'main'}
                                onClick={handleConfirmBalance}
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