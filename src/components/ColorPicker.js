import React from 'react';
import './ColorPicker.css';

const ColorPicker = ({ label, options, values = [], onChange, name, columns }) => {
  const handleToggle = (optionValue) => {
    const newValues = values.includes(optionValue)
      ? values.filter(v => v !== optionValue)
      : [...values, optionValue];
    onChange(name, newValues);
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div
        className={`color-picker-container${columns ? ' fixed-columns' : ''}`}
        style={columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined}
      >
        {options.map((option) => (
          <div 
            key={option.value} 
            className={`color-option ${values.includes(option.value) ? 'selected' : ''}`}
            onClick={() => handleToggle(option.value)}
            style={{ 
              backgroundColor: option.colorCode,
              borderColor: option.colorCode 
            }}
            title={option.label}
          >
            <span className="color-label">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;


