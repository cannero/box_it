import {useId} from 'react';

const Checkbox = ({isChecked, onCheckChange, label}) => {
  const id = useId();

  return (
    <div>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={onCheckChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
