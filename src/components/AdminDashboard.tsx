
import React, { useState } from 'react';
import Card from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import Badge from '@/components/ui-custom/Badge';
import { useBids } from '@/hooks/useBids';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import BidCard from '@/components/BidCard';
import { Users, Clock, Settings, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const { bids, users, setBidAllocation, loading, allocation } = useBids();
  const [morningAllocation, setMorningAllocation] = useState(allocation.morning);
  const [afternoonAllocation, setAfternoonAllocation] = useState(allocation.afternoon);
  const [eveningAllocation, setEveningAllocation] = useState(allocation.evening);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const pendingBids = bids.filter(bid => bid.status === 'pending');
  const activeBids = bids.filter(bid => bid.status === 'active');
  const completedBids = bids.filter(bid => bid.status === 'completed');
  
  // Calculate system stats
  const totalUsers = users.length;
  const totalBids = bids.length;
  const totalVolume = bids.reduce((total, bid) => total + bid.amount, 0);
  
  const handleUpdateAllocations = async () => {
    try {
      const newAllocation = {
        morning: morningAllocation,
        afternoon: afternoonAllocation,
        evening: eveningAllocation
      };
      
      setBidAllocation(newAllocation);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Failed to update allocations. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button leftIcon={<Settings size={16} />}>Manage Allocations</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Bid Slot Allocations</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="morning">Morning Session (7 AM)</Label>
                <Input
                  id="morning"
                  type="number"
                  value={morningAllocation}
                  onChange={(e) => setMorningAllocation(parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="afternoon">Afternoon Session (1 PM)</Label>
                <Input
                  id="afternoon"
                  type="number"
                  value={afternoonAllocation}
                  onChange={(e) => setAfternoonAllocation(parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="evening">Evening Session (7 PM)</Label>
                <Input
                  id="evening"
                  type="number"
                  value={eveningAllocation}
                  onChange={(e) => setEveningAllocation(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                onClick={handleUpdateAllocations}
                isLoading={loading}
              >
                Update Allocations
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card variant="glass">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-foreground/70 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold">{totalUsers}</h3>
            </div>
          </div>
        </Card>
        
        <Card variant="glass">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-foreground/70 text-sm">Total Bids</p>
              <h3 className="text-2xl font-bold">{totalBids}</h3>
            </div>
          </div>
        </Card>
        
        <Card variant="glass">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-foreground/70 text-sm">Active Bids</p>
              <h3 className="text-2xl font-bold">{activeBids.length}</h3>
            </div>
          </div>
        </Card>
        
        <Card variant="glass">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-foreground/70 text-sm">Total Volume</p>
              <h3 className="text-2xl font-bold">${totalVolume.toLocaleString()}</h3>
            </div>
          </div>
        </Card>
      </div>
      
      <Card variant="default" className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Bid Allocations</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Morning (7 AM)</h4>
              <Badge variant="primary">{morningAllocation} slots</Badge>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${(pendingBids.filter(b => b.createdAt.getHours() < 12).length / morningAllocation) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-foreground/60">
              <span>Used: {pendingBids.filter(b => b.createdAt.getHours() < 12).length}</span>
              <span>Available: {morningAllocation - pendingBids.filter(b => b.createdAt.getHours() < 12).length}</span>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Afternoon (1 PM)</h4>
              <Badge variant="primary">{afternoonAllocation} slots</Badge>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${(pendingBids.filter(b => b.createdAt.getHours() >= 12 && b.createdAt.getHours() < 18).length / afternoonAllocation) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-foreground/60">
              <span>Used: {pendingBids.filter(b => b.createdAt.getHours() >= 12 && b.createdAt.getHours() < 18).length}</span>
              <span>Available: {afternoonAllocation - pendingBids.filter(b => b.createdAt.getHours() >= 12 && b.createdAt.getHours() < 18).length}</span>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Evening (7 PM)</h4>
              <Badge variant="primary">{eveningAllocation} slots</Badge>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${(pendingBids.filter(b => b.createdAt.getHours() >= 18).length / eveningAllocation) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-foreground/60">
              <span>Used: {pendingBids.filter(b => b.createdAt.getHours() >= 18).length}</span>
              <span>Available: {eveningAllocation - pendingBids.filter(b => b.createdAt.getHours() >= 18).length}</span>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">User Management</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bids
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {bids.filter(bid => bid.userId === user.id).length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="success">Active</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Bid Management</h2>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Bids</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bids.map((bid) => (
              <BidCard key={bid.id} {...bid} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pendingBids.map((bid) => (
              <BidCard key={bid.id} {...bid} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeBids.map((bid) => (
              <BidCard key={bid.id} {...bid} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {completedBids.map((bid) => (
              <BidCard key={bid.id} {...bid} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
