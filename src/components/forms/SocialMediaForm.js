import React from 'react';
import { MultiDropdownWithOther, DropdownWithOther } from '../FormComponents';

const SocialMediaForm = ({ data, onChange }) => {
  const socialMediaPlatforms = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'snapchat', label: 'Snapchat' },
    { value: 'other', label: 'Other' }
  ];

  const timeSpentOptions = [
    { value: '0-1-hour', label: '0-1 hour' },
    { value: '2-3-hours', label: '2-3 hours' },
    { value: '4-5-hours', label: '4-5 hours' },
    { value: '6-plus-hours', label: '6+ hours' }
  ];

  const followsTechOptions = [
    { value: 'often', label: 'Often' },
    { value: 'sometimes', label: 'Sometimes' },
    { value: 'rarely', label: 'Rarely' },
    { value: 'never', label: 'Never' }
  ];

  const techUpdateSources = [
    { value: 'influencers', label: 'Influencers/Bloggers' },
    { value: 'friends', label: 'Friends' },
    { value: 'official-pages', label: 'Official brand pages' },
    { value: 'tech-websites', label: 'Tech websites/blogs' },
    { value: 'family', label: 'Family' },
    { value: 'retail-staff', label: 'Retail shop staff' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="social-media-form">
      <MultiDropdownWithOther
        label="Which social media platforms do you use most? (Select all that apply)"
        name="socialMediaPlatforms"
        options={socialMediaPlatforms}
        values={data.socialMediaPlatforms || []}
        onChange={onChange}
        otherFieldName="socialMediaPlatformsOther"
        otherValue={data.socialMediaPlatformsOther}
      />

      <DropdownWithOther
        label="How much time do you usually spend on social media each day?"
        name="timeSpentOnSocialMedia"
        options={timeSpentOptions}
        value={data.timeSpentOnSocialMedia}
        onChange={onChange}
        placeholder="Select time spent"
        required={true}
      />

      <DropdownWithOther
        label="Do you follow technology/mobile phone content?"
        name="followsTechContent"
        options={followsTechOptions}
        value={data.followsTechContent}
        onChange={onChange}
        placeholder="Select your frequency"
        required={true}
      />

      <MultiDropdownWithOther
        label="Where do you usually get technology/mobile phone updates from? (Select all that apply)"
        name="techUpdateSources"
        options={techUpdateSources}
        values={data.techUpdateSources || []}
        onChange={onChange}
        otherFieldName="techUpdateSourcesOther"
        otherValue={data.techUpdateSourcesOther}
      />
    </div>
  );
};

export default SocialMediaForm;
