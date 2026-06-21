import React from 'react';
import ReactSelect from 'react-select';
import { cn } from '@/lib/utils';

const Select = React.forwardRef(({ 
  label,
  error,
  className,
  options = [],
  value,
  onChange,
  onValueChange,
  name,
  disabled,
  placeholder = "Select an option",
  required,
  isMulti = false,
  isSearchable = true,
  isClearable = false,
  ...props 
}, ref) => {
  // Map value to react-select options format
  const getSelectedValue = () => {
    if (isMulti) {
      if (!value) return [];
      const valuesArray = Array.isArray(value) ? value : [value];
      return options.filter(opt => valuesArray.map(String).includes(String(opt.value)));
    }
    // Handle cases where value is undefined or null or matches empty string
    const matchVal = (value === undefined || value === null) ? '' : value;
    return options.find(opt => String(opt.value) === String(matchVal)) || null;
  };

  const handleSelectChange = (selected) => {
    let targetValue;
    if (isMulti) {
      targetValue = selected ? selected.map(opt => opt.value) : [];
    } else {
      targetValue = selected ? selected.value : '';
    }
    
    if (onValueChange) {
      onValueChange(targetValue);
    }

    if (onChange) {
      onChange({
        target: {
          name,
          value: targetValue
        }
      });
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <ReactSelect
          ref={ref}
          name={name}
          isDisabled={disabled}
          placeholder={placeholder}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isMulti={isMulti}
          options={options}
          value={getSelectedValue()}
          onChange={handleSelectChange}
          unstyled
          classNames={{
            control: ({ isFocused, isDisabled }) =>
              cn(
                'flex min-h-10 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground transition-colors shadow-sm',
                isFocused && 'outline-none ring-2 ring-ring ring-offset-0 border-primary',
                isDisabled && 'cursor-not-allowed opacity-50 bg-muted/30',
                error && 'border-destructive focus-visible:ring-destructive',
                className
              ),
            valueContainer: () => 'gap-1.5 p-0 flex flex-wrap',
            placeholder: () => 'text-muted-foreground select-none',
            input: () => 'm-0 p-0 text-sm text-foreground bg-transparent outline-none border-none ring-0 focus:ring-0',
            singleValue: () => 'text-sm text-foreground font-medium',
            multiValue: () => 'inline-flex items-center gap-1 rounded bg-secondary text-secondary-foreground text-xs px-2 py-0.5 font-medium border border-border',
            multiValueLabel: () => 'leading-normal text-xs',
            multiValueRemove: () => 'text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-sm p-0.5 transition-colors cursor-pointer',
            indicatorsContainer: () => 'gap-1 p-0',
            clearIndicator: () => 'text-muted-foreground hover:text-foreground cursor-pointer p-0.5 transition-colors',
            dropdownIndicator: () => 'text-muted-foreground hover:text-foreground cursor-pointer p-0.5 transition-colors',
            menu: () => 'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md mt-1.5 p-1 w-full animate-in fade-in-80 slide-in-from-top-1',
            menuList: () => 'max-h-[300px] overflow-y-auto overflow-x-hidden scroll-py-1',
            option: ({ isFocused, isSelected, isDisabled }) =>
              cn(
                'relative flex w-full cursor-default select-none items-center rounded-sm px-2.5 py-2 text-sm outline-none transition-colors duration-150',
                isFocused && 'bg-accent text-accent-foreground',
                isSelected && 'bg-primary text-primary-foreground font-semibold',
                isDisabled && 'pointer-events-none opacity-50'
              ),
            noOptionsMessage: () => 'text-muted-foreground text-sm py-4 text-center select-none',
            loadingMessage: () => 'text-muted-foreground text-sm py-4 text-center select-none'
          }}
          {...props}
        />
        
        {/* Hidden input for HTML5 validation / required attribute */}
        {required && (
          <input
            tabIndex={-1}
            autoComplete="off"
            style={{ opacity: 0, height: 0, width: 0, position: 'absolute', bottom: 0, left: '50%' }}
            value={value || ''}
            required={required}
            onChange={() => {}}
          />
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
