import { useRouter } from "next/router";

import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/eventList";
import ResultsTitle from "../../components/events/resultsTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/ErrorAlert";

export default function FilteredEventsPage(props) {
	const router = useRouter();

	// ***CLIENT SIDE FETCHING***
	// const filterData = router.query.slug;

	//const {data, error} = useSWR(`https://next-js-4946c-default-rtdb.firebaseio.com/events.json`);

	// useEffect(() => {
	//   if (data) {
	//     const events = [];

	//     for (const key in data) {
	//       events.push({
	//         id: key,
	//         ...data[key],
	//       });
	//     }

	//     setLoadedEvents(events);
	//   }
	// }, [data]);

	// if (!filterData) {
	//   return <p className='center'>Loading...</p>;
	// }

	// const filteredYear = filterData[0];
	// const filteredMonth = filterData[1];

	// const numYear = +filteredYear;
	// const numMonth = +filteredMonth;

	// if (
	//   isNaN(numYear) ||
	//   isNaN(numMonth) ||
	//   numYear > 2030 ||
	//   numYear < 2021 ||
	//   numMonth < 1 ||
	//   numMonth > 12 ||
	//   error
	// ) {
	//   return(
	if (props.hasError) {
		return (
			<>
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</>
		);
	}

	// const filteredEvents = loadedEvents.filter((event) => {
	//   const eventDate = new Date(event.date);
	//   return (
	//     eventDate.getFullYear() === numYear &&
	//     eventDate.getMonth() === numMonth - 1
	//   );
	// });

	const filteredEvents = props.events;

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<>
				<ErrorAlert>
					<p>No events found for the chosen filter!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</>
		);
	}

	// const date = new Date(numYear, numMonth - 1);
	const date = new Date(props.date.year, props.date.month - 1);

	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
}

// ***SERVER SIDE FETCHING***
export async function getServerSideProps(context) {
	const { params } = context;

	const filterData = params.slug;

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth < 1 ||
		numMonth > 12
	) {
		return {
			props: { hasError: true },
			// notFound: true,
			// redirect: {
			//   destination: '/error'
			// }
		};
	}
	const filteredEvents = await getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	return {
		props: {
			events: filteredEvents,
			date: { year: numYear, month: numMonth },
		},
	};
}
