
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, DollarSign, Users, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 space-y-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              The Peer-to-Peer Payment System
            </h1>
            <p className="text-xl text-muted-foreground">
              A secure and efficient way to place bids and earn interest through a
              competitive peer-to-peer platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" onClick={() => navigate("/register")}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                Login to Your Account
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our platform offers a unique approach to peer-to-peer payments with competitive
              bidding and interest accumulation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Competitive Bidding</h3>
              <p className="text-muted-foreground">
                Place bids and choose your preferred duration to maximize your interest returns.
              </p>
            </div>
            
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Scheduled Bidding</h3>
              <p className="text-muted-foreground">
                Participate in scheduled bids at 7 AM, 1 PM, and 7 PM to ensure fair access for all users.
              </p>
            </div>
            
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Secure Transactions</h3>
              <p className="text-muted-foreground">
                Every transaction is verified and secured through our confirmation system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Investment Returns</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Choose your preferred duration and earn competitive interest rates on your investments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="border bg-card text-card-foreground shadow-sm rounded-lg overflow-hidden">
              <div className="bg-primary p-4 text-primary-foreground text-center">
                <h3 className="text-lg font-medium">24 Hours</h3>
              </div>
              <div className="p-6 text-center">
                <p className="text-4xl font-bold mb-4">50%</p>
                <p className="text-muted-foreground">Interest Rate</p>
                <Button className="mt-4 w-full" variant="outline" onClick={() => navigate("/register")}>
                  Get Started
                </Button>
              </div>
            </div>
            
            <div className="border bg-card text-card-foreground shadow-sm rounded-lg overflow-hidden">
              <div className="bg-primary p-4 text-primary-foreground text-center">
                <h3 className="text-lg font-medium">48 Hours</h3>
              </div>
              <div className="p-6 text-center">
                <p className="text-4xl font-bold mb-4">75%</p>
                <p className="text-muted-foreground">Interest Rate</p>
                <Button className="mt-4 w-full" variant="outline" onClick={() => navigate("/register")}>
                  Get Started
                </Button>
              </div>
            </div>
            
            <div className="border bg-card text-card-foreground shadow-sm rounded-lg overflow-hidden">
              <div className="bg-primary p-4 text-primary-foreground text-center">
                <h3 className="text-lg font-medium">72 Hours</h3>
              </div>
              <div className="p-6 text-center">
                <p className="text-4xl font-bold mb-4">100%</p>
                <p className="text-muted-foreground">Interest Rate</p>
                <Button className="mt-4 w-full" variant="outline" onClick={() => navigate("/register")}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join our platform today and start placing bids to earn competitive interest rates
            on your investments.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate("/register")}
          >
            Create Your Account Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © 2023 P2P Payment System. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="ghost" size="sm">Terms of Service</Button>
              <Button variant="ghost" size="sm">Privacy Policy</Button>
              <Button variant="ghost" size="sm">Contact Us</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
