type CounterProps = {
    all_entries: number;
    desired_entries: number;
}

export const Counter = ({all_entries, desired_entries}: CounterProps) => {
    return (
        <div className="py-1 px-2.5 bg-s-red text-white
        text-[18px] rounded-[20px]">
            {desired_entries}/{all_entries}
        </div>
    )
}