import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSurveyStore from '../store/surveyStore';
import './ThankYouPage.css';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const { resetSurvey } = useSurveyStore();

  const handleStartNewSurvey = () => {
    resetSurvey();
    navigate('/');
  };

  return (
    <div className="thank-you-page">
      <div className="thank-you-container">
        <div className="success-icon">✓</div>
        <h1>Thank You!</h1>
        <p className="thank-you-message">
          Your feedback has been successfully submitted. We appreciate you taking the time to complete our survey.
        </p>
        
        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>Show proof of completion to claim your gift at the TECNO booth</li>
            <li>Join our Facebook fan community for updates on TECNO events</li>
            <li>Keep an eye out for exclusive TECNO campus activities</li>
          </ul>
        </div>

        <button className="new-survey-button" onClick={handleStartNewSurvey}>
          Start New Survey
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
