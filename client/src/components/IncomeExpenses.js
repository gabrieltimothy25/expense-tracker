import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function IncomeExpenses() {
  const { transactions } = useContext(GlobalContext);

  const total = transactions.map((transaction) => transaction.amount);

  const income = total
    .filter((amount) => amount > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);

  const expense = total
    .filter((amount) => amount < 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);

  console.log(transactions);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">+${income}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-${Math.abs(expense).toFixed(2)}</p>
      </div>
    </div>
  );
}

// import React from "react";

// export default function blabla() {
//   return <h1>oit</h1>;
// }
