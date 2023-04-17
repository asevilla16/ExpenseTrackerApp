import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";

const IndicatorComponent = ({ incomesValue, expensesValue }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    updateTotal();
  }, [incomesValue, expensesValue]);

  const updateTotal = () => {
    let totalAmount = incomesValue - expensesValue;
    setTotal(totalAmount);
  };

  return (
    <>
      <Card
        style={{ border: "rgb(141, 238, 141)" }}
        className="incomes-indicator"
        title="Incomes"
      >
        {incomesValue}
      </Card>
      <Card
        style={{ background: "rgb(235, 133, 133)" }}
        className="expenses-indicator ml-8"
        title="Expenses"
      >
        {expensesValue}
      </Card>
      <Card
        className=" ml-8"
        title="Balance"
        style={{ background: "rgb(156, 203, 247)" }}
      >
        {total}
      </Card>
    </>
  );
};

export default IndicatorComponent;
