import React from 'react';
import { TextInput, DropdownWithOther, Dropdown } from '../FormComponents';

const ContactInfoForm = ({ data, onChange }) => {
  const socialMediaPlatformOptions = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'snapchat', label: 'Snapchat' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'other', label: 'Other' }
  ];

  const followerCountOptions = [
    { value: '<500', label: '<500' },
    { value: '500-1000', label: '500–1000' },
    { value: '1000-5000', label: '1000–5000' },
    { value: '5000-10000', label: '5000–10000' },
    { value: '10000+', label: '10000+' }
  ];

  return (
    <div className="contact-info-form">
      <TextInput
        label="Your Name"
        name="name"
        value={data.name || ''}
        onChange={onChange}
        placeholder="Enter your full name"
        required={true}
      />

      <TextInput
        label="Contact Number"
        name="contactNumber"
        value={data.contactNumber || ''}
        onChange={onChange}
        placeholder="Enter your contact number"
        type="tel"
        required={true}
      />

      <DropdownWithOther
        label="Most Active Social Media Platform"
        name="socialMediaPlatform"
        options={socialMediaPlatformOptions}
        value={data.socialMediaPlatform}
        onChange={onChange}
        placeholder="Select your most active platform"
        required={true}
        otherFieldName="socialMediaPlatformOther"
        otherValue={data.socialMediaPlatformOther}
      />

      <TextInput
        label="Link to your most active social media platform"
        name="socialMediaLink"
        value={data.socialMediaLink || ''}
        onChange={onChange}
        placeholder="Enter your social media profile link"
        type="url"
      />

      <Dropdown
        label="Number of followers on your main social media platform"
        name="followerCount"
        options={followerCountOptions}
        value={data.followerCount || ''}
        onChange={onChange}
        placeholder="Select follower range"
        required={true}
      />
    </div>
  );
};

export default ContactInfoForm;
