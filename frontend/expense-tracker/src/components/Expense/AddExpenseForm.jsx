import Input from '../Inputs/input'
import EmojiPickerPopup from '../EmojiPickerPopup'
import { useState } from 'react';

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });
  return (<div>

    <EmojiPickerPopup
      icon={income.icon}
      onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
    />

    <Input
      value={income.category}
      type="text"
      label="Category"
      placeholder="Food, Entertainment, etc"
      onChange={(e) => handleChange("category", e.target.value)}
    />
    <Input
      value={income.amount}
      type="number"
      label="Amount"
      placeholder=""
      onChange={({target}) => handleChange("amount", target.value)}
    />
    <Input
      value={income.date}
      type="date"
      label="Date"
      placeholder=""
      onChange={({target}) => handleChange("date", target.value)}
    />

    <div className="flex justify-end mt-6">
      <button 
        type='button'
        className="add-btn add-btn-fill"
        onClick={() => onAddExpense(income)}
      >
        Add Expense
      </button>
    </div>
  </div>
  )
}

export default AddExpenseForm
