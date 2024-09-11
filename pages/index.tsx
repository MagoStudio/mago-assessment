import type { GetStaticProps } from "next";
import fetchProjects from "../lib/fetch-projects";
import Layout from "./layout";

const Home = ({ projects }) => (
	<Layout projects={projects}>
		<div>Have fun!</div>
	</Layout>
);

export const getStaticProps: GetStaticProps = async () => {
	// fetch projects from the Database
	const projects = await fetchProjects();

	return {
		props: { projects },
	};
};

export default Home;
