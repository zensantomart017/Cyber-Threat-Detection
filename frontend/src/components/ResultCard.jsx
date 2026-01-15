import React from "react";

const ResultCard = ({ prediction, probability }) => {
  const prob = parseFloat(probability);

  return (
    <div className="mt-4 p-4 border border-blue-500 rounded-lg">
      <h3 className="text-blue-600 font-semibold text-lg">Prediction Result</h3>

      <p>
        <strong>Prediction:</strong>
        {prediction ? prediction : "Unknown"}
      </p>

      <p>
        <strong>Probability:</strong>
        {isNaN(prob) ? "0.00%" : (prob * 100).toFixed(2) + "%"}
      </p>
    </div>
  );
};

export default ResultCard;
