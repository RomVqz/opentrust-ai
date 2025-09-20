import React from 'react';

const getColor = (score) => {
  if (score < 30) return 'bg-green-500';
  if (score < 70) return 'bg-yellow-400';
  return 'bg-red-500';
};

const RiskMeter = ({ score }) => {
  return (
    <div className="w-32 h-4 bg-gray-200 rounded">
      <div
        className={`h-4 rounded ${getColor(score)}`}
        style={{ width: `${score}%` }}
        title={`Riesgo: ${score}/100`}
      ></div>
    </div>
  );
};

export default RiskMeter;
