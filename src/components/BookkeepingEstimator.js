import React, { useState } from "react";

const BookkeepingEstimator = () => {
  // State variables
  const [basePrice, setBasePrice] = useState(0);
  const [annualEarnings, setAnnualEarnings] = useState(0);
  const [aepFactor, setAepFactor] = useState(0.0); // Default multiplier: 0.5%
  const [numTransactions, setNumTransactions] = useState(0);
  const [transactionRate, setTransactionRate] = useState(0.25); // Default rate per transaction
  const [bookkeeperRate, setBookkeeperRate] = useState(25);
  const [manHours, setManHours] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  // Calculate totals
  const calculateQuote = () => {
    const aepCost = annualEarnings * aepFactor;
    const transactionCost = numTransactions * transactionRate;
    const bookkeeperCost = bookkeeperRate * manHours;
    const totalCost = basePrice + aepCost + transactionCost + bookkeeperCost;

    return {
      annual: totalCost.toFixed(2),
      quarterly: (totalCost / 4).toFixed(2),
      monthly: (totalCost / 12).toFixed(2),
    };
  };

  const costEstimates = calculateQuote();

  // Sales pitch content generator
  const generateSalesPitch = () => {
    const annualWithMarkup = (costEstimates.annual * 1.1).toFixed(2);
    const quarterlyWithMarkup = (costEstimates.quarterly * 1.15).toFixed(2);
    const monthlyWithMarkup = (costEstimates.monthly * 1.25).toFixed(2);
    const annualSavings = (costEstimates.annual * 0.1).toFixed(2);

    return `Based on the information LCG has acquired from you in terms of Estimated company earnings and Projected number of transactions a year, we are able to quote bookkeeping services for your business as follows: 
    we have categorized the quotes into 3 payment types: Annual, Quarterly, and Monthly.
    The Annual rate is $${annualWithMarkup}, the Quarterly rate is $${quarterlyWithMarkup}, and the Monthly rate is $${monthlyWithMarkup}. 
    We are able to provide a cost savings to you if you pay the Annual rate. With your one-time payment of the annual rate for the fiscal year, we can apply a 10% savings discount so instead of paying $${annualWithMarkup}, you will pay $${costEstimates.annual} and save $${annualSavings} in the process.`;
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Bookkeeping Services Quote Estimator</h2>

      {/* Inputs for user data */}
      {/* Base Price Dropdown */}
      <label>
        Base Price:
        <select
          value={basePrice}
          onChange={(e) => setBasePrice(Number(e.target.value))}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "5px",
            width: "100%",
          }}
        >
          {[0, 500, 750, 1000, 1250, 1500, 1750, 2000].map((price) => (
            <option key={price} value={price}>
              ${price}
            </option>
          ))}
        </select>
      </label>

      {/* Annual Earnings Input */}
      <label>
        Company Annual Earnings Potential (Enter without commas):
        <input
          type="number"
          value={annualEarnings}
          onChange={(e) => setAnnualEarnings(Number(e.target.value))}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "5px",
            width: "100%",
          }}
          placeholder="Enter annual earnings"
        />
      </label>

      {/* AEP Factor Slider */}
      <label>
        AEP Factor Multiplier ({(aepFactor * 100).toFixed(2)}%):
        <input
          type="range"
          min="0.000"
          max="0.02"
          step="0.001"
          value={aepFactor}
          onChange={(e) => setAepFactor(Number(e.target.value))}
          style={{ display: "block", margin: "10px 0", width: "100%" }}
        />
      </label>

      {/* Number of Transactions Input */}
      <label>
        Number of Transactions:
        <input
          type="number"
          value={numTransactions}
          onChange={(e) => setNumTransactions(Number(e.target.value))}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "5px",
            width: "100%",
          }}
          placeholder="Enter number of transactions"
        />
      </label>

      {/* Transaction Rate Slider */}
      <label>
        Rate Charge per Transaction (${transactionRate.toFixed(2)}):
        <input
          type="range"
          min="0.25"
          max="2"
          step="0.05"
          value={transactionRate}
          onChange={(e) => setTransactionRate(Number(e.target.value))}
          style={{ display: "block", margin: "10px 0", width: "100%" }}
        />
      </label>

      {/* Bookkeeper Hourly Rate Dropdown */}
      <label>
        Bookkeeper Hourly Rate:
        <select
          value={bookkeeperRate}
          onChange={(e) => setBookkeeperRate(Number(e.target.value))}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "5px",
            width: "100%",
          }}
        >
          {[25, 30, 35, 40, 45, 50].map((rate) => (
            <option key={rate} value={rate}>
              ${rate}/hour
            </option>
          ))}
        </select>
      </label>

      {/* Bookkeeper Man Hours Dropdown */}
      <label>
        Bookkeeper Man Hours:
        <select
          value={manHours}
          onChange={(e) => setManHours(Number(e.target.value))}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "5px",
            width: "100%",
          }}
        >
          {[...Array(60)].map((_, i) => {
            const hours = i * 5;
            return (
              <option key={hours} value={hours}>
                {hours} hours
              </option>
            );
          })}
        </select>
      </label>

      {/* Display Cost Estimates */}
      <div style={{ marginTop: "20px", fontSize: "1.2em", fontWeight: "bold" }}>
        <p>**Cost Estimates**</p>
        <p>Annual: ${costEstimates.annual}</p>
        <p>Quarterly: ${costEstimates.quarterly}</p>
        <p>Monthly: ${costEstimates.monthly}</p>
      </div>

      {/* Generate Sales Pitch Button */}
      <button
        onClick={() => setShowPopup(true)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1em",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Generate Sales Pitch
      </button>

      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            maxWidth: "500px",
            borderRadius: "8px",
          }}
        >
          <h3>Sales Pitch</h3>
          <p>{generateSalesPitch()}</p>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "1em",
              backgroundColor: "#DC3545",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default BookkeepingEstimator;
