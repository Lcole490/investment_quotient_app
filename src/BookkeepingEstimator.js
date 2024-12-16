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
    <div className="p-8 max-w-3xl mx-auto font-sans bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-blue-600">Bookkeeping Services Quote Estimator</h2>

      {/* Base Price Dropdown */}
      <label className="block mb-6">
        <span className="text-lg text-gray-800">Base Price:</span>
        <select
          value={basePrice}
          onChange={(e) => setBasePrice(Number(e.target.value))}
          className="block w-full p-3 mt-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
        >
          {[0, 500, 750, 1000, 1250, 1500, 1750, 2000].map((price) => (
            <option key={price} value={price}>
              ${price}
            </option>
          ))}
        </select>
      </label>

      {/* Annual Earnings Input */}
      <label className="block mb-6">
        <span className="text-lg text-gray-800">Company Annual Earnings Potential (Enter without commas):</span>
        <input
          type="number"
          value={annualEarnings}
          onChange={(e) => setAnnualEarnings(Number(e.target.value))}
          className="block w-full p-3 mt-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
          placeholder="Enter annual earnings"
        />
      </label>

      {/* AEP Factor Slider */}
      <label className="block mb-6">
        <span className="text-lg text-gray-800">AEP Factor Multiplier ({(aepFactor * 100).toFixed(2)}%):</span>
        <input
          type="range"
          min="0.000"
          max="0.02"
          step="0.001"
          value={aepFactor}
          onChange={(e) => setAepFactor(Number(e.target.value))}
          className="block w-full mt-2"
        />
      </label>

      {/* Number of Transactions Input */}
      <label className="block mb-6">
        <span className="text-lg text-gray-800">Number of Transactions: (Per Year Estimation)</span>
        <input
          type="number"
          value={numTransactions}
          onChange={(e) => setNumTransactions(Number(e.target.value))}
          className="block w-full p-3 mt-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
          placeholder="Enter number of transactions"
        />
      </label>

      {/* Transaction Rate Slider */}
      <label className="block mb-6">
        <span className="text-lg text-gray-800">Rate Charge per Transaction (${transactionRate.toFixed(2)}):</span>
        <input
          type="range"
          min="0.25"
          max="2"
          step="0.05"
          value={transactionRate}
          onChange={(e) => setTransactionRate(Number(e.target.value))}
          className="block w-full mt-2"
        />
      </label>

      {/* Bookkeeper Hourly Rate Dropdown */}
      <label className="block mb-6">
        <span className="text-lg text-gray-800">Bookkeeper Hourly Rate:</span>
        <select
          value={bookkeeperRate}
          onChange={(e) => setBookkeeperRate(Number(e.target.value))}
          className="block w-full p-3 mt-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
        >
          {[25, 30, 35, 40, 45, 50].map((rate) => (
            <option key={rate} value={rate}>
              ${rate}/hour
            </option>
          ))}
        </select>
      </label>

      {/* Bookkeeper Man Hours Dropdown */}
      <label className="block mb-8">
        <span className="text-lg text-gray-800">Bookkeeper Man Hours:</span>
        <select
          value={manHours}
          onChange={(e) => setManHours(Number(e.target.value))}
          className="block w-full p-3 mt-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
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
      <div className="mt-8 font-semibold text-lg text-gray-800">
        <p>**Cost Estimates**</p>
        <p className="text-xl">Annual: ${costEstimates.annual}</p>
        <p className="text-xl">Quarterly: ${costEstimates.quarterly}</p>
        <p className="text-xl">Monthly: ${costEstimates.monthly}</p>
      </div>

      {/* Generate Sales Pitch Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="mt-6 px-8 py-3 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Generate Sales Pitch
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Sales Pitch</h3>
            <p className="text-lg text-gray-700">{generateSalesPitch()}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 px-8 py-3 text-lg bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookkeepingEstimator;