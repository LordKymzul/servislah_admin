import { Card, CardContent } from "@/components/ui/card";

const DefaultCard = ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-card text-card-foreground flex flex-col rounded-xl border">{children}</div>

}

export default DefaultCard;