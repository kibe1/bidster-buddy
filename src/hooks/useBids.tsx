
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

// Define the types for our data structures
export interface Bid {
  id: string;
  userId: string;
  amount: number;
  duration: 24 | 48 | 72;
  status: 'pending' | 'active' | 'completed';
  createdAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  acceptedBy?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
}

export function useBids() {
  const { user } = useAuth();
  const [bids, setBids] = useState<Bid[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Mock data for demonstration
  useEffect(() => {
    // Mock users
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        role: 'user',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1987654321',
        role: 'admin',
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '+1122334455',
        role: 'user',
      },
    ];

    // Mock bids
    const mockBids: Bid[] = [
      {
        id: '1',
        userId: '1',
        amount: 1000,
        duration: 24,
        status: 'pending',
        createdAt: new Date(),
      },
      {
        id: '2',
        userId: '3',
        amount: 2000,
        duration: 48,
        status: 'active',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        acceptedAt: new Date(),
        acceptedBy: '1',
      },
      {
        id: '3',
        userId: '1',
        amount: 1500,
        duration: 72,
        status: 'completed',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        acceptedAt: new Date(Date.now() - 172800000),
        completedAt: new Date(),
        acceptedBy: '3',
      },
    ];

    setBids(mockBids);
    setUsers(mockUsers);
  }, []);

  // Function to place a new bid
  const placeBid = async (amount: number, duration: 24 | 48 | 72) => {
    if (!user) {
      toast.error('You must be logged in to place a bid');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll just create a new bid locally
      const newBid: Bid = {
        id: `bid-${Date.now()}`,
        userId: user.id,
        amount,
        duration,
        status: 'pending',
        createdAt: new Date(),
      };

      // Add the new bid to the bids array
      setBids((prevBids) => [...prevBids, newBid]);
      
      // Simulate a delay for the API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      return newBid;
    } catch (error) {
      console.error('Error placing bid:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to accept a bid
  const acceptBid = async (bidId: string) => {
    if (!user) {
      toast.error('You must be logged in to accept a bid');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll just update the bid locally
      setBids((prevBids) =>
        prevBids.map((bid) => {
          if (bid.id === bidId) {
            return {
              ...bid,
              status: 'active',
              acceptedAt: new Date(),
              acceptedBy: user.id,
            };
          }
          return bid;
        })
      );
      
      // Simulate a delay for the API call
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error accepting bid:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to confirm payment for a bid
  const confirmPayment = async (bidId: string) => {
    if (!user) {
      toast.error('You must be logged in to confirm payment');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll just update the bid locally
      setBids((prevBids) =>
        prevBids.map((bid) => {
          if (bid.id === bidId) {
            return {
              ...bid,
              status: 'completed',
              completedAt: new Date(),
            };
          }
          return bid;
        })
      );
      
      // Simulate a delay for the API call
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function for admin to set bid allocations
  const setBidAllocation = async (
    morningAllocation: number,
    afternoonAllocation: number,
    eveningAllocation: number
  ) => {
    if (!user || user.role !== 'admin') {
      toast.error('Only admins can set bid allocations');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would be an API call to update the bid allocations
      // For now, we'll just simulate a successful update
      console.log('Bid allocations updated:', {
        morning: morningAllocation,
        afternoon: afternoonAllocation,
        evening: eveningAllocation,
      });
      
      // Simulate a delay for the API call
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error setting bid allocations:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    bids,
    users,
    loading,
    placeBid,
    acceptBid,
    confirmPayment,
    setBidAllocation,
  };
}
