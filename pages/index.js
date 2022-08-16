import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/EventList';

export default function HomePage(props) {
	// const featuredEvents = getFeaturedEvents();

	return (
		<div>
			<EventList items={props.events} />
		</div>
	);
}
export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();

	return{
		props: {
			events: featuredEvents
		}, 
		// so starting page will find any updates every half hour
		revalidate: 1800
	}
}

  