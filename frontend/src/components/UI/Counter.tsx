type CounterProps = {
    all_entries: number;
    desired_entries: number;
    styles?: string;
}

export const Counter = ({all_entries, desired_entries, styles}: CounterProps) => {
    return (
        <div className={`py-1 px-2.5 bg-s-red text-white
        text-[18px] rounded-[20px] ${styles}`}>
            {desired_entries}/{all_entries}
        </div>
    )
}