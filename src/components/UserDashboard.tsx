import React, { useState } from 'react';
import Card from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import Badge from '@/components/ui-custom/Badge';
import { useBids } from '@/hooks/useBids';
import BidForm from '@/components/BidForm';
import { Clock, ArrowUp, ArrowDown, DollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import BidCard from '@/components/BidCard';

const UserDashboard = () => {
  const { 
    user, 
    bids,
    getUserBids, 
    getAcceptedBids, 
    getPendingBids,
    acceptBid,
    confirmPayment,
    loading 
  } = useBids();
  
  const userBids = getUserBids();
  const acceptedBids = getAcceptedBids();
  const pendingBids = getPendingBids().filter(bid => bid.userId !== user.id);
  
  const handleAcceptBid = (bidId: string) => {
    try {
      acceptBid(bidId);
      toast.success('Bid accepted successfully!');
    } catch (error) {
      toast.error('Failed to accept bid. Please try again.');
    }
  };
  
  const handleConfirmPayment = (bidId: string) => {
    try {
      confirmPayment(bidId);
      toast.success('Payment confirmed successfully!');
    } catch (error) {
      toast.error('Failed to confirm payment. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <Badge variant="secondary">
          Welcome, {user.name}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card variant="glass">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <ArrowUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-foreground/70 text-sm">Total Bids Placed</p>
              <h3 className="text-2xl font-bold">{userBids.length}</h3>
            </div>
          </div>
        </Card>
        
        <Card variant="glass">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-foreground/70 text-sm">Pending Bids</p>
              <h3 className="text-2xl font-bold">{pendingBids.length}</h3>
            </div>
          </div>
        </Card>
        
        <Card variant="glass">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <DollarSign className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-foreground/70 text-sm">Accepted Bids</p>
              <h3 className="text-2xl font-bold">{acceptedBids.length}</h3>
            </div>
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="myBids" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="myBids">My Bids</TabsTrigger>
          <TabsTrigger value="availableBids">Available Bids</TabsTrigger>
          <TabsTrigger value="acceptedBids">Accepted Bids</TabsTrigger>
        </TabsList>
        
        <TabsContent value="myBids">
          <h2 className="text-xl font-bold mb-4">My Bids</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userBids.map((bid) => (
              <BidCard key={bid.id} {...bid} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="availableBids">
          <h2 className="text-xl font-bold mb-4">Available Bids</h2>
          {pendingBids.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pendingBids.map((bid) => (
                <BidCard 
                  key={bid.id} 
                  {...bid} 
                  actionButtons={
                    <Button onClick={() => handleAcceptBid(bid.id)}>
                      Accept Bid
                    </Button>
                  }
                />
              ))}
            </div>
          ) : (
            <p>No bids available at the moment.</p>
          )}
        </TabsContent>
        
        <TabsContent value="acceptedBids">
          <h2 className="text-xl font-bold mb-4">Accepted Bids</h2>
          {acceptedBids.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {acceptedBids.map((bid) => (
                <BidCard 
                  key={bid.id} 
                  {...bid} 
                  actionButtons={
                    <Button onClick={() => handleConfirmPayment(bid.id)}>
                      Confirm Payment
                    </Button>
                  }
                />
              ))}
            </div>
          ) : (
            <p>No accepted bids yet.</p>
          )}
        </TabsContent>
      </Tabs>
      
      <BidForm />
    </div>
  );
};

export default UserDashboard;
