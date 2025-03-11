
import { useState } from "react";
import { useBids } from "@/hooks/useBids";
import BidForm from "@/components/BidForm";
import BidList from "@/components/BidList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Send, Users } from "lucide-react";

const Dashboard = () => {
  const { 
    user, 
    getUserBids, 
    getAcceptedBids, 
    getPendingBids,
    isAdmin
  } = useBids();
  
  const userBids = getUserBids();
  const acceptedBids = getAcceptedBids();
  const pendingBids = getPendingBids();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
        <p className="text-muted-foreground">
          {isAdmin ? "Administrator Dashboard" : "Manage your bids and transactions"}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary/10 p-6 rounded-lg flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Bids</p>
            <p className="text-2xl font-bold">{userBids.filter(b => b.status === "active").length}</p>
          </div>
        </div>
        
        <div className="bg-green-500/10 p-6 rounded-lg flex items-center gap-4">
          <div className="bg-green-500/20 p-3 rounded-full">
            <Clock className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending Bids</p>
            <p className="text-2xl font-bold">{userBids.filter(b => b.status === "pending").length}</p>
          </div>
        </div>
        
        <div className="bg-blue-500/10 p-6 rounded-lg flex items-center gap-4">
          <div className="bg-blue-500/20 p-3 rounded-full">
            <Send className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed Bids</p>
            <p className="text-2xl font-bold">{userBids.filter(b => b.status === "completed").length}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="my-bids">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="my-bids">My Bids</TabsTrigger>
              <TabsTrigger value="accepted">Accepted Bids</TabsTrigger>
              <TabsTrigger value="available">Available Bids</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-bids">
              <BidList 
                title="My Bids" 
                description="Bids you've placed"
                bids={userBids} 
              />
            </TabsContent>
            
            <TabsContent value="accepted">
              <BidList 
                title="Accepted Bids" 
                description="Bids you've accepted for payment"
                bids={acceptedBids}
                showActions
                action="confirm"
              />
            </TabsContent>
            
            <TabsContent value="available">
              <BidList 
                title="Available Bids" 
                description="Bids available for acceptance"
                bids={pendingBids.filter(b => b.userId !== user.id)}
                showActions
                action="accept"
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <BidForm />
          
          <div className="mt-8 bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Bidding Schedule</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Morning (7 AM)</span>
                <span className="font-medium">10 slots</span>
              </div>
              <div className="flex justify-between">
                <span>Afternoon (1 PM)</span>
                <span className="font-medium">15 slots</span>
              </div>
              <div className="flex justify-between">
                <span>Evening (7 PM)</span>
                <span className="font-medium">20 slots</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
