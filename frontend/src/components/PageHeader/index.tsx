import Link from "next/link";
import * as React from "react";
import { ArrowLeft } from "lucide-react";

type Props = {
	title: string;
};

const PageHeader = ({ title }: Props) => {
	return (
		<div className="flex align-middle gap-4">
			<Link href="/">
				<button className="hover:cursor-pointer flex items-center gap-2 bg-primary hover:bg-secondary transition-all duration-300 px-4 py-2 rounded-2xl ">
					<ArrowLeft />
				</button>
			</Link>
			<h1>{title}</h1>
		</div>
	);
};

export default PageHeader;
