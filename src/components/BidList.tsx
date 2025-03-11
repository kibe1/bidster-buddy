
import { useBids, Bid } from "@/hooks/useBids";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BidListProps {
  title: string;
  description?: string;
  bids: Bid[];
  showActions?: boolean;
  action?: "accept" | "confirm";
}

const BidList = ({ title, description, bids, showActions = false, action }: BidListProps) => {
  const { acceptBid, confirmPayment } = useBids();

  const getStatusColor = (status: Bid["status"]) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "active": return "bg-green-500";
      case "completed": return "bg-blue-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };

  const handleAction = (bid: Bid) => {
    if (action === "accept") {
      acceptBid(bid.id);
    } else if (action === "confirm") {
      confirmPayment(bid.id);
    }
  };

  const getTimeLeft = (bid: Bid) => {
    if (!bid.startedAt || bid.status !== "active") return "N/A";
    
    const startTime = new Date(bid.startedAt).getTime();
    const endTime = startTime + (bid.duration * 60 * 60 * 1000);
    const timeLeft = endTime - Date.now();
    
    if (timeLeft <= 0) return "Completed";
    
    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {bids.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No bids available</p>
        ) : (
          <div className="space-y-4">
            {bids.map((bid) => (
              <Card key={bid.id} className="overflow-hidden">
                <div className={`h-2 ${getStatusColor(bid.status)}`} />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">${bid.amount.toFixed(2)}</h3>
                      <p className="text-sm text-muted-foreground">
                        Duration: {bid.duration} hours
                      </p>
                    </div>
                    <Badge variant="outline">{bid.status}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Interest:</p>
                      <p>{bid.interest}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Payout:</p>
                      <p>${bid.expectedPayout.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Created:</p>
                      <p>{formatDate(bid.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Started:</p>
                      <p>{formatDate(bid.startedAt)}</p>
                    </div>
                    {bid.status === "active" && (
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Time Left:</p>
                        <p className="font-medium">{getTimeLeft(bid)}</p>
                      </div>
                    )}
                  </div>
                  
                  {showActions && action && (
                    <Button 
                      onClick={() => handleAction(bid)}
                      className="w-full mt-4"
                      variant="outline"
                      disabled={
                        (action === "accept" && bid.status !== "pending") ||
                        (action === "confirm" && bid.status !== "active")
                      }
                    >
                      {action === "accept" ? "Accept Bid" : "Confirm Payment"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BidList;
