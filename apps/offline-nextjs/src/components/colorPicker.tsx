import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { HexColorPicker } from "react-colorful";

export function ColorPicker({
	value,
	onChange,
}: {
	value: string;
	onChange: (newColor: string) => void;
}) {
	return (
		<Popover>
			<PopoverTrigger className="flex-end">
				<div
					style={{ backgroundColor: value }}
					className="size-8 rounded-sm shadow"
				/>
			</PopoverTrigger>
			<PopoverContent className="w-auto">
				<HexColorPicker color={value} onChange={onChange} />
			</PopoverContent>
		</Popover>
	);
}