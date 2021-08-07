import Head from 'next/head';
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import { useRouter } from "next/router";
import { format } from "date-fns";

export default function Search({ searchResults }) {
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
					<p className="text-sm">
						300+ Stays - <span className="range">
							{formatedStartDate}
						</span> - <span className="range">
							{formatedEndDate}
						</span> - for {noOfGuests} Guests!!
					</p>
					<h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
					<div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
						<p className="button">Cancellation Flexibility</p>
						<p className="button">Type of Place</p>
						<p className="button">Price</p>
						<p className="button">Rooms and Beds</p>
						<p className="button">More Filters</p>
					</div>
					<div className="flex flex-col">
						{searchResults?.map((item) => (
							<InfoCard
								key={item.img}
								image={item.img}
								title={item.title}
								location={item.location}
								description={item.description}
								star={item.star}
								price={item.price}
								total={item.price}
							/>
						))}
					</div>
				</section>
				<section className="">
					<div className="">
						
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export async function getServerSideProps(context) {
	const searchResults = await fetch("https://links.papareact.com/isz")
		.then((res) => res.json());
		
	return {
		props: {
			searchResults,
		}
	};
}
