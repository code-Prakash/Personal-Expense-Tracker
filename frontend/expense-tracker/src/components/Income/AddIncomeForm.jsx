import React, { useState } from 'react'
import Input from '../Inputs/input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {
  const[income ,setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });
  const handleAddIncome = (key,value) => setIncome({...income , [key]: value});

  return (
    <div>
      <EmojiPickerPopup 
        icon={income.icon}
        onSelect={(selectedIcon)=>handleAddIncome("icon",selectedIcon)}
      />
      
      <Input
        value={income.source}
        type="text"
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        onChange={(e) => handleAddIncome("source", e.target.value)}
      />
      <Input
        value={income.amount}
        type="number"
        label="Amount"
        placeholder=""
        onChange={(e) => handleAddIncome("amount", e.target.value)}
      />
      <Input
        value={income.date}
        type="date"
        label="Date"
        placeholder=""
        onChange={(e) => handleAddIncome("date", e.target.value)}
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={()=>onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  )
}

export default AddIncomeForm
