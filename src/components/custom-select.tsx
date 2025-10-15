import { useSelectStore } from '@/stores/useSelectStore';
import { Button } from '@heroui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectComponentProps {
  options: SelectOption[];
  label: string;
  placeholder?: string;
  selectKey: string;
  labelTextSize?: 'text-xs' | 'text-sm' | 'text-base';
}

export function CustomSelect({
  options,
  label,
  placeholder = 'Select an option',
  selectKey,
  labelTextSize = 'text-base',
}: SelectComponentProps) {
  const { selectedValues, setSelectedValue } = useSelectStore();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOptionRef = useRef<HTMLLIElement | null>(null);

  const selectedValue = selectedValues[selectKey];

  const handleSelectToggle = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  const handleOptionClick = (value: string) => {
    const newValue = value === selectedValue ? '' : value;
    setSelectedValue(selectKey, newValue);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dropdownOpen && selectedOptionRef.current) {
      selectedOptionRef.current.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [dropdownOpen]);

  return (
    <div className="group transition-background relative inline-flex w-full max-w-xs min-w-72 flex-col duration-150 motion-reduce:transition-none">
      <div className="flex w-full flex-col" ref={dropdownRef}>
        <Button
          onPress={handleSelectToggle}
          className="inline-flex w-full items-center justify-start px-3 py-7 shadow-xs outline-none"
          color="primary"
          variant="flat"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
        >
          <div className="relative flex w-full items-center justify-between">
            <div>
              <label className="pointer-events-none absolute -top-3 left-0 z-10 block max-w-full text-xs text-ellipsis">
                {label}
              </label>
              <div className="text-default-500 absolute -top-2 left-0 inline-flex h-full min-h-4 w-full pt-4 text-xs">
                {selectedValue
                  ? options.find((opt) => opt.value === selectedValue)?.label
                  : placeholder}
              </div>
            </div>
            <div>
              {dropdownOpen ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </div>
          </div>
        </Button>
        {dropdownOpen && (
          <ul
            className="bg-content1 shadow-medium absolute top-full z-20 mt-2 max-h-48 w-full max-w-xs overflow-y-auto rounded-lg p-2 sm:max-h-80"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            role="listbox"
            aria-labelledby={label}
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`hover:bg-primary hover:text-primary-foreground mb-1 cursor-pointer rounded-lg px-2 py-4 last:mb-0 ${option.value === selectedValue ? 'bg-primary text-primary-foreground' : ''}`}
                role="option"
                aria-selected={option.value === selectedValue}
                ref={option.value === selectedValue ? selectedOptionRef : null}
              >
                <div
                  className={`flex items-center justify-between ${labelTextSize}`}
                >
                  {option.label}
                  {option.value === selectedValue && (
                    <CheckIcon className="h-4 w-4" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
