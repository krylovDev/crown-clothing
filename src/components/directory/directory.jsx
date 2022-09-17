import DirectoryItem from '../directory-item/DirectoryItem'
import './directory.scss'

const Directory = ({ categories }) => {
	return (
		<div className={ 'directory-container' }>
			{
				categories.map((category) => (
					<DirectoryItem
						key={category.id}
						category={category}
					/>
				))
			}
		</div>
	)
}

export default Directory
