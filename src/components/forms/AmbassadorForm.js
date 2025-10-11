import React from 'react';
import { DropdownWithOther, MultiDropdownWithOther } from '../FormComponents';

const AmbassadorForm = ({ data, onChange, onSkip }) => {
  const interestedInAmbassador = [
    { value: 'yes', label: 'Yes' },
  ];

  const ambassadorStrengths = [
    { value: 'large-social-circle', label: 'Large social circle (friends, followers, active on campus)' },
    { value: 'content-creation', label: 'Good at content creation (videos, photos, reviews)' },
    { value: 'sharing-engaging', label: 'Enjoy sharing and engaging with others' },
    { value: 'tech-interested', label: 'Interested in technology/mobile phones' },
    { value: 'campus-events', label: 'Experienced in campus events (clubs, promotions)' },
    { value: 'other', label: 'Other' }
  ];

  const ambassadorBenefits = [
    { value: 'free-trial', label: 'Free trial of TECNO phones' },
    { value: 'merchandise', label: 'Exclusive merchandise (T-shirts, bags, etc.)' },
    { value: 'training', label: 'Training in content creation' },
    { value: 'internship', label: 'Internship/Job opportunity' },
    { value: 'certificates', label: 'Experience Certificates' },
    { value: 'other', label: 'Other' }
  ];


  const handleAmbassadorInterestChange = (name, value) => {
    onChange(name, value);
    // Clear any 'skipped' status when user makes a selection
    if (value !== 'skipped') {
      // The value is already being set by the onChange call above
    }
  };

  return (
    <div className="ambassador-form">
      <div className="ambassador-question-container">
        <div className="ambassador-question">
          <p className="question-text">
            Would you like to become a TECNO Campus Ambassador (helping with campus events & sharing product experiences)?
          </p>
        </div>
        
        <div className="ambassador-buttons-container">
          {data.interestedInAmbassador !== 'yes' && (
            <button 
              className="yes-button"
              onClick={() => handleAmbassadorInterestChange('interestedInAmbassador', 'yes')}
            >
              Yes
            </button>
          )}
          
          {data.interestedInAmbassador !== 'yes' && (
            <button 
              className="skip-button-inline"
              onClick={onSkip}
            >
              Skip →
            </button>
          )}
        </div>
      </div>

      {data.interestedInAmbassador === 'yes' && (
        <>
          <MultiDropdownWithOther
            label="If yes, what are your strengths? (Select all that apply)"
            name="ambassadorStrengths"
            options={ambassadorStrengths}
            values={data.ambassadorStrengths || []}
            onChange={onChange}
            otherFieldName="ambassadorStrengthsOther"
            otherValue={data.ambassadorStrengthsOther}
          />

          <MultiDropdownWithOther
            label="What benefits would you like as a Campus Ambassador? (Select all that apply)"
            name="ambassadorBenefits"
            options={ambassadorBenefits}
            values={data.ambassadorBenefits || []}
            onChange={onChange}
            otherFieldName="ambassadorBenefitsOther"
            otherValue={data.ambassadorBenefitsOther}
          />

        </>
      )}
    </div>
  );
};

export default AmbassadorForm;
