import React from 'react'
import {
	Group,
	Input,
	FormInputLabel
} from './FormInput.styles'

const FormInput = ({label, ...otherProps}) => {
// Всё что в otherProps применяется к <input>
	return (
		<Group>
			<Input {...otherProps} />
			{label &&
				<FormInputLabel
					shrink={otherProps.value.length}
					htmlFor={otherProps.name}
				>
					{label}
				</FormInputLabel>}

		</Group>
	)
}

export default FormInput
