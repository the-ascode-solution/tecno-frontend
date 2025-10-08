import React from 'react';
import { Textarea } from '../FormComponents';
import './SuggestionsForm.css';

const SuggestionsForm = ({ data, onChange }) => {
  return (
    <div className="suggestions-form">
      <Textarea
        label="Do you have any suggestions for TECNO campus activities or products?"
        name="suggestions"
        value={data.suggestions || ''}
        onChange={onChange}
        placeholder="Share your thoughts and suggestions here, if you have any..."
        rows={6}
      />
      
      {/* <div className="thank-you-message">
        <p>
          <strong>Thank you for your valuable time!</strong>
        </p>
        <p>
          After completing the survey, please show the nearest usher proof of completion to claim a small gift at the TECNO campus booth.
        </p>
        <p>
          If you'd like updates about TECNO events, feel free to join our official Facebook fan community.
        </p>
      </div> */}
    </div>
  );
};

export default SuggestionsForm;
