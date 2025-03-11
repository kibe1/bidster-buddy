
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui-custom/Button';
import Badge from '@/components/ui-custom/Badge';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge 
            variant="primary" 
            className="mb-6 animate-fadeInUp" 
            size="lg"
          >
            Smart Peer-to-Peer Bidding
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight md:leading-tight opacity-0 animate-fadeInUp" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            The Future of <span className="text-primary">P2P Payments</span> is Here
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl mx-auto opacity-0 animate-fadeInUp" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Earn interest on your bids with our competitive bidding system. 
            Choose your bid duration and maximize your earnings in a secure, 
            user-friendly environment.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fadeInUp" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <Link to="/register">
              <Button 
                size="lg" 
                rightIcon={<ArrowRight size={18} />}
                className="w-full sm:w-auto"
              >
                Get Started
              </Button>
            </Link>
            <Link to="#how-it-works">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
              >
                How It Works
              </Button>
            </Link>
          </div>
          
          {/* Interest Rates Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { duration: '24 hours', interest: '50%', delay: 400 },
              { duration: '48 hours', interest: '75%', delay: 500 },
              { duration: '72 hours', interest: '100%', delay: 600 }
            ].map((item, index) => (
              <div 
                key={index}
                className="glass-card p-6 flex flex-col items-center opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${item.delay}ms`, animationFillMode: 'forwards' }}
              >
                <div className="text-primary font-bold text-3xl mb-2">{item.interest}</div>
                <div className="text-foreground/70">{item.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
