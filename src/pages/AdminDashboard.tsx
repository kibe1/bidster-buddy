
import { useState } from "react";
import { useBids } from "@/hooks/useBids";
import BidList from "@/components/BidList";
import AllocationManager from "@/components/AllocationManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const { user, getAllBids, isAdmin } = useBids();
  const allBids = getAllBids();
  
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access the admin dashboard.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage bids, allocations, and user accounts
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="all-bids">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="all-bids">All Bids</TabsTrigger>
              <TabsTrigger value="active">Active Bids</TabsTrigger>
              <TabsTrigger value="pending">Pending Bids</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all-bids">
              <BidList 
                title="All Bids" 
                description="Overview of all bids in the system"
                bids={allBids} 
              />
            </TabsContent>
            
            <TabsContent value="active">
              <BidList 
                title="Active Bids" 
                description="Bids that are currently running"
                bids={allBids.filter(b => b.status === "active")}
              />
            </TabsContent>
            
            <TabsContent value="pending">
              <BidList 
                title="Pending Bids" 
                description="Bids waiting to be accepted"
                bids={allBids.filter(b => b.status === "pending")}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <AllocationManager />
          
          <div className="mt-8 bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-4">System Statistics</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Bids:</span>
                <span>{allBids.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Bids:</span>
                <span>{allBids.filter(b => b.status === "active").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed Bids:</span>
                <span>{allBids.filter(b => b.status === "completed").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Cancelled Bids:</span>
                <span>{allBids.filter(b => b.status === "cancelled").length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
