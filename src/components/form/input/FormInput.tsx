import React, { FC, InputHTMLAttributes, memo } from 'react';
import {
  Group,
  Input,
  FormInputLabel,
} from './FormInput.styles';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

const FormInput: FC<FormInputProps> = memo(({ label, ...otherProps }) => (
  <Group>
    <Input {...otherProps} />
    {label && (
    <FormInputLabel
      shrink={
						Boolean(otherProps.value
							&& typeof otherProps.value === 'string'
							&& otherProps.value.length)
					}
      htmlFor={otherProps.name}
    >
      {label}
    </FormInputLabel>
    )}

  </Group>
));

export default FormInput;
