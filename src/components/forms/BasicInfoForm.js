import React from 'react';
import { DropdownWithOther } from '../FormComponents';

const BasicInfoForm = ({ data, onChange }) => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const yearOfStudyOptions = [
    { value: 'first-year', label: 'First Year' },
    { value: 'second-year', label: 'Second Year' },
    { value: 'third-year', label: 'Third Year' },
    { value: 'fourth-year', label: 'Fourth Year' },
    { value: 'post-graduate', label: 'Post Graduate' }
  ];

  const fieldOfStudyOptions = [
    { value: 'liberal-arts', label: 'Liberal Arts (e.g., Journalism, Languages)' },
    { value: 'science', label: 'Science (e.g., Mathematics, Physics, Biology)' },
    { value: 'engineering', label: 'Engineering (e.g., Computer Science, Electronics)' },
    { value: 'arts', label: 'Arts (e.g., Design, Media, Fine Arts)' },
    { value: 'other', label: 'Other' }
  ];

  const universityOptions = [
    { value: 'uol', label: 'UOL' },
    { value: 'ucp', label: 'UCP' },
    { value: 'umt', label: 'UMT' },
    { value: 'iac', label: 'IAC' },
    { value: 'bnu', label: 'BNU' },
    { value: 'fccu', label: 'FCCU' },
    { value: 'gc', label: 'GC' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="basic-info-form">
      <DropdownWithOther
        label="Gender"
        name="gender"
        options={genderOptions}
        value={data.gender}
        onChange={onChange}
        placeholder="Select your gender"
        required={true}
      />

      <DropdownWithOther
        label="Year of Study"
        name="yearOfStudy"
        options={yearOfStudyOptions}
        value={data.yearOfStudy}
        onChange={onChange}
        placeholder="Select your year of study"
        required={true}
      />

      <DropdownWithOther
        label="Field of Study"
        name="fieldOfStudy"
        options={fieldOfStudyOptions}
        value={data.fieldOfStudy}
        onChange={onChange}
        placeholder="Select your field of study"
        required={true}
        otherFieldName="fieldOfStudyOther"
        otherValue={data.fieldOfStudyOther}
      />

      <DropdownWithOther
        label="University"
        name="university"
        options={universityOptions}
        value={data.university}
        onChange={onChange}
        placeholder="Select your university"
        required={true}
        otherFieldName="universityOther"
        otherValue={data.universityOther}
      />
    </div>
  );
};

export default BasicInfoForm;
