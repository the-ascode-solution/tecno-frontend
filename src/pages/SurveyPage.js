import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSurveyStore from '../store/surveyStore';
import BasicInfoForm from '../components/forms/BasicInfoForm';
import SocialMediaForm from '../components/forms/SocialMediaForm';
import MobileUsageForm from '../components/forms/MobileUsageForm';
import SkillsWorkForm from '../components/forms/SkillsWorkForm';
import PhonePreferencesForm from '../components/forms/PhonePreferencesForm';
import AmbassadorForm from '../components/forms/AmbassadorForm';
import ContactInfoForm from '../components/forms/ContactInfoForm';
import SuggestionsForm from '../components/forms/SuggestionsForm';
import './SurveyPage.css';

const SurveyPage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const currentPage = parseInt(page) - 1; // Convert to 0-based index
  const { surveyData, updateSurveyData, submitSurvey, saveProgress } = useSurveyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageTitles = [
    'Basic Information',
    'Social Media Habits', 
    'Mobile Phone Usage',
    'Skills & Work',
    'What Matters Most in a New Phone',
    'TECNO Campus Brand Ambassador Program',
    'Contact Information',
    'Suggestions (Optional)'
  ];

  const handleDataChange = (fieldName, value) => {
    updateSurveyData({ [fieldName]: value });
  };

  const handleNext = async () => {
    if (currentPage < 7) {
      // Ambassador page (page 5): only 'yes' continues through contact/suggestions; else skip to submit
      if (currentPage === 5 && surveyData.interestedInAmbassador !== 'yes') {
        try {
          await saveProgress();
        } catch (error) {
          console.error('Failed to save progress:', error);
        }
        navigate('/survey/8'); // Skip to submit page (page 8)
        return;
      }
      
      // Save progress before navigating
      try {
        await saveProgress();
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
      navigate(`/survey/${currentPage + 2}`);
    }
  };

  const handleSkip = async () => {
    // Only show skip button on Ambassador page (page 5)
    if (currentPage === 5) {
      try {
        // Mark that user skipped the Ambassador page
        updateSurveyData({ interestedInAmbassador: 'skipped' });
        await saveProgress();
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
      navigate('/survey/8'); // Skip to submit page (page 8)
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      // Special logic for submit page (page 7) - if user came from Ambassador page skip, go back to Ambassador page
      if (currentPage === 7) {
        // Check if user came from Ambassador page (skipped or empty)
        if (surveyData.interestedInAmbassador !== 'yes') {
          navigate('/survey/6'); // Go back to Ambassador page
          return;
        }
      }
      navigate(`/survey/${currentPage}`);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Save final progress before submitting
      await saveProgress();
      
      const result = await submitSurvey();
      if (result.success) {
        if (result.fallback) {
          // Show fallback message but still navigate to thank you page
          alert(`Survey saved successfully! ${result.message}`);
        }
        navigate('/thank-you');
      } else {
        alert(`Error submitting survey: ${result.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Survey submission error:', error);
      alert(`Error submitting survey: ${error.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch (currentPage) {
      case 0:
        return <BasicInfoForm data={surveyData} onChange={handleDataChange} />;
      case 1:
        return <SocialMediaForm data={surveyData} onChange={handleDataChange} />;
      case 2:
        return <MobileUsageForm data={surveyData} onChange={handleDataChange} />;
      case 3:
        return <SkillsWorkForm data={surveyData} onChange={handleDataChange} />;
      case 4:
        return <PhonePreferencesForm data={surveyData} onChange={handleDataChange} />;
      case 5:
        return <AmbassadorForm data={surveyData} onChange={handleDataChange} onSkip={handleSkip} />;
      case 6:
        return <ContactInfoForm data={surveyData} onChange={handleDataChange} />;
      case 7:
        return <SuggestionsForm data={surveyData} onChange={handleDataChange} />;
      default:
        return <div>Page not found</div>;
    }
  };

  const isLastPage = currentPage === 7;
  // eslint-disable-next-line no-unused-vars
  const isFirstPage = currentPage === 0;

  return (
    <div
      className="survey-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/form.png)`
      }}
    >
      <div className="survey-content">
        
        <div className="form-container">
          <h2 className="section-title">{pageTitles[currentPage]}</h2>
          {renderForm()}
        </div>
      </div>

      <div className="survey-footer">
        <div className="footer-buttons">
          <button 
            className="nav-button"
            onClick={handlePrevious}
            disabled={isSubmitting}
          >
            ← Back
          </button>
          
          <button 
            className={`nav-button ${isSubmitting ? 'submitting' : ''}`}
            onClick={isLastPage ? handleSubmit : handleNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : (isLastPage ? 'Submit' : 'Next ->')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
