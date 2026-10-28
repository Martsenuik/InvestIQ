import { OutANDincBtnMOBILE } from "../../components/expense/OutANDinc/OutANDincBtnMOBILE/OutANDincBtnMOBILE"
import { TransactionTab } from "../../components/expense/transactionTab/transactionTab/TransactionTab"
import "./Expense.css"
import { useState } from "react"
import { OutANDincBtn } from "../../components/expense/OutANDinc/OutANDincBtn/OutANDincBtn"
import { ExpenseFirstScreen } from "../../components/expense/expense-first-screen/Expense-first-screen"


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
            <OutANDincBtn
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setMobileStep={setMobileStep}
            />

            {mobileStep !== 'add-transaction' && (
                <>
                    <ExpenseFirstScreen
                        initialBalance={initialBalance}
                        setInitialBalance={setInitialBalance}
                        handleChange={handleChange}
                        handleConfirmBalance={handleConfirmBalance}
                        totalBalance={totalBalance}
                        mobileStep={mobileStep}
                    />

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
            
                <div className={`transaction-wrapper-mob step-${mobileStep}`}>
                
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

            {mobileStep !== "add-transaction" && (
                <OutANDincBtnMOBILE
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    setMobileStep={setMobileStep}
                />
            )}
        </section>
    )
}