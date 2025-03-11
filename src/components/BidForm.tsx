
import { useState } from "react";
import { Bid, useBids } from "@/hooks/useBids";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const BidForm = () => {
  const { placeBid } = useBids();
  const [amount, setAmount] = useState<number>(1000);
  const [duration, setDuration] = useState<24 | 48 | 72>(24);
  const [isLoading, setIsLoading] = useState(false);

  const getInterestRate = (duration: 24 | 48 | 72) => {
    switch (duration) {
      case 24: return "50%";
      case 48: return "75%";
      case 72: return "100%";
      default: return "0%";
    }
  };

  const calculateExpectedPayout = () => {
    const interestRate = duration === 24 ? 0.5 : duration === 48 ? 0.75 : 1;
    return amount + (amount * interestRate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      placeBid(amount, duration);
    } catch (error) {
      console.error("Error placing bid:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Place a New Bid</CardTitle>
        <CardDescription>
          Choose your bid amount and duration to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Bid Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              min="100"
              step="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (Hours)</Label>
            <Select
              value={String(duration)}
              onValueChange={(value) => setDuration(Number(value) as 24 | 48 | 72)}
            >
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24">24 Hours ({getInterestRate(24)} Interest)</SelectItem>
                <SelectItem value="48">48 Hours ({getInterestRate(48)} Interest)</SelectItem>
                <SelectItem value="72">72 Hours ({getInterestRate(72)} Interest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between">
              <span>Interest Rate:</span>
              <span className="font-medium">{getInterestRate(duration)}</span>
            </div>
            <div className="flex justify-between">
              <span>Expected Payout:</span>
              <span className="font-medium">${calculateExpectedPayout().toFixed(2)}</span>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Place Bid"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BidForm;
