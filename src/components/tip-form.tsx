import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { TipResult } from "./tip-result";

const TIPS = ["5", "10", "15", "25", "50"];

export const TipForm = () => {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState({ value: "", tip: "" });
  const [noOfPeople, setNoOfPeople] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [amount, setAmount] = useState({ tipAmount: "0", total: "0" });

  const handleTipClick = (value: string) => {
    setTip({ value: value, tip: value });
    setIsCustom(false);
  };

  const handleReset = () => {
    setBill("");
    setTip({ value: "", tip: "" });
    setNoOfPeople("");
    setIsCustom(false);
    setAmount({ tipAmount: "0", total: "0" });
  };

  useEffect(() => {
    if (Number(bill) > 0 && Number(noOfPeople) > 0 && tip.value) {
      const tipAmount = (Number(tip.value) / 100) * Number(bill);
      setAmount({
        tipAmount: (tipAmount / Number(noOfPeople)).toFixed(2),
        total: (
          tipAmount / Number(noOfPeople) +
          Number(bill) / Number(noOfPeople)
        ).toFixed(2),
      });
    } else {
      setAmount({ tipAmount: "0", total: "0" });
    }
  }, [bill, tip, noOfPeople, isCustom]);

  return (
    <div className="container">
      <div className="tips-form">
        <div>
          <label>Bill</label>
          <br />
          <div className="input-group">
            <span>$</span>
            <input
              type="number"
              placeholder="0"
              min={0}
              value={bill}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBill(e.target.value)
              }
            />
          </div>
        </div>
        <div>
          <label>Select Tip %</label> <br />
          <div className="tip-list">
            {TIPS.map((val, i) => (
              <button
                className={tip.tip === val ? "tip-selected" : ""}
                onClick={() => handleTipClick(val)}
                key={i}
              >
                {val}%
              </button>
            ))}

            {isCustom ? (
              <input
                autoFocus
                className="custom-tip-input"
                type="number"
                min={1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTip({ value: e.target.value, tip: "" })
                }
              />
            ) : (
              <button
                onClick={() => {
                  setTip({ value: "", tip: "" });
                  setIsCustom(true);
                }}
                className="custom-tip"
              >
                Custom
              </button>
            )}
          </div>
        </div>
        <div>
          <div className="error-label">
            <label>Number of People</label>
            <label className="error-msg">
              {noOfPeople && Number(noOfPeople) <= 0 ? "Can't be zero" : ""}
            </label>
          </div>

          <div
            className={`input-group ${
              noOfPeople && Number(noOfPeople) <= 0 ? "error" : ""
            }`}
          >
            <span>
              <FaUser />
            </span>
            <input
              type="number"
              placeholder="0"
              min={1}
              value={noOfPeople}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNoOfPeople(e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <TipResult
        amount={amount}
        handleReset={handleReset}
        reset={Number(bill) > 0 && noOfPeople && tip.value ? true : false}
      />
    </div>
  );
};
