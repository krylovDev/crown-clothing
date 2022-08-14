import React from 'react'
import './form-input.scss'

const FormInput = ({ label, ...otherProps }) => {
// Всё что в otherProps применяется к <input>
	return (
		<div className={ 'group' }>
			<input className={ 'form-input' } { ...otherProps } />

			{ label && <label
				className={ `${ otherProps.value.length ? 'shrink' : '' }form-input-label` }
				htmlFor={ otherProps.name }
			>
				{ label }
			</label> }

		</div>
	)
}

export default FormInput
