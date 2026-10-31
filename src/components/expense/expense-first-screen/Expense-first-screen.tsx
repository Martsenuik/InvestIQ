import "./expense-first-screen.css"
import diagram from "../../../images/icons/diagram.svg"
import arrow from "../../../images/icons/arrow.svg"
import { useState } from "react";


interface ExpenseFirstScreenProps {
    initialBalance: number;
    setInitialBalance: (balance: number) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleConfirmBalance: () => void;
    totalBalance: number;
    mobileStep: string; 
}

export const ExpenseFirstScreen = ({
    initialBalance,
    setInitialBalance,
    handleChange,
    handleConfirmBalance,
    totalBalance,
    mobileStep
}: ExpenseFirstScreenProps) => {
    const[ pageNow, setPageNow] = useState('welcome') // expense, reports
    
    return (
        <div className="expense-first-screen"> 
            
            {pageNow !== 'reports' && (
                <p className="expense-go-calcuations">
                Перейти до розрахунків 
                <span>
                    <img className="expense-icon-diagram" src={diagram} alt="diagram" />
                </span>
            </p>
             )}
            
            {pageNow === 'reports' && ( 
                <>
                <p>Повернутись на головну</p>
                    <img src={arrow} alt="arrow" />
                </>
            )}
            

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
    )
}




