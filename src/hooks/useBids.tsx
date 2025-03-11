
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

// Define types for our bid system
export interface Bid {
  id: string;
  userId: string;
  amount: number;
  duration: 24 | 48 | 72;
  interest: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  startedAt: Date | null;
  acceptedBy: string | null;
  expectedPayout: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
}

export interface BidAllocation {
  morning: number;
  afternoon: number;
  evening: number;
}

// Mock current user
const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  isAdmin: false,
};

// Mock admin user
const adminUser: User = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@example.com',
  phone: '+0987654321',
  isAdmin: true,
};

// Mock users list
const mockUsers: User[] = [
  currentUser,
  adminUser,
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1122334455',
    isAdmin: false,
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+5566778899',
    isAdmin: false,
  },
  {
    id: 'user-4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    phone: '+9988776655',
    isAdmin: false,
  }
];

// Initial mock bids
const initialBids: Bid[] = [
  {
    id: 'bid-1',
    userId: 'user-2',
    amount: 1000,
    duration: 24,
    interest: 50,
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    startedAt: null,
    acceptedBy: null,
    expectedPayout: 1500,
  },
  {
    id: 'bid-2',
    userId: 'user-3',
    amount: 2000,
    duration: 48,
    interest: 75,
    status: 'active',
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    startedAt: new Date(Date.now() - 86400000), // 1 day ago
    acceptedBy: 'user-1',
    expectedPayout: 3500,
  },
  {
    id: 'bid-3',
    userId: 'user-1',
    amount: 3000,
    duration: 72,
    interest: 100,
    status: 'active',
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    startedAt: new Date(Date.now() - 172800000), // 2 days ago
    acceptedBy: 'user-4',
    expectedPayout: 6000,
  },
];

// Initial allocation
const initialAllocation: BidAllocation = {
  morning: 10, // 7 AM
  afternoon: 15, // 1 PM
  evening: 20, // 7 PM
};

export const useBids = () => {
  const { toast } = useToast();
  const [bids, setBids] = useState<Bid[]>(initialBids);
  const [allocation, setAllocation] = useState<BidAllocation>(initialAllocation);
  const [user] = useState<User>(currentUser);
  const [loading, setLoading] = useState<boolean>(false);
  const users = mockUsers; // Make mock users available

  // Calculate interest based on duration
  const calculateInterest = (duration: 24 | 48 | 72): number => {
    switch (duration) {
      case 24: return 50;
      case 48: return 75;
      case 72: return 100;
      default: return 0;
    }
  };

  // Calculate expected payout
  const calculatePayout = (amount: number, interest: number): number => {
    return amount + (amount * interest / 100);
  };

  // Place a new bid
  const placeBid = (amount: number, duration: 24 | 48 | 72) => {
    const interest = calculateInterest(duration);
    const expectedPayout = calculatePayout(amount, interest);
    
    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      userId: user.id,
      amount,
      duration,
      interest,
      status: 'pending',
      createdAt: new Date(),
      startedAt: null,
      acceptedBy: null,
      expectedPayout,
    };
    
    setBids([...bids, newBid]);
    toast({
      title: "Bid Placed",
      description: `Your bid for $${amount} has been placed successfully.`,
    });
    
    return newBid;
  };

  // Accept a bid
  const acceptBid = (bidId: string) => {
    setBids(bids.map(bid => {
      if (bid.id === bidId) {
        return {
          ...bid,
          status: 'active',
          acceptedBy: user.id,
          startedAt: new Date(),
        };
      }
      return bid;
    }));
    
    toast({
      title: "Bid Accepted",
      description: "You've accepted this bid. Please complete the payment.",
    });
  };

  // Confirm payment received (for the user who placed the bid)
  const confirmPayment = (bidId: string) => {
    setBids(bids.map(bid => {
      if (bid.id === bidId) {
        return {
          ...bid,
          status: 'completed',
        };
      }
      return bid;
    }));
    
    toast({
      title: "Payment Confirmed",
      description: "Payment has been confirmed and the bid is now completed.",
    });
  };

  // Admin: Set bid allocation
  const setBidAllocation = (newAllocation: BidAllocation) => {
    if (!user.isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only administrators can set bid allocations.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setAllocation(newAllocation);
      setLoading(false);
      toast({
        title: "Allocation Updated",
        description: "Bid allocation has been updated successfully.",
      });
    }, 500);
  };

  // Get user bids
  const getUserBids = (): Bid[] => {
    return bids.filter(bid => bid.userId === user.id);
  };

  // Get bids accepted by user
  const getAcceptedBids = (): Bid[] => {
    return bids.filter(bid => bid.acceptedBy === user.id);
  };

  // Get pending bids (that can be accepted)
  const getPendingBids = (): Bid[] => {
    return bids.filter(bid => bid.status === 'pending');
  };

  // For admin: get all bids
  const getAllBids = (): Bid[] => {
    return user.isAdmin ? bids : [];
  };

  return {
    user,
    users,
    bids,
    allocation,
    loading,
    placeBid,
    acceptBid,
    confirmPayment,
    setBidAllocation,
    getUserBids,
    getAcceptedBids,
    getPendingBids,
    getAllBids,
    isAdmin: user.isAdmin,
  };
};
