// import { useRouter } from "next/router";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/eventDetail/EventSummary";
import EventLogistics from "../../components/eventDetail/eventLogistics";
import EventContent from "../../components/eventDetail/EventContent";

export default function EventsDetailPage(props) {
	// const router = useRouter();
	// const eventId = router.query.eventId;
	const  event  = props.selectedEvent[0];
	console.log("EVENT IN [EVENTID]", event);

	if (!event) {
		return <div className="center"><p>Loading...</p></div>;
	}
	return (
		<>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</>
	);
}

export async function getStaticProps(context) {
	const eventId = context.params.eventId;

	const event = await getEventById(eventId);

	return {
		props: {
			selectedEvent: event,
		},
	};
}

export async function getStaticPaths() {
	const events = await getFeaturedEvents();

	const paths = events.map((e) => ({ params: { eventId: e.id } }));

	return {
		paths: paths,
		fallback: true,
	};
}

// hard coded
// paths: [{params: {eventId: 'e1'}}]
