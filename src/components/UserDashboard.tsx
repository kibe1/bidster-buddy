
import React, { useState } from 'react';
import Card from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import Badge from '@/components/ui-custom/Badge';
import { useBids } from '@/hooks/useBids';
import { useAuth } from '@/hooks/useAuth';
import BidCard from '@/components/BidCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Calendar, Clock, DollarSign, PiggyBank } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const { bids, loading, placeBid, acceptBid, confirmPayment } = useBids();
  
  const [bidAmount, setBidAmount] = useState('');
  const [bidDuration, setBidDuration] = useState<24 | 48 | 72>(24);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const pendingBids = bids.filter(bid => bid.status === 'pending');
  const activeBids = bids.filter(bid => bid.status === 'active');
  const completedBids = bids.filter(bid => bid.status === 'completed');
  
  // Calculate total earnings and active amount
  const totalEarnings = completedBids.reduce((total, bid) => {
    const interestRate = bid.duration === 24 ? 0.5 : bid.duration === 48 ? 0.75 : 1.0;
    return total + (bid.amount * interestRate);
  }, 0);
  
  const activeAmount = activeBids.reduce((total, bid) => total + bid.amount, 0);
  
  const handlePlaceBid = async () => {
    const amount = parseFloat(bidAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    try {
      await placeBid(amount, bidDuration);
      setIsDialogOpen(false);
      setBidAmount('');
      toast.success('Bid placed successfully!');
    } catch (error) {
      toast.error('Failed to place bid. Please try again.');
    }
  };

  const handleAcceptBid = async (bidId: string) => {
    try {
      await acceptBid(bidId);
      toast.success('Bid accepted! Please complete the payment.');
    } catch (error) {
      toast.error('Failed to accept bid. Please try again.');
    }
  };

  const handleConfirmPayment = async (bidId: string) => {
    try {
      await confirmPayment(bidId);
      toast.success('Payment confirmed! The bid is now active.');
    } catch (error) {
      toast.error('Failed to confirm payment. Please try again.');
    }
  };
  
  // Format next bidding sessions
  const getNextBiddingSessions = () => {
    const now = new Date();
    const sessions = [];
    
    // Add upcoming sessions at 7 AM, 1 PM, and 7 PM
    const sessionHours = [7, 13, 19];
    
    // Find next sessions
    for (let i = 0; i < 3; i++) {
      let sessionDate = new Date(now);
      
      // Find the next upcoming session hour
      let found = false;
      for (const hour of sessionHours) {
        sessionDate.setHours(hour, 0, 0, 0);
        if (sessionDate > now) {
          found = true;
          break;
        }
      }
      
      // If no sessions left today, move to tomorrow
      if (!found) {
        sessionDate.setDate(sessionDate.getDate() + 1);
        sessionDate.setHours(sessionHours[0], 0, 0, 0);
      }
      
      sessions.push(new Date(sessionDate));
      
      // Move to next session
      now.setTime(sessionDate.getTime() + 60000); // Add 1 minute to find the next session
    }
    
    return sessions;
  };
  
  const nextSessions = getNextBiddingSessions();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card variant="glass">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-foreground/70 text-sm">Total Earnings</p>
              <h3 className="text-2xl font-bold">${totalEarnings.toLocaleString()}</h3>
            </div>
          </div>
        </Card>
        
        <Card variant="glass">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <PiggyBank className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-foreground/70 text-sm">Active Amount</p>
              <h3 className="text-2xl font-bold">${activeAmount.toLocaleString()}</h3>
            </div>
          </div>
        </Card>
        
        <Card variant="glass">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-foreground/70 text-sm">Next Session</p>
              <h3 className="text-lg font-bold">
                {nextSessions[0].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </h3>
              <p className="text-xs text-foreground/60">
                {nextSessions[0].toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Bids</h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Place New Bid</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Place a New Bid</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Bid Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Bid Duration</Label>
                <RadioGroup 
                  value={String(bidDuration)} 
                  onValueChange={(value) => setBidDuration(Number(value) as 24 | 48 | 72)}
                >
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-2 border rounded-lg p-3 flex-1">
                      <RadioGroupItem value="24" id="duration-24" />
                      <Label htmlFor="duration-24" className="cursor-pointer">
                        <div className="font-semibold">24h</div>
                        <div className="text-xs text-foreground/60">50% interest</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-3 flex-1">
                      <RadioGroupItem value="48" id="duration-48" />
                      <Label htmlFor="duration-48" className="cursor-pointer">
                        <div className="font-semibold">48h</div>
                        <div className="text-xs text-foreground/60">75% interest</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-3 flex-1">
                      <RadioGroupItem value="72" id="duration-72" />
                      <Label htmlFor="duration-72" className="cursor-pointer">
                        <div className="font-semibold">72h</div>
                        <div className="text-xs text-foreground/60">100% interest</div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                onClick={handlePlaceBid}
                isLoading={loading}
              >
                Place Bid
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card variant="default" className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Upcoming Bidding Sessions</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nextSessions.map((session, index) => (
            <div key={index} className="border rounded-lg p-4 flex items-center justify-between animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
              <div>
                <p className="font-medium">
                  {session.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-xs text-foreground/60">
                  {session.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
              </div>
              <Badge variant="primary">
                {index === 0 ? 'Next' : `In ${Math.round((session.getTime() - new Date().getTime()) / (1000 * 60 * 60))}h`}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Bids</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {bids.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60 mb-4">You haven't placed any bids yet</p>
              <DialogTrigger asChild>
                <Button>Place Your First Bid</Button>
              </DialogTrigger>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bids.map((bid) => (
                <BidCard
                  key={bid.id}
                  {...bid}
                  onAccept={handleAcceptBid}
                  onConfirmPayment={handleConfirmPayment}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending">
          {pendingBids.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">No pending bids</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pendingBids.map((bid) => (
                <BidCard
                  key={bid.id}
                  {...bid}
                  onAccept={handleAcceptBid}
                  onConfirmPayment={handleConfirmPayment}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="active">
          {activeBids.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">No active bids</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeBids.map((bid) => (
                <BidCard key={bid.id} {...bid} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {completedBids.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">No completed bids</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {completedBids.map((bid) => (
                <BidCard key={bid.id} {...bid} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
