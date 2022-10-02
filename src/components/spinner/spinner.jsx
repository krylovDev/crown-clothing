import React from 'react';
import { SpinnerOverlay, SpinnerContainer, SpinnerWrapper } from './spinner.styles'

const Spinner = () => (
	<SpinnerWrapper>
		<SpinnerContainer>
			<SpinnerOverlay/>
		</SpinnerContainer>
	</SpinnerWrapper>
)

export default Spinner;
