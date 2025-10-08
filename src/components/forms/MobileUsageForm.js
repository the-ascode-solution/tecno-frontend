import React from 'react';
import { DropdownWithOther, MultiDropdownWithOther } from '../FormComponents';

const MobileUsageForm = ({ data, onChange }) => {
  const phoneBrands = [
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'oppo', label: 'OPPO' },
    { value: 'vivo', label: 'vivo' },
    { value: 'tecno', label: 'TECNO' },
    { value: 'infinix', label: 'Infinix' },
    { value: 'realme', label: 'Realme' },
    { value: 'redmi', label: 'Redmi' },
    { value: 'other', label: 'Other' }
  ];

  const phoneFunctions = [
    { value: 'camera-video', label: 'Camera/Video' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'communication', label: 'Communication apps (WhatsApp, video chat)' },
    { value: 'study-work', label: 'Study/Work (homework, research)' },
    { value: 'social-media', label: 'Social Media Apps (YouTube, Instagram, FaceBook, Tiktok etc)' },
    { value: 'watching-videos', label: 'Watching videos/TV' },
    { value: 'other', label: 'Other' }
  ];

  const phoneChangeFrequency = [
    { value: 'less-than-1-year', label: 'Less than 1 year' },
    { value: '1-2-years', label: 'Every 1-2 years' },
    { value: '2-3-years', label: 'Every 2-3 years' },
    { value: 'more-than-3-years', label: 'More than 3 years' }
  ];

  const tecnoExperience = [
    { value: 'yes-used', label: 'Yes, I\'ve used it' },
    { value: 'heard-of', label: 'Heard of it (but not used)' },
    { value: 'never-heard', label: 'Never heard of it' }
  ];

  const tecnoExperienceRating = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'average', label: 'Average' },
    { value: 'needs-improvement', label: 'Needs Improvement' }
  ];

  return (
    <div className="mobile-usage-form">
      <DropdownWithOther
        label="Which phone brand are you currently using?"
        name="currentPhoneBrand"
        options={phoneBrands}
        value={data.currentPhoneBrand}
        onChange={onChange}
        placeholder="Select your phone brand"
        required={true}
        otherFieldName="currentPhoneBrandOther"
        otherValue={data.currentPhoneBrandOther}
      />

      <MultiDropdownWithOther
        label="What are the top 3 functions you use on your phone? (Select up to 3)"
        name="topPhoneFunctions"
        options={phoneFunctions}
        values={data.topPhoneFunctions || []}
        onChange={onChange}
        otherFieldName="topPhoneFunctionsOther"
        otherValue={data.topPhoneFunctionsOther}
      />

      <DropdownWithOther
        label="How often do you change your phone?"
        name="phoneChangeFrequency"
        options={phoneChangeFrequency}
        value={data.phoneChangeFrequency}
        onChange={onChange}
        placeholder="Select frequency"
        required={true}
      />

      <DropdownWithOther
        label="Have you used or heard of TECNO before?"
        name="tecnoExperience"
        options={tecnoExperience}
        value={data.tecnoExperience}
        onChange={onChange}
        placeholder="Select your experience"
        required={true}
      />

      {data.tecnoExperience === 'yes-used' && (
        <DropdownWithOther
          label="If yes, please elaborate on your experience?"
          name="tecnoExperienceRating"
          options={tecnoExperienceRating}
          value={data.tecnoExperienceRating}
          onChange={onChange}
          placeholder="Select your rating"
          required={true}
        />
      )}
    </div>
  );
};

export default MobileUsageForm;
