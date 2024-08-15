import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ResultPage from './pages/ResultPage/ResultPage.js';
import Form from './pages/Form/Form.js';

function App() {
  const [workoutText, setWorkoutText] = useState('Loading workout plan...');
  const [formStatus, setFormStatus] = useState(0);
  const [formData, setFormData] = useState({});
  const KEY = 'AIzaSyDzph1G8TKz7f70NREOwurT-zwcP5LD-kQ';

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await axios.post(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${KEY}`, {
          contents: [{
            parts: [{
              text: `Create a workout plan with age 22, height 5 feet 10 inches, weight 75 kg, gender male, gym-goer type beginner, and Yes include abs exercises. Additional information: .`,
            }],
          }],
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const generatedText = response.data.candidates[0]?.content?.parts[0]?.text || 'No workout plan available.';
        setWorkoutText(generatedText);
      } catch (error) {
        console.error('Error fetching workout plan:', error);
        setWorkoutText('Failed to load workout plan.');
      }
    };

    fetchWorkoutPlan();
  }, []);

  const handleClick = () => {
    setFormStatus(1);
  };

  return (<>
    <div className="app">
      {formStatus === 0 ? (
        <Form setFormData={setFormData} setFormStatus={setFormStatus} />
      ) : (
      <ResultPage workoutText={workoutText} />
      )}
    </div> 

    </>);
}

export default App;
