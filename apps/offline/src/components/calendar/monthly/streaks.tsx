import { cn, convertHexToRGBA } from "@/lib/utils";
import { useHabit } from "@/routes/habit/$habitId";
import { streakRanges } from "date-streaks";
import dayjs from "dayjs";
import { useMemo } from "react";

const getTop5RangesPercentages = (
	ranges: ReturnType<typeof streakRanges>,
): number[] => {
	const totalSum = ranges.reduce((sum, range) => sum + range.duration, 0);
	return ranges.map((range) => (range.duration / totalSum) * 100);
};

const getTop5Ranges = (ranges: ReturnType<typeof streakRanges>) => {
	const sortedRanges = ranges.sort((a, b) => b.duration - a.duration);
	return sortedRanges.slice(0, 5);
};

export function Streaks() {
	const {
		habitData: { dates, color },
	} = useHabit();
	const ranges = useMemo(() => {
		const streakRangesData = streakRanges({ dates: Object.keys(dates) });
		const top5Ranges = getTop5Ranges(streakRangesData);
		const top5RangesPercentages = getTop5RangesPercentages(top5Ranges);

		return top5Ranges.map((range, index) => ({
			...range,
			percentage: top5RangesPercentages[index],
		}));
	}, [dates]);

	return (
		<div className="mx-auto flex max-w-[400px] flex-col items-center justify-center gap-2 ">
			{ranges.map((item, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={index} className="flex w-full flex-1 justify-center gap-2 ">
					<span className="flex items-center whitespace-nowrap text-xs">
						{dayjs(new Date(item.start)).format("MMM DD")}
					</span>
					<div
						className={cn(
							"yellow transition-width min-w-fit justify-center rounded-[10px_0/100px_20px] px-1 py-[0.1rem] text-center duration-1000 ease-in-out",
						)}
						style={{
							width: `${item.percentage}%`,
							background: convertHexToRGBA(color, 0.5),
						}}
					>
						<span className="mx-1 block">{item.duration}</span>
					</div>
					<span className="flex items-center whitespace-nowrap text-xs">
						{dayjs(new Date(item.end ? item.end : item.start)).format("MMM DD")}
					</span>
				</div>
			))}
		</div>
	);
}