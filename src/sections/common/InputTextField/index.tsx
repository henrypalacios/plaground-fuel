import React, { InputHTMLAttributes } from 'react';
import styles from './InputTextField.module.scss';

interface InputTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputTextField: React.FC<InputTextFieldProps> = ({ label, value, onChange, type = 'text', ...props }) => {
  return (
    <div className={styles.inputTextField}>
      <label >
        <span >{label}</span>
        <input type={type} value={value} onChange={onChange} {...props} />
      </label>
    </div>
  );
};

export default InputTextField;