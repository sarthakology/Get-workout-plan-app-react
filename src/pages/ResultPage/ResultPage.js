import React from 'react';
import './ResultPage.css';

const ResultPage = ({ workoutText }) => {
  const formatText = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.trim().startsWith('* ')) {
        return (
          <li key={index}>
            {line.slice(2).split(/(\*\*.*?\*\*)/).map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
              } else {
                return part;
              }
            })}
          </li>
        );
      }

      const parts = line.split(/(\*\*.*?\*\*)/).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        } else {
          return part;
        }
      });

      return (
        <React.Fragment key={index}>
          {parts}
          <br />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="result-page">
      <h1>Workout Plan</h1>
      <ul className="workout-text">{formatText(workoutText)}</ul>
    </div>
  );
};

export default ResultPage;
