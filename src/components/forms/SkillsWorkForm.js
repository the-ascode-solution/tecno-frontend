import React from 'react';
import { MultiDropdownWithOther } from '../FormComponents';

const SkillsWorkForm = ({ data, onChange }) => {
  const learningSkills = [
    { value: 'none', label: 'No, I am not learning any skill' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'video-editing', label: 'Video Editing' },
    { value: 'trading', label: 'Trading (Crypto/Forex/Stocks)' },
    { value: 'programming', label: 'Programming / IT Skills' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'english-learning', label: 'English Learning (IELTS, PTE, TOEFL, Spoken English)' },
    { value: 'other', label: 'Other (please specify)' }
  ];

  const partTimeWork = [
    { value: 'none', label: 'No, I am not doing any part-time job' },
    { value: 'freelancing-it', label: 'Freelancing – IT/Programming/Web Development' },
    { value: 'freelancing-design', label: 'Freelancing – Graphic Design/Video Editing/Digital Marketing' },
    { value: 'content-creation', label: 'Content creation for others (managing pages, editing, etc.)' },
    { value: 'video-creation', label: 'Making videos for social media (Instagram, TikTok, YouTube, etc.)' },
    { value: 'online-trading', label: 'Online Trading (Crypto/Forex/Stocks)' },
    { value: 'teaching', label: 'Teaching/Tutoring' },
    { value: 'business', label: 'Business/E-commerce' },
    { value: 'food-delivery', label: 'Food delivery (Foodpanda, etc.)' },
    { value: 'ride-hailing', label: 'Ride-hailing (Indrive, Yango, Bykea, etc.)' },
    { value: 'sales-marketing', label: 'Sales/Marketing jobs' },
    { value: 'call-center', label: 'Call center agent' },
    { value: 'other', label: 'Other (please specify)' }
  ];

  return (
    <div className="skills-work-form">
      <MultiDropdownWithOther
        label="Are you learning any skills or certifications other than your regular studies? (Select all that apply)"
        name="learningSkills"
        options={learningSkills}
        values={data.learningSkills || []}
        onChange={onChange}
        otherFieldName="learningSkillsOther"
        otherValue={data.learningSkillsOther}
      />

      <MultiDropdownWithOther
        label="Do you currently earn through any part-time work? (Select all that apply)"
        name="partTimeWork"
        options={partTimeWork}
        values={data.partTimeWork || []}
        onChange={onChange}
        otherFieldName="partTimeWorkOther"
        otherValue={data.partTimeWorkOther}
      />
    </div>
  );
};

export default SkillsWorkForm;
