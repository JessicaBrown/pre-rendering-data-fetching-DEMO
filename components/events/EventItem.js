import Image from "next/image";
import Button from "../ui/button";
import DateIcon from "../icons/dateIcon";
import AddressIcon from "../icons/addressIcon";
import ArrowRightIcon from "../icons/arrowRightIcon";
import classes from "./eventItem.module.scss";

export default function EventItem(props) {
	const { title, image, date, location, id } = props;

	const readableDate = new Date(date).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const formattedAddress = location.replace(", ", "\n");

	const exploreLink = `/events/${id}`;

	return (
		<li className={classes.item}>
			<Image width={400} height={300}  src={"/" + image} alt={title} />
			<div className={classes.content}>
				<div className={classes.summary}>
					<h2>{title}</h2>
					<div className={classes.date}>
						<DateIcon />
						<time>{readableDate}</time>
					</div>
					<div className={classes.address}>
						<AddressIcon />
						<address>{formattedAddress}</address>
					</div>
					<div className={classes.actions}>
						<Button link={exploreLink}>
							<span>Explore Event</span>
							<span className={classes.icon}>
								<ArrowRightIcon />
							</span>
						</Button>
					</div>
				</div>
			</div>
		</li>
	);
}
