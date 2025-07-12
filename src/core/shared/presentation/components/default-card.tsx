import { Card, CardContent } from "@/components/ui/card";

const DefaultCard = ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">{children}</div>

}

export default DefaultCard;