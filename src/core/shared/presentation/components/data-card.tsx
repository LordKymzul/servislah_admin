export interface DataCardProps {
    title: string;
    value: string;
    description: string;
    icon: React.ReactNode;
}

const DataCard = ({ title, value, description, icon }: DataCardProps) => {
    return (
        <div className="flex flex-col gap-4 items-start w-full p-4 rounded-xl border">
            <div className="flex flex-row items-center gap-x-2">
                {icon}
                <p className="text-sm font-medium">{title}</p>
            </div>

            <div className="flex flex-col gap-y-1">
                <h1 className="md:text-3xl text-2xl font-extrabold">{value}</h1>
                <p className="text-xs text-muted-foreground font-light">{description}</p>
            </div>
        </div>
    )
}

export default DataCard;