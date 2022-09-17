import {
	DirectoryItemContainter,
	DirectoryItemContent,
	BackgroundImage
} from './DirectoryItem.styles'
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({category}) => {

	const navigate = useNavigate()
	const {id, title, imageUrl, route} = category

	const onNavigateHandler = () => navigate(route)

	return (
		<DirectoryItemContainter
			key={id}
			onClick={onNavigateHandler}
		>
			<BackgroundImage imageUrl={imageUrl} />
			<DirectoryItemContent>
				<h2>{title}</h2>
				<p>shop now</p>
			</DirectoryItemContent>
		</DirectoryItemContainter>
	)
}

export default DirectoryItem
