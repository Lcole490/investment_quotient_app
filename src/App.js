import React, { useState } from "react";
import { motion } from "framer-motion";
import ServiceEstimator from "./ServiceEstimator";
import BookkeepingEstimator from "./BookkeepingEstimator";
import ConsultingQuoteForm from "./ConsultingQuoteForm";
import { Calculator, FileText, Clipboard } from "lucide-react"; // Assuming icons for the tabs

const tabs = [
  { id: "serviceEstimator", label: "Service Estimator", icon: Calculator },
  { id: "bookkeepingEstimator", label: "Bookkeeping Estimator", icon: FileText },
  { id: "consultingQuoteForm", label: "Consulting Quote", icon: Clipboard },
];

const App = () => {
  const [activeTab, setActiveTab] = useState("serviceEstimator");

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-emerald-400 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Investment Quotient App
        </motion.h1>

        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Render the active tab content */}
        {activeTab === "serviceEstimator" && <ServiceEstimator />}
        {activeTab === "bookkeepingEstimator" && <BookkeepingEstimator />}
        {activeTab === "consultingQuoteForm" && <ConsultingQuoteForm />}
      </div>
    </div>
  );
};

export default App;