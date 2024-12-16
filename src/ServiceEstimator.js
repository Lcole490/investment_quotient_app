import React, { useState } from 'react';

const ServiceEstimator = () => {
  const basePrices = [
    { label: 'Form 1040', value: 400 },
    { label: 'Form 1040 (Student)', value: 285 },
    { label: 'Form 1040NR', value: 500 },
    { label: 'Form 1040SR', value: 335 },
    { label: 'Form 1040X (Current Client)', value: 275 },
    { label: 'Form 1040X (New Client/Full Service)', value: 400 },
    { label: 'Schedule C / Self-Employed', value: 500 },
  ];

  const scheduleOptions = [
    { key: 'A', label: 'Option A', value: 40 },
    { key: 'B', label: 'Option B', value: 20 },
    { key: 'C', label: 'Option C', value: 25 },
    { key: 'D', label: 'Option D', value: 55 },
    { key: 'E', label: 'Option E', value: 35 },
    { key: 'H', label: 'Option H', value: 100 },
    { key: 'K1', label: 'Option K1', value: 75 },
    { key: 'SE', label: 'Option SE', value: 10 },
  ];

  const otherOptions = [
    { key: '1095A', label: '1095A', value: 15 },
    { key: '1098C', label: '1098C', value: 15 },
    { key: '1099C', label: '1099C', value: 35 },
    { key: '1099DIV', label: '1099DIV', value: 25 },
    { key: '1099G', label: '1099G', value: 25 },
    { key: '1099INT', label: '1099INT', value: 15 },
    { key: '1099NEC', label: '1099NEC', value: 20 },
    { key: '1099MISC', label: '1099MISC', value: 20 },
    { key: '1099R', label: '1099R', value: 20 },
    { key: '1099SA', label: '1099SA', value: 15 },
    { key: 'SaleOfHome', label: 'Sale of Home', value: 125 },
    { key: 'W2', label: 'W2', value: 15 },
    { key: 'W2G', label: 'W2G', value: 25 },
    { key: 'W7', label: 'W7', value: 400 },
  ];

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming',
  ];

  const [basePrice, setBasePrice] = useState(0);
  const [scheduleSelections, setScheduleSelections] = useState([]);
  const [otherSelections, setOtherSelections] = useState([]);
  const [stateSelections, setStateSelections] = useState([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    const schedulesTotal = scheduleSelections.reduce(
      (sum, item) => sum + item.quantity * scheduleOptions.find((o) => o.key === item.key).value,
      0
    );
    const othersTotal = otherSelections.reduce(
      (sum, item) => sum + item.quantity * otherOptions.find((o) => o.key === item.key).value,
      0
    );
    const statesTotal = stateSelections.length * 35;

    setTotal(basePrice + schedulesTotal + othersTotal + statesTotal);
  };

  const removeState = (state) => {
    setStateSelections(stateSelections.filter((s) => s !== state));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Service Estimator</h1>

      {/* Base Price Dropdown */}
      <fieldset style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
        <legend>Base Price:</legend>
        <select
          value={basePrice}
          onChange={(e) => setBasePrice(Number(e.target.value))}
          style={{ padding: '5px', width: '100%', fontSize: '16px' }}
        >
          <option value={0}>Select a Base Price</option>
          {basePrices.map((price) => (
            <option key={price.label} value={price.value}>
              {price.label} (${price.value})
            </option>
          ))}
        </select>
      </fieldset>

      {/* Schedules Section */}
      <OptionsSection
        title="Schedules"
        options={scheduleOptions}
        selections={scheduleSelections}
        setSelections={setScheduleSelections}
      />

      {/* Other Options Section */}
      <OptionsSection
        title="Other Options"
        options={otherOptions}
        selections={otherSelections}
        setSelections={setOtherSelections}
      />

      {/* State Selection */}
      <fieldset style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
        <legend>State Filing:</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {states.map((state) => (
            <button
              key={state}
              onClick={() => setStateSelections([...stateSelections, state])}
              disabled={stateSelections.includes(state)}
              style={{
                padding: '5px 10px',
                backgroundColor: stateSelections.includes(state) ? '#ccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                cursor: stateSelections.includes(state) ? 'not-allowed' : 'pointer',
              }}
            >
              {state}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '10px' }}>
          {stateSelections.map((state) => (
            <div key={state} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{state}</span>
              <button
                onClick={() => removeState(state)}
                style={{
                  padding: '2px 5px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Total Calculation */}
      <button
        onClick={calculateTotal}
        style={{
          marginTop: '20px',
          padding: '10px',
          width: '100%',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Calculate Total
      </button>

      {/* Total Display */}
      <div style={{ marginTop: '20px', fontSize: '1.2em', fontWeight: 'bold' }}>
        Total Estimate: ${total}
      </div>
    </div>
  );
};

const OptionsSection = ({ title, options, selections, setSelections }) => {
  const handleOptionChange = (key, quantity) => {
    const existingIndex = selections.findIndex((item) => item.key === key);
    if (existingIndex !== -1) {
      const updatedSelections = [...selections];
      updatedSelections[existingIndex].quantity = quantity;
      setSelections(updatedSelections);
    } else {
      setSelections([...selections, { key, quantity }]);
    }
  };

  return (
    <fieldset style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
      <legend>{title}:</legend>
      {options.map((option) => (
        <div key={option.key} style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              onChange={(e) => {
                if (!e.target.checked) {
                  setSelections(selections.filter((item) => item.key !== option.key));
                } else {
                  setSelections([...selections, { key: option.key, quantity: 1 }]);
                }
              }}
              style={{ marginRight: '10px' }}
            />
            {option.label} (${option.value})
          </label>
          {selections.find((item) => item.key === option.key) && (
            <input
              type="number"
              min="1"
              value={
                selections.find((item) => item.key === option.key)?.quantity || 1
              }
              onChange={(e) =>
                handleOptionChange(option.key, parseInt(e.target.value) || 1)
              }
              style={{ marginLeft: '10px', width: '60px' }}
            />
          )}
        </div>
      ))}
    </fieldset>
  );
};

export default ServiceEstimator;
