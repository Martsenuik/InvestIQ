import { OutANDincBtnMOBILE } from "../../components/expense/OutANDinc/OutANDincBtnMOBILE/OutANDincBtnMOBILE"
import { TransactionTab } from "../../components/expense/transactionTab/transactionTab/TransactionTab"
import "./Expense.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { months} from '../../data/months'
import { ExpenseFirstScreen } from "../../components/expense/expense-first-screen/Expense-first-screen"


export const ExpensesPage = () => {
    const [mobileStep, setMobileStep] = useState('welcome')   
    // welcome, add-transaction, main
    const [transactions, setTransactions] = useState<any[]>(() => {
        const currentUserEmail = localStorage.getItem("userEmail");
        if (!currentUserEmail) return [];
        const savedUsers = localStorage.getItem("allUsers");
        if (!savedUsers) return [];
        const users = JSON.parse(savedUsers);
        const currentUser = users.find((user: any) => user.email === currentUserEmail);
        return currentUser && currentUser.transactions ? currentUser.transactions : [];
    });
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
    const [transactionType, setTransactionType] = useState('outgoing')

    const navigate = useNavigate();
    const handleGoToReports = () => {
        navigate("/reports", { 
            state: { 
                // monthlyData, 
                transactions, 
                totalBalance 
            } 
        });
    };



    const totalBalance = initialBalance + transactions.reduce((acc, item) => acc + Number(item.amount), 0);
    
    const filtredTransactions = transactions.filter(item => item.type === transactionType);
    
   const getMonthlySummary = () => {
        const filtred = transactions.filter(item => item.type === transactionType);
        const summaryMap: { [key: string]: number } = {};
        
        filtred.forEach(item => {
            const parts = item.date ? item.date.split('.') : [];
            if (parts.length === 3) {
                const monthsIndex = Number(parts[1]) - 1;
                const monthName = months[monthsIndex] || 'ІНШИЙ';

                if (!summaryMap[monthName]) {
                    summaryMap[monthName] = 0;
                }
                summaryMap[monthName] += Number(item.amount);
            }
        });
        return Object.entries(summaryMap); 
    };

    const saveTransactionsToStorage = (updatedTransactions: any[]) => {
        const currentUserEmail = localStorage.getItem("userEmail");
        const savedUsers = localStorage.getItem("allUsers");

        if (currentUserEmail && savedUsers) {
            let users = JSON.parse(savedUsers);
            users = users.map((user: any) => {
                if (user.email === currentUserEmail) {
                    return { ...user, transactions: updatedTransactions };
                }
                return user;
            });
            localStorage.setItem("allUsers", JSON.stringify(users));
        }
    };

    const monthlyData = getMonthlySummary();

    const handleDelete = (id: string) => {
    const updated = transactions.filter(item => (item._id || item.id) !== id);
    setTransactions(updated);
    saveTransactionsToStorage(updated);
    };

    const handleAddTransaction = (newTransactionData: { description: string; category: string; amount: number }) => {
        const newTx = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('uk-UA'),
            description: newTransactionData.description,
            category: newTransactionData.category,
            amount: newTransactionData.amount,
            type: transactionType,
        };

        const updated = [newTx, ...transactions];
        setTransactions(updated);
        saveTransactionsToStorage(updated);
        setMobileStep('main');

    }
    
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

           <div className={`expense-top-wrapper step-${mobileStep}`}>
                    <ExpenseFirstScreen
                        initialBalance={initialBalance}
                        setInitialBalance={setInitialBalance}
                        handleChange={handleChange}
                        handleConfirmBalance={handleConfirmBalance}
                        totalBalance={totalBalance}
                        mobileStep={mobileStep}
                        setMobileStep={setMobileStep}
                    setActiveTab={setTransactionType}
                    handleGoToReports={handleGoToReports}
                    
                />
            </div>

                    {initialBalance === 0 && (
                        <div className="welcome-popup-container">
                            <div className="welcome-bubble">
                                Привіт! Для початку роботи внесіть свій поточний баланс рахунку! 
                                Ви не можете витрачати гроші, поки їх у Вас немає 
                            </div>
                        </div>
                    )}
            
                <div className={`transaction-wrapper-mob step-${mobileStep}`}>
                
                    <TransactionTab
                        type={transactionType}
                        transactions={filtredTransactions}
                        onDelete={handleDelete}
                        hideDate={true}
                        onBackWelc={() => setMobileStep('welcome')}
                        onAddTransaction={handleAddTransaction}
                        mobileStep={mobileStep}
                        initialBalance={initialBalance}
                        activeTab={transactionType}      
                        setActiveTab={setTransactionType}
                        setMobileStep={setMobileStep}
                        summaryData={monthlyData}
                    />
                </div>

            {mobileStep !== "add-transaction" && (
                <OutANDincBtnMOBILE
                    activeTab={transactionType}
                    setActiveTab={setTransactionType}
                    setMobileStep={setMobileStep}
                />
            )}
        </section>
    )
}