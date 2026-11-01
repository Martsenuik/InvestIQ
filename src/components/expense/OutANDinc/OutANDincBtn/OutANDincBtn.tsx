import { NavLink } from "react-router-dom";
import './OutANDincBtn.css'

interface OutANDincBtnProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    setMobileStep: (step: string) => void;
}

export const OutANDincBtn = ({activeTab, setActiveTab, setMobileStep}: OutANDincBtnProps) => {
    return (
        <div className="expense-outANDinc-btn-box-TABLET">
          <NavLink
            to={"/transaction-tab"}
            className={`expense-btn-outgg-TABLET ${activeTab === "outgoing" ? "active" : ""}`}
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
            className={`expense-btn-incmg-TABLET ${activeTab === "income" ? "active" : ""}`}
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

// import { NavLink } from "react-router-dom";
// import './OutANDincBtn.css'

// interface OutANDincBtnProps {
//     activeTab: string;
//     setActiveTab: (tab: string) => void;
//     setMobileStep: (step: string) => void;
// }

// export const OutANDincBtn = ({activeTab, setActiveTab, setMobileStep}: OutANDincBtnProps) => {
//     return (
//         <div className="expense-outANDinc-btn-box-TABLET">
//           <NavLink
//             to={"/transaction-tab"}
//             className={`expense-btn-outgg-TABLET ${activeTab === "outgoing" ? "active" : ""}`}
//             onClick={(e) => {
//                 e.preventDefault();
//                 setActiveTab("outgoing");
                
//                 // 📌 Перемикаємо мобільний крок ТІЛЬКИ якщо ширина екрана мобільна (менше 768px)
//                 if (window.innerWidth < 768) {
//                     setMobileStep('add-transaction');
//                 }
//             }}
//           >
//             витрати
//           </NavLink>
//           <NavLink
//             to={"/transaction-tab"}
//             className={`expense-btn-incmg-TABLET ${activeTab === "income" ? "active" : ""}`}
//             onClick={(e) => {
//                 e.preventDefault();
//                 setActiveTab("income");
                
//                 // 📌 Перемикаємо мобільний крок ТІЛЬКИ якщо ширина екрана мобільна (менше 768px)
//                 if (window.innerWidth < 768) {
//                     setMobileStep('add-transaction');
//                 }
//             }}
//           >
//             дохід
//           </NavLink>
//         </div>
//     )
// }