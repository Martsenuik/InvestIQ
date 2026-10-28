import { NavLink } from "react-router-dom";
import './OutANDincBtnMOBILE.css'

interface OutANDincBtnProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    setMobileStep: (step: string) => void;
}

export const OutANDincBtnMOBILE = ({activeTab, setActiveTab, setMobileStep}: OutANDincBtnProps) => {
    return (
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
    )
}