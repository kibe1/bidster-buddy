
import { useState } from "react";
import { BidAllocation, useBids } from "@/hooks/useBids";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AllocationManager = () => {
  const { allocation, setBidAllocation, isAdmin } = useBids();
  const [newAllocation, setNewAllocation] = useState<BidAllocation>({...allocation});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      setBidAllocation(newAllocation);
    } catch (error) {
      console.error("Error updating allocation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Bid Allocations</CardTitle>
        <CardDescription>
          Set the number of bid slots available for each time period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="morning">Morning (7 AM)</Label>
            <Input
              id="morning"
              type="number"
              min="1"
              value={newAllocation.morning}
              onChange={(e) => setNewAllocation({...newAllocation, morning: Number(e.target.value)})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="afternoon">Afternoon (1 PM)</Label>
            <Input
              id="afternoon"
              type="number"
              min="1"
              value={newAllocation.afternoon}
              onChange={(e) => setNewAllocation({...newAllocation, afternoon: Number(e.target.value)})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="evening">Evening (7 PM)</Label>
            <Input
              id="evening"
              type="number"
              min="1"
              value={newAllocation.evening}
              onChange={(e) => setNewAllocation({...newAllocation, evening: Number(e.target.value)})}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Allocation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AllocationManager;
