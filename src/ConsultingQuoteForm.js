import React, { useState } from "react";

const ConsultingQuoteForm = () => {
  const categories = [
    "Branding and Marketing",
    "Business Bookkeeping",
    "Business Tax Prep",
    "Employee Onboarding Services",
    "Client Onboarding Services",
    "Business Website",
    "Custom Documentation Services",
    "Tax and Financial Strategy",
    "Operations Strategy",
  ];

  const budgetOptions = Array.from({ length: 21 }, (_, i) => i * 1000); // Generate 0 to 20000 in steps of 1000

  const [formData, setFormData] = useState(
    categories.reduce((acc, category) => {
      acc[category] = { min: 0, max: 0 };
      return acc;
    }, {})
  );

  const calculateTotals = () => {
    const minTotal = Object.values(formData).reduce(
      (sum, { min }) => sum + min,
      0
    );
    const maxTotal = Object.values(formData).reduce(
      (sum, { max }) => sum + max,
      0
    );
    return { minTotal, maxTotal };
  };

  const handleSelectChange = (category, type, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [type]: parseInt(value, 10),
      },
    }));
  };

  const { minTotal, maxTotal } = calculateTotals();

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Consulting Quote Calculator</h2>
      <form>
        {categories.map((category) => (
          <div key={category} style={{ marginBottom: "20px" }}>
            <h4>{category}</h4>
            <label>
              Minimum Budget:
              <select
                value={formData[category].min}
                onChange={(e) =>
                  handleSelectChange(category, "min", e.target.value)
                }
              >
                {budgetOptions.map((option) => (
                  <option key={`min-${option}`} value={option}>
                    ${option.toLocaleString()}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Maximum Budget:
              <select
                value={formData[category].max}
                onChange={(e) =>
                  handleSelectChange(category, "max", e.target.value)
                }
              >
                {budgetOptions.map((option) => (
                  <option key={`max-${option}`} value={option}>
                    ${option.toLocaleString()}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </form>
      <div style={{ marginTop: "20px", fontWeight: "bold" }}>
        <p>Minimum Total: ${minTotal.toLocaleString()}</p>
        <p>Maximum Total: ${maxTotal.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ConsultingQuoteForm;
