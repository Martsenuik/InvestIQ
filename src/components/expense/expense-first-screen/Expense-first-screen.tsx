import "./expense-first-screen.css"
import diagram from "../../../images/icons/diagram.svg"
import arrow from "../../../images/icons/arrow.svg"
import { NavLink } from "react-router-dom";
import { useState } from "react";


interface ExpenseFirstScreenProps {
    initialBalance: number;
    setInitialBalance: (balance: number) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleConfirmBalance: () => void;
    totalBalance: number;
    mobileStep: string; 
    setActiveTab: (tab: string) => void;
    setMobileStep: (step: string) => void;
    disabled?: boolean;
    isReportsPage?: boolean;
    handleGoToReports?: () => void;
}

export const ExpenseFirstScreen = ({
    initialBalance,
    setInitialBalance,
    handleChange,
    handleConfirmBalance,
    totalBalance,
    mobileStep,
    setActiveTab,
    setMobileStep,
    disabled = false,
    isReportsPage = false,
    handleGoToReports
}: ExpenseFirstScreenProps) => {
    const[ pageNow, setPageNow] = useState('welcome') // expense, reports
    
    return (
        <div className="expense-first-screen"> 
            
           {!isReportsPage && (
                <NavLink
                    to={"/reports"}
                    className="expense-go-calcuations"
                    onClick={() => {
                        setActiveTab("outgoing");
                        setMobileStep('add-transaction'); 
                        handleGoToReports;
                    }}
                >
                    Перейти до розрахунків
                    <span>
                        <img className="expense-icon-diagram" src={diagram} alt="diagram" />
                    </span>
                </NavLink>
             )}
            
            {isReportsPage && ( 
                <>
                
                <NavLink
                    to={"/"}
                    className="expense-go-main"
                    >
                        <span className="expense-go-main-icon">
                         <img src={arrow} alt="arrow" />
                    </span>
                   <span className="expense-go-main-text"> Повернутись на головну </span>
                    
                    </NavLink>
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
                    disabled={disabled}
                    value={
    disabled || mobileStep === 'main' 
        ? Number(totalBalance || 0).toLocaleString('uk-UA') 
        : (initialBalance === 0 ? '' : initialBalance.toLocaleString('uk-UA'))
}
                    // value={
                    //     mobileStep === 'main' 
                    //         ? Number(totalBalance || 0).toLocaleString('uk-UA') 
                    //         : (initialBalance === 0 ? '' : initialBalance.toLocaleString('uk-UA'))
                    // }
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




