import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, disabled = false, id }) => {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange()}
        className="w-4 h-4 accent-purple-500 cursor-pointer disabled:opacity-50"
      />
      {label && <span className="text-sm text-gray-800">{label}</span>}
    </label>
  );
};
