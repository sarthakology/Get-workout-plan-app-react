import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ResultPage from './pages/ResultPage/ResultPage';
import Form from './pages/Form/Form';

function App() {
  const [workoutText, setWorkoutText] = useState('Loading workout plan...');
  const [formStatus, setFormStatus] = useState(0);
  const [formData, setFormData] = useState({});
  const KEY = 'AIzaSyDzph1G8TKz7f70NREOwurT-zwcP5LD-kQ';

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      if (Object.keys(formData).length === 0) return; // Exit if formData is empty

      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${KEY}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: formData,
                  },
                ],
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const generatedText =
          response.data.candidates[0]?.content?.parts[0]?.text || 'No workout plan available.';
        setWorkoutText(generatedText);
      } catch (error) {
        console.error('Error fetching workout plan:', error);
        setWorkoutText('Failed to load workout plan.');
      }
    };

    fetchWorkoutPlan();
  }, [formData]);

  return (
    <div className="app">
      {formStatus === 0 ? (
        <Form setFormData={setFormData} setFormStatus={setFormStatus} />
      ) : (
        <ResultPage workoutText={workoutText} />
      )}
    </div>
  );
}

export default App;
