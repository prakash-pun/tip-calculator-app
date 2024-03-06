interface ITipResult {
  amount: { tipAmount: string; total: string };
  reset: boolean;
  handleReset: () => void;
}

export const TipResult = ({ amount, reset, handleReset }: ITipResult) => {
  return (
    <div className="tip-result-container">
      <div>
        <div className="tip-result">
          <div>
            <h2>Tip Amount</h2>
            <p>/ person</p>
          </div>
          <h1> ${amount.tipAmount}</h1>
        </div>
        <div className="tip-result">
          <div>
            <h2>Total</h2>
            <p>/ person</p>
          </div>
          <h1> ${amount.total}</h1>
        </div>
      </div>
      <button
        disabled={!reset}
        className={reset ? "btn-active" : "btn-inactive"}
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};
