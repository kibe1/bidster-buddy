
import React from 'react';
import Card from '@/components/ui-custom/Card';
import Badge from '@/components/ui-custom/Badge';
import { Clock, Users, Calendar, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Scheduled Bidding",
      description: "Participate in scheduled bids at 7 AM, 1 PM, and 7 PM daily. Never miss an opportunity to grow your investment."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Peer-to-Peer System",
      description: "Connect directly with other users in a secure environment. No middlemen, no extra fees."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Flexible Duration",
      description: "Choose your preferred bid duration - 24, 48, or 72 hours - and earn interest based on your choice."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure Transactions",
      description: "All transactions and user data are protected with industry-standard security measures."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-3" size="md">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Designed for Simplicity</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our platform combines powerful features with an intuitive interface, 
            making peer-to-peer bidding accessible to everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              variant="glass" 
              className="text-center" 
              animate={true}
              animationDelay={index * 100 + 100}
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70 text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-3" size="md">The Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Bidding Works</h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2 md:translate-x-0"></div>
              
              {/* Steps */}
              {[
                {
                  number: "01",
                  title: "Create an Account",
                  description: "Sign up with your details and verify your phone number to get started."
                },
                {
                  number: "02",
                  title: "Place Your Bid",
                  description: "Choose your bid amount and duration (24, 48, or 72 hours)."
                },
                {
                  number: "03",
                  title: "Get Matched",
                  description: "Your bid will be matched with another user on a first-come, first-served basis."
                },
                {
                  number: "04",
                  title: "Confirm Payment",
                  description: "Complete the offline payment and confirm the transaction in your dashboard."
                },
                {
                  number: "05",
                  title: "Earn Interest",
                  description: "Watch your bid run and collect your earnings with interest at the end of the duration."
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="relative flex flex-col md:flex-row items-center md:items-start gap-8 mb-12"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-24 h-24 bg-primary/10 text-primary rounded-full text-2xl font-bold animate-fadeIn" style={{ animationDelay: `${index * 200}ms` }}>
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 text-center md:text-left opacity-0 animate-fadeInRight" style={{ animationDelay: `${index * 200 + 100}ms`, animationFillMode: 'forwards' }}>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-foreground/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
