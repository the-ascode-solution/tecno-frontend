import React from 'react';
import { RankingComponent, DropdownWithOther } from '../FormComponents';
import ColorPicker from '../ColorPicker';

const PhonePreferencesForm = ({ data, onChange }) => {
  const phoneFeatures = [
    { value: 'intelligent-camera', label: 'Camera Features (Zoom, Night Mode, 3D Photos)' },
    { value: 'long-battery', label: 'Long-lasting Battery' },
    { value: 'fast-charging', label: 'Fast Charging' },
    { value: 'slim-design', label: 'Slim & Light Design' },
    { value: 'durable', label: 'Strong/Durable (Dust & Water Resistant)' },
    { value: 'high-display', label: 'HD Display + High Refresh Rate' },
    { value: 'high-performance', label: 'High Performance & Gaming Experience' },
    { value: 'ai-features', label: 'AI Features (AI Camera, AI Assistant Ella)' }
  ];

  const phoneBudget = [
    { value: '20-30k', label: '20,000–30,000' },
    { value: '31-45k', label: '31,000–45,000' },
    { value: '46-60k', label: '46,000–60,000' },
    { value: '61-80k', label: '61,000–80,000' },
    { value: '81-100k', label: '81,000–100,000' },
    { value: 'above-100k', label: 'Above 100,000' }
  ];

  const phoneColors = [
    { value: 'amazon-green', label: 'Amazon Green', colorCode: '#297666' },
    { value: 'willow-grove', label: 'Willow Grove', colorCode: '#5D6655' },
    { value: 'granite', label: 'Granite', colorCode: '#5E5E5D' },
    { value: 'wisteria-purple', label: 'Wisteria Purple', colorCode: '#C799CE' },
    { value: 'pale-silver', label: 'Pale Silver', colorCode: '#D7D4CA' },
    { value: 'sea-green', label: 'Sea Green', colorCode: '#2E987E' },
    { value: 'olive-grove', label: 'Olive Grove', colorCode: '#485445' },
    { value: 'carbon', label: 'Carbon', colorCode: '#454545' },
    { value: 'pastel-purple', label: 'Pastel Purple', colorCode: '#CBB4E0' },
    { value: 'dusty-silver', label: 'Dusty Silver', colorCode: '#ADABAA' }
  ];

  return (
    <div className="phone-preferences-form">
      <RankingComponent
        label="Please rank these features from most important (1) to least important (8):"
        name="phoneFeaturesRanking"
        options={phoneFeatures}
        rankings={data.phoneFeaturesRanking || {}}
        onChange={onChange}
      />

      <DropdownWithOther
        label="If you plan to buy a new phone in the next year, what's your budget?"
        name="phoneBudget"
        options={phoneBudget}
        value={data.phoneBudget}
        onChange={onChange}
        placeholder="Select your budget range"
        required={true}
      />

      <ColorPicker
        label="Which colors would you like for the new phone? (Select all you like)"
        name="preferredPhoneColors"
        options={phoneColors}
        values={data.preferredPhoneColors || []}
        columns={5}
        onChange={onChange}
      />
    </div>
  );
};

export default PhonePreferencesForm;
