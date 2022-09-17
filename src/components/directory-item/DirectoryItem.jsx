import {
	DirectoryItemContainter,
	DirectoryItemContent,
	BackgroundImage
} from './DirectoryItem.styles'

const DirectoryItem = ({category}) => {

	const {id, title, imageUrl} = category

	return (
		<>
		<DirectoryItemContainter key={id}>
			<BackgroundImage imageUrl={imageUrl} />
			<DirectoryItemContent>
				<h2>{title}</h2>
				<p>shop now</p>
			</DirectoryItemContent>
		</DirectoryItemContainter>
	</>
	)
}

export default DirectoryItem
