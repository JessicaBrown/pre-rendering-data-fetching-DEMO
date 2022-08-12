// import { Fragment } from 'react';
import { useRouter } from 'next/router';

import {getEventById} from '../../dummy-data';
import EventSummary from '../../components/eventDetail/EventSummary';
import EventLogistics from '../../components/eventDetail/eventLogistics';
import EventContent from '../../components/eventDetail/EventContent';

export default function EventsDetailPage() {
	const router = useRouter();
	const eventId = router.query.eventId;
	const event = getEventById(eventId)

	if(!event){
		return <p>No event found!</p>
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