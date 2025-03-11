
import React from 'react';
import Card from '@/components/ui-custom/Card';
import Badge from '@/components/ui-custom/Badge';
import Button from '@/components/ui-custom/Button';
import { Clock, Check, AlertCircle } from 'lucide-react';

export interface BidProps {
  id: string;
  amount: number;
  duration: 24 | 48 | 72;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  endTime?: Date;
  acceptedBy?: string;
  actionButtons?: React.ReactNode; // Added this prop to fix the TypeScript error
  onAccept?: (id: string) => void;
  onConfirmPayment?: (id: string) => void;
}

const BidCard = ({
  id,
  amount,
  duration,
  status,
  createdAt,
  endTime,
  acceptedBy,
  actionButtons,
  onAccept,
  onConfirmPayment
}: BidProps) => {
  // Calculate interest based on duration
  const getInterestRate = () => {
    switch (duration) {
      case 24: return 0.5; // 50%
      case 48: return 0.75; // 75%
      case 72: return 1.0; // 100%
      default: return 0;
    }
  };

  const interestRate = getInterestRate();
  const estimatedEarnings = amount * interestRate;
  const totalReturn = amount + estimatedEarnings;

  // Format time remaining if bid is active
  const getTimeRemaining = () => {
    if (!endTime || status !== 'active') return null;
    
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    
    if (diff <= 0) return "Completed";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };

  // Status badge config
  const getStatusBadge = () => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Awaiting Match</Badge>;
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'completed':
        return <Badge variant="primary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card 
      variant="glass" 
      className="h-full transition-all duration-300 hover:shadow-card"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-foreground/60">Bid #{id.slice(0, 8)}</p>
          <h3 className="text-xl font-bold">${amount.toLocaleString()}</h3>
        </div>
        {getStatusBadge()}
      </div>

      <div className="border-t border-border pt-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-foreground/70">Duration</span>
          <span className="font-medium">{duration} hours</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-foreground/70">Interest Rate</span>
          <span className="font-medium">{interestRate * 100}%</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-foreground/70">Earnings</span>
          <span className="font-medium text-primary">${estimatedEarnings.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/70">Total Return</span>
          <span className="font-bold">${totalReturn.toLocaleString()}</span>
        </div>
      </div>

      {status === 'active' && endTime && (
        <div className="bg-primary/5 p-3 rounded-lg mb-4 flex items-center">
          <Clock className="text-primary mr-2 h-4 w-4" />
          <span className="text-sm font-medium">{getTimeRemaining()}</span>
        </div>
      )}

      {/* Render action buttons if provided */}
      {actionButtons && (
        <div className="mt-4">
          {actionButtons}
        </div>
      )}

      {status === 'pending' && onAccept && !actionButtons && (
        <Button 
          onClick={() => onAccept(id)} 
          className="w-full"
          leftIcon={<Check size={16} />}
        >
          Accept Bid
        </Button>
      )}

      {status === 'pending' && acceptedBy && onConfirmPayment && !actionButtons && (
        <div>
          <div className="bg-amber-50 p-3 rounded-lg mb-4 flex items-center">
            <AlertCircle className="text-amber-500 mr-2 h-4 w-4" />
            <span className="text-sm">Waiting for payment confirmation</span>
          </div>
          <Button 
            onClick={() => onConfirmPayment(id)} 
            className="w-full"
            variant="primary"
          >
            Confirm Payment Received
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BidCard;
