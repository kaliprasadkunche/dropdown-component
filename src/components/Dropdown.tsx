// src/components/Dropdown.tsx
import React, { useState } from 'react';
import { CaretDown, UserCircle, Info, X } from 'phosphor-react'; // Import X from Phosphor Icons for deselection
import './Dropdown.scss';

export interface DropdownProps {
  label: string;
  labelVisibility: 'Visible' | 'Hidden';
  status: 'Unfilled' | 'Filled' | 'Disabled' | 'Error';
  labelIconVisibility: 'Visible' | 'Hidden';
  leftIconVisibility: 'Visible' | 'Hidden';
  helperText: string;
  required: boolean;
  text: string;
  type: 'SingleNoIcon' | 'SingleRadio' | 'Multi';
  activeItemIndex: number;
  items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  labelVisibility,
  status,
  labelIconVisibility,
  leftIconVisibility,
  helperText,
  required,
  text,
  type,
  activeItemIndex,
  items
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleToggle = () => {
    if (status !== 'Disabled') {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (index: number) => {
    if (type === 'SingleNoIcon' || type === 'SingleRadio') {
      setSelectedItems([items[index]]);
    } else if (type === 'Multi') {
      const item = items[index];
      if (selectedItems.includes(item)) {
        setSelectedItems(selectedItems.filter((selected) => selected !== item));
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    }
    setIsOpen(false);
  };

  const handleDeselect = (item: string) => {
    setSelectedItems(selectedItems.filter((selected) => selected !== item));
  };

  return (
    <div className={`dropdown ${status.toLowerCase()}`}>
      {labelVisibility === 'Visible' && (
        <label className="dropdown-label">
          {labelIconVisibility === 'Visible' && <Info className="label-icon" />}
          {label} {required && '*'}
        </label>
      )}
      <div className="dropdown-input" onClick={handleToggle}>
        {leftIconVisibility === 'Visible' && <UserCircle className="left-icon" />}
        <div className="selected-items">
          {selectedItems.map((item, index) => (
            <div key={index} className="selected-item">
              {item}
              <span className="deselect-icon" onClick={() => handleDeselect(item)}>
                <X size={16} />
              </span>
            </div>
          ))}
          {selectedItems.length === 0 && (
            <span className="placeholder">Select an option</span>
          )}
        </div>
        <CaretDown className="caret-icon" />
      </div>
      {isOpen && (
        <ul className={`dropdown-list ${type.toLowerCase()}`}>
          {items.map((item, index) => (
            <li
              key={index}
              className={selectedItems.includes(item) ? 'active' : ''}
              onClick={() => handleSelect(index)}
            >
              {type === 'SingleRadio' && <input type="radio" checked={selectedItems.includes(item)} readOnly />}
              {type === 'Multi' && <input type="checkbox" checked={selectedItems.includes(item)} readOnly />}
              {item}
            </li>
          ))}
        </ul>
      )}
      {helperText && <p className="helper-text">{helperText}</p>}
    </div>
  );
};

export default Dropdown;
