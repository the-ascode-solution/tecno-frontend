import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSurveyStore from '../store/surveyStore';
import { LogoImage } from '../assets';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { startFreshSurvey } = useSurveyStore();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartFeedback = async () => {
    setIsStarting(true);
    try {
      // Start fresh survey (clears any previous data)
      console.log('🆕 Starting fresh survey...');
      const result = startFreshSurvey();
      
      if (result.success) {
        console.log('✅ Fresh survey started successfully');
        navigate('/survey/1');
      } else {
        alert('Failed to start survey. Please try again.');
      }
    } catch (error) {
      console.error('Error starting survey:', error);
      alert('Failed to start survey. Please try again.');
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div
      className="homepage"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/form.png), url(${process.env.PUBLIC_URL}/Untitled%20design.png)` }}
    >
      <div className="main-card">
        <h1 className="main-title">Welcome to the TECNO TRIBE Survey Form</h1>
        
        <div className="intro-text">
          <p>
            Hello! To better understand your needs and improve TECNO campus activities and product experience, 
            we invite you to take part in this short survey. It will only take 3-5 minutes, and all responses 
            will be used only for activity and product research. Thank you for your time and honest feedback!
          </p>
        </div>
        
        <div className="logo-container">
          <div className="logo-grid">
            <div className="logo-left">
              <img 
                src={LogoImage} 
                alt="TECNO Logo" 
                className="welcome-logo"
              />
            </div>
            <div className="logo-right">
              <div className="tagline">Catch the Vibe<br />Lead the Tribe</div>
            </div>
          </div>
        </div>
        
        <button 
          className="start-button" 
          onClick={handleStartFeedback}
          disabled={isStarting}
        >
          {isStarting ? 'Starting...' : 'Start Feedback'}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
