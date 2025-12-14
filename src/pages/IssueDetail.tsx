import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { mockIssues } from '@/data/mockIssues';
import { CATEGORY_INFO, STATUS_INFO } from '@/types/issue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  User, 
  ThumbsUp, 
  MessageCircle, 
  Share2,
  AlertTriangle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

const IssueDetail = () => {
  const { id } = useParams();
  const issue = mockIssues.find((i) => i.id === id);

  if (!issue) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-2">Issue Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The issue you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/issues">
            <Button variant="hero">Browse All Issues</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const category = CATEGORY_INFO[issue.category];
  const status = STATUS_INFO[issue.status];

  const timeline = [
    {
      date: issue.createdAt,
      title: 'Issue Reported',
      description: `Reported by ${issue.createdBy.name}`,
      icon: AlertTriangle,
      color: 'bg-accent',
    },
    ...(issue.status !== 'pending' ? [{
      date: issue.updatedAt,
      title: issue.status === 'resolved' ? 'Issue Resolved' : 'Under Review',
      description: issue.assignedTo ? `Assigned to ${issue.assignedTo}` : 'Being reviewed by authorities',
      icon: issue.status === 'resolved' ? CheckCircle2 : Loader2,
      color: issue.status === 'resolved' ? 'bg-status-resolved' : 'bg-status-progress',
    }] : []),
  ];

  return (
    <Layout>
      <div className="container py-8">
        {/* Back Button */}
        <Link to="/issues" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Issues
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="category" className="gap-1">
                  <span>{category.icon}</span>
                  {category.label}
                </Badge>
                <Badge variant={status.variant}>
                  {status.label}
                </Badge>
                {issue.priority === 'high' || issue.priority === 'critical' ? (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {issue.priority === 'critical' ? 'Critical' : 'High Priority'}
                  </Badge>
                ) : null}
              </div>
              <h1 className="text-3xl font-bold">{issue.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{issue.createdBy.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}</span>
                </div>
              </div>
            </div>

            {/* Image */}
            {issue.images[0] && (
              <Card className="overflow-hidden">
                <img
                  src={issue.images[0]}
                  alt={issue.title}
                  className="w-full aspect-video object-cover"
                />
              </Card>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {issue.description}
                </p>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
                <ThumbsUp className="h-4 w-4" />
                Upvote ({issue.upvotes})
              </Button>
              <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
                <MessageCircle className="h-4 w-4" />
                Comment ({issue.comments})
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Comments Section Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comments ({issue.comments})</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Sign in to view and post comments
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {issue.location.address || 'Location not specified'}
                </p>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Map Preview</p>
                    <Link to="/map">
                      <Button variant="link" size="sm">View on Map</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((event, index) => {
                    const Icon = event.icon;
                    return (
                      <div key={index} className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full ${event.color} flex items-center justify-center shrink-0`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(event.date), 'MMM d, yyyy • h:mm a')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{issue.upvotes}</div>
                    <div className="text-xs text-muted-foreground">Upvotes</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{issue.comments}</div>
                    <div className="text-xs text-muted-foreground">Comments</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IssueDetail;
