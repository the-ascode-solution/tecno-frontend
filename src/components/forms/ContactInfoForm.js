import React from 'react';
import { TextInput, DropdownWithOther } from '../FormComponents';

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
    </div>
  );
};

export default ContactInfoForm;
