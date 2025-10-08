import React from 'react';
import './FormComponents.css';

// Radio Button Group Component
export const RadioGroup = ({ label, options, value, onChange, name, required = false }) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="radio-group">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`radio-button ${value === option.value ? 'selected' : ''}`}
            onClick={() => onChange(name, option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Multi-select Checkbox Group Component
export const CheckboxGroup = ({ label, options, values = [], onChange, name, required = false }) => {
  const handleToggle = (optionValue) => {
    const newValues = values.includes(optionValue)
      ? values.filter(v => v !== optionValue)
      : [...values, optionValue];
    onChange(name, newValues);
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="checkbox-group">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`checkbox-button ${values.includes(option.value) ? 'selected' : ''}`}
            onClick={() => handleToggle(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Dropdown Component
export const Dropdown = ({ label, options, value, onChange, name, placeholder, required = false }) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <select
        className="dropdown-select"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Text Input Component
export const TextInput = ({ label, value, onChange, name, placeholder, required = false, type = "text" }) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="text-input"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

// Textarea Component
export const Textarea = ({ label, value, onChange, name, placeholder, required = false, rows = 4 }) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <textarea
        className="textarea-input"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
      />
    </div>
  );
};

// Dropdown with Other Field Component
export const DropdownWithOther = ({ label, options, value, onChange, name, placeholder, required = false, otherFieldName = null, otherValue = '' }) => {
  const hasOtherOption = options.some(option => option.value === 'other');
  const showOtherField = hasOtherOption && value === 'other';

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <select
        className="dropdown-select"
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {showOtherField && (
        <input
          type="text"
          className="text-input other-field"
          placeholder={`Please specify ${label.toLowerCase()}`}
          value={otherValue || ''}
          onChange={(e) => onChange(otherFieldName, e.target.value)}
          style={{ marginTop: '8px' }}
        />
      )}
    </div>
  );
};

// Multi-select Dropdown with Other Field Component
export const MultiDropdownWithOther = ({ label, options, values = [], onChange, name, placeholder, required = false, otherFieldName = null, otherValue = '', maxSelections = Infinity }) => {
  const [showLimitMessage, setShowLimitMessage] = React.useState(false);
  const hasOtherOption = options.some(option => option.value === 'other');
  const showOtherField = hasOtherOption && values.includes('other');

  const handleToggle = (optionValue) => {
    const isSelected = values.includes(optionValue);
    if (!isSelected && values.length >= maxSelections) {
      // prevent selecting more than allowed and show a brief message
      setShowLimitMessage(true);
      setTimeout(() => setShowLimitMessage(false), 2000);
      return;
    }
    const newValues = isSelected
      ? values.filter(v => v !== optionValue)
      : [...values, optionValue];
    onChange(name, newValues);
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="multi-dropdown-container">
        {options.map((option) => (
          <label key={option.value} className="multi-dropdown-option">
            <input
              type="checkbox"
              checked={values.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className="multi-dropdown-checkbox"
              disabled={!values.includes(option.value) && values.length >= maxSelections}
            />
            <span className="multi-dropdown-label">{option.label}</span>
          </label>
        ))}
      </div>
      
      {showOtherField && (
        <input
          type="text"
          className="text-input other-field"
          placeholder={`Please specify ${label.toLowerCase()}`}
          value={otherValue || ''}
          onChange={(e) => onChange(otherFieldName, e.target.value)}
          style={{ marginTop: '8px' }}
        />
      )}

      {maxSelections !== Infinity && (
        <div className="helper-text" style={{ marginTop: '6px', fontSize: '0.9rem', color: showLimitMessage ? '#d9534f' : '#6c757d' }}>
          {showLimitMessage ? `You can select up to ${maxSelections} options.` : `Select up to ${maxSelections} options.`}
        </div>
      )}
    </div>
  );
};

// Ranking Component for phone features
export const RankingComponent = ({ label, options, rankings = {}, onChange, name }) => {
  const handleRankChange = (optionValue, rank) => {
    const newRankings = { ...rankings };
    
    // Remove the rank from any other option that had it
    Object.keys(newRankings).forEach(key => {
      if (newRankings[key] === rank) {
        delete newRankings[key];
      }
    });
    
    // Set the new rank
    if (rank) {
      newRankings[optionValue] = rank;
    } else {
      delete newRankings[optionValue];
    }
    
    onChange(name, newRankings);
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="ranking-group">
        {options.map((option) => (
          <div key={option.value} className="ranking-item">
            <span className="ranking-option-text">{option.label}</span>
            <select
              className="ranking-select"
              value={rankings[option.value] || ''}
              onChange={(e) => handleRankChange(option.value, e.target.value)}
            >
              <option value="">Select rank</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(rank => (
                <option key={rank} value={rank} disabled={rankings[option.value] !== rank && Object.values(rankings).includes(rank.toString())}>
                  {rank}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};
