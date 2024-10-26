import { Button, buttonVariants } from "@/components/ui/button";
import { excalifont, mathlete, neucha, pacifico } from "@/fonts/fonts";
import { cn } from "@/lib/utils";
import { PostHogProviderWrapper } from "@/providers/post-hog";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
	title: "redoit!",
	description: "Your radically easy-to-use habit tracker",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<PostHogProviderWrapper>
				<body
					className={cn(
						[
							neucha.variable,
							pacifico.variable,
							mathlete.variable,
							excalifont.variable,
						],
						"font-display",
					)}
				>
					<nav className="p-2 flex text-center items-center justify-between gap-2 text-lg">
						<Link
							href="/"
							// activeProps={{
							//   className: "font-bold",
							// }}
							// activeOptions={{ exact: true }}
						>
							Redoit<span className="pl-1 text-xs text-gray-400">[beta]</span>
						</Link>

						<div className="flex items-center gap-2">
							<Button asChild variant="link" className="px-1">
								<Link
									href="/archive"
									// activeProps={{
									//   className: "underline",
									// }}
								>
									archived
								</Link>
							</Button>
							<Button asChild variant="link" className="px-1">
								<Link
									href="/settings"
									// activeProps={{
									//   className: "underline",
									// }}
								>
									settings
								</Link>
							</Button>
							<Link
								href="/add"
								className={cn(
									buttonVariants({ size: "sm" }),
									"flex items-center gap-1",
								)}
							>
								{/* <Plus weight="bold" className="size-3" /> */}
								Add habit
							</Link>
						</div>
					</nav>
					{children}
				</body>
			</PostHogProviderWrapper>
		</html>
	);
}
