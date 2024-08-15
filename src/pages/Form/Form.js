import React from 'react';
import './Form.css';

const Form = ({ setFormData, setFormStatus }) => {
  const [formData, setLocalFormData] = React.useState({
    age: '',
    weight: '',
    heightFeet: '',
    heightInches: '',
    gender: 'male',
    gymGoerStatus: 'beginner',
    includeAbs: false,
    otherInformation: 'none'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the descriptive string
    const description = `Create a workout plan with age ${formData.age}, height ${formData.heightFeet} feet ${formData.heightInches} inches, weight ${formData.weight} kg, gender ${formData.gender}, gym-goer type ${formData.gymGoerStatus}, and ${formData.includeAbs ? 'Yes' : 'No'} include abs exercises. Additional information: ${formData.otherInformation}.`;
    
    setFormData(description); // Pass the descriptive string to parent
    console.log('Form Data:', description); // Print form data to the console
    setFormStatus(1);
  };

  return (
    <div className="form-container">
      <h2>Fitness Profile Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            className="form-control"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Height:</label>
          <div className="height-group">
            <input
              type="number"
              name="heightFeet"
              placeholder="Feet"
              className="form-control"
              value={formData.heightFeet}
              onChange={handleChange}
            />
            <input
              type="number"
              name="heightInches"
              placeholder="Inches"
              className="form-control"
              value={formData.heightInches}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gymGoerStatus"
                value="beginner"
                checked={formData.gymGoerStatus === 'beginner'}
                onChange={handleChange}
              />
              Beginner
            </label>
            <label>
              <input
                type="radio"
                name="gymGoerStatus"
                value="intermediate"
                checked={formData.gymGoerStatus === 'intermediate'}
                onChange={handleChange}
              />
              Intermediate
            </label>
            <label>
              <input
                type="radio"
                name="gymGoerStatus"
                value="advanced"
                checked={formData.gymGoerStatus === 'advanced'}
                onChange={handleChange}
              />
              Advanced
            </label>
          </div>
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="includeAbs">Include Abs Exercises:</label>
          <input
            type="checkbox"
            id="includeAbs"
            name="includeAbs"
            className="form-control"
            checked={formData.includeAbs}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="otherInformation">Other Information:</label>
          <input
            type="text"
            id="otherInformation"
            name="otherInformation"
            className="form-control"
            value={formData.otherInformation}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Form;
