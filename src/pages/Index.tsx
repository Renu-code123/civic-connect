import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Camera, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  Zap,
  Eye,
  Bell,
  Shield
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { mockIssues } from '@/data/mockIssues';
import { CATEGORY_INFO, STATUS_INFO } from '@/types/issue';

const stats = [
  { label: 'Issues Reported', value: '2,847', icon: MapPin },
  { label: 'Issues Resolved', value: '1,923', icon: CheckCircle2 },
  { label: 'Active Citizens', value: '12.4K', icon: Users },
  { label: 'Avg Resolution', value: '3.2 days', icon: Zap },
];

const features = [
  {
    icon: Camera,
    title: 'Photo Evidence',
    description: 'Capture and upload images as proof of civic issues for better documentation.',
  },
  {
    icon: MapPin,
    title: 'GPS Location',
    description: 'Automatic location detection ensures accurate issue placement on the map.',
  },
  {
    icon: Eye,
    title: 'Real-time Tracking',
    description: 'Follow your reported issues from submission to resolution with live updates.',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Get notified when your issues are acknowledged, updated, or resolved.',
  },
  {
    icon: Shield,
    title: 'Verified Reports',
    description: 'Our verification system ensures authentic reports from real citizens.',
  },
  {
    icon: Users,
    title: 'Community Voting',
    description: 'Upvote important issues to help prioritize critical civic problems.',
  },
];

const Index = () => {
  const recentIssues = mockIssues.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm animate-fade-in">
              <Zap className="h-4 w-4" />
              <span>Powered by community engagement</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Report Civic Issues,
              <br />
              <span className="text-accent">Transform Your City</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Empower your community by reporting potholes, broken lights, garbage, and more. 
              Track progress in real-time and see your city improve.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/report">
                <Button variant="accent" size="xl" className="gap-2 w-full sm:w-auto">
                  <Camera className="h-5 w-5" />
                  Report an Issue
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="glass" size="xl" className="gap-2 w-full sm:w-auto border-white/20 text-white hover:bg-white/20">
                  <MapPin className="h-5 w-5" />
                  Explore Map
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-6">
                    <div className="mx-auto w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Issues Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Recent Reports</h2>
              <p className="text-muted-foreground mt-1">Latest civic issues reported by the community</p>
            </div>
            <Link to="/issues">
              <Button variant="outline" className="gap-2 hidden sm:flex">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentIssues.map((issue, index) => {
              const category = CATEGORY_INFO[issue.category];
              const status = STATUS_INFO[issue.status];
              return (
                <Link to={`/issues/${issue.id}`} key={issue.id}>
                  <Card className="group h-full overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      {issue.images[0] ? (
                        <img
                          src={issue.images[0]}
                          alt={issue.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          {category.icon}
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                    </div>
                    <CardContent className="pt-4 space-y-2">
                      <Badge variant="category" className="gap-1">
                        <span>{category.icon}</span>
                        {category.label}
                      </Badge>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                        {issue.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {issue.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">{issue.location.address?.split(',')[0]}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/issues">
              <Button variant="outline" className="gap-2">
                View All Issues
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Our platform makes it easy to report and track civic issues in your community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Join thousands of citizens who are actively improving their communities. 
                  Report your first issue today and be part of the change.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/register">
                    <Button variant="hero" size="lg" className="gap-2 w-full sm:w-auto">
                      Get Started Free
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/map">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Explore Issues
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto gradient-hero">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="h-16 w-16 mx-auto mb-4 animate-bounce" />
                    <p className="text-xl font-semibold">Your Voice Matters</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
