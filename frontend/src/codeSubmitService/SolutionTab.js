import React from 'react';

const SolutionTab = ({ solution }) => {
  // Check if the solution is available
  const solutionContent = solution || "Solution is not available for this question.";

  return (
    <div className="solution-tab">
      <h3>Solution</h3>
      <div className="solution-code">
        {/* Render the solution here */}
        <p>{solutionContent}</p>
      </div>
    </div>
  );
};

export default SolutionTab;
