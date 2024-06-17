import React, { useState, useRef, useEffect } from 'react';
import { CaretDown, UserCircle, Info, X } from 'phosphor-react';
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
  onSelect?: (selectedItems: string[]) => void;
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
  items,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [direction, setDirection] = useState<'bottom' | 'top' | 'right' | 'left'>('bottom');

  const handleToggle = () => {
    if (status !== 'Disabled') {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (index: number) => {
    let newSelectedItems: string[] = [];

    if (type === 'SingleNoIcon' || type === 'SingleRadio') {
      newSelectedItems = [items[index]];
      setSelectedItems(newSelectedItems);
    } else if (type === 'Multi') {
      const item = items[index];
      if (selectedItems.includes(item)) {
        newSelectedItems = selectedItems.filter((selected) => selected !== item);
      } else {
        newSelectedItems = [...selectedItems, item];
      }
      setSelectedItems(newSelectedItems);
    }

    setIsOpen(false);
    onSelect?.(newSelectedItems);
  };

  const handleDeselect = (item: string) => {
    const newSelectedItems = selectedItems.filter((selected) => selected !== item);
    setSelectedItems(newSelectedItems);
    onSelect?.(newSelectedItems);
  };

  const clearSelection = () => {
    setSelectedItems([]);
    onSelect?.([]);
  };

  const determineDirection = () => {
    if (!dropdownRef.current || !listRef.current) return;
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const listHeight = listRef.current.offsetHeight;

    if (window.innerHeight - dropdownRect.bottom >= listHeight) {
      setDirection('bottom');
    } else if (dropdownRect.top >= listHeight) {
      setDirection('top');
    } else if (window.innerWidth - dropdownRect.right >= dropdownRect.width) {
      setDirection('right');
    } else if (dropdownRect.left >= dropdownRect.width) {
      setDirection('left');
    } else {
      setDirection('bottom');
    }
  };

  useEffect(() => {
    if (isOpen) {
      determineDirection();
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`dropdown ${status.toLowerCase()}`}>
      {labelVisibility === 'Visible' && (
        <label className="dropdown-label">
          {labelIconVisibility === 'Visible' && <Info className="label-icon" />}
          {label} {required && <span className="required-symbol">*</span>}
        </label>
      )}
      <div className="dropdown-input" onClick={handleToggle}>
        {leftIconVisibility === 'Visible' && <UserCircle className="left-icon" />}
        <div className="selected-items">
          {selectedItems.map((item, index) => (
            <div key={index} className="selected-item">
              {item}
              <span className="deselect-icon" onClick={(e) => {
                e.stopPropagation();
                handleDeselect(item);
              }}>
                <X size={16} />
              </span>
            </div>
          ))}
          {selectedItems.length === 0 && <span className="placeholder">{text}</span>}
        </div>
        <div className="caret-icon">
          <CaretDown />
        </div>
        {selectedItems.length > 0 && (
          <button className="clear-button" onClick={clearSelection}>Clear</button>
        )}
      </div>
      {isOpen && (
        <ul ref={listRef} className={`dropdown-list ${type.toLowerCase()} ${direction}`}>
          {items.map((item, index) => (
            <li
              key={index}
              className={selectedItems.includes(item) ? 'active' : ''}
              onClick={() => handleSelect(index)}
              title={item} // For tooltip on truncated text
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
