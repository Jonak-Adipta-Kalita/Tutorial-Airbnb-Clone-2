import Head from 'next/head';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { format } from "date-fns";

export default function Search() {
	const router = useRouter();
	const { location, startDate, endDate, noOfGuests } = router.query;
	const formatedStartDate = format(new Date(startDate), "dd MMMM yyyy");
	const formatedEndDate = format(new Date(endDate), "dd MMMM yyyy");
	const range = `${formatedStartDate} - ${formatedEndDate}`;
	return (
		<div className="">
			<Head>
				<title>JAK Airbnb Clone | Search</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header searchPlaceholder={`${location} | ${range} | ${noOfGuests} Guests!!`} />
			<main className="flex">
				<section className="flex-grow pt-14 px-6">
					<p className="text-sm">300+ Stays - {range} - for {noOfGuests} Guests!!</p>
					<h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
					<div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
						<p className="button">Cancellation Flexibility</p>
						<p className="button">Type of Place</p>
						<p className="button">Price</p>
						<p className="button">Rooms and Beds</p>
						<p className="button">More Filters</p>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}