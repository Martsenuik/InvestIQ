import { categories } from "../../../data/categories";
import calculator from "../../../images/icons/calculator.svg";
import { useCurrencyInput } from "../../../helperFunctions/formatCurrencyInput";
import React from "react";
import "./form-inputs-group-ALL.css";

export const FormInputsGroupALL = ({ description, setDescription, category, setCategory, amount, setAmount }: any) => {

  const { displayValue, handleChange } = useCurrencyInput(amount, setAmount);
  
  return (
    <div className="form-inputs-group-ALL">
      <div className="form-inputs-group">
        <input
          type="text"
          value={description}
          placeholder="Опис товару"
          className="form-input-desc"
          onChange={(e) => setDescription(e.target.value)}
        />
            
        <select
          name="category"
          className="form-select-cat"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option className="form-optonS-cat" value="" disabled hidden>Категорія товару</option>
          {categories.map((cat) => (
            <option className="cat-option" key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>  

      <div className="calculator-group">   
        <div className="form-amount-wrapper">
          <input
            type="text"
            value={displayValue} 
            placeholder="00.00 UAH"
            className="form-input-amount"
            onChange={(e) => {
              setAmount(e.target.value);
              handleChange(e);
            }}
          />
          <img src={calculator} alt="calculator" className="form-calc-icon" />
        </div>
      </div>   
    </div>
  );
};