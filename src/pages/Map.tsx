import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockIssues } from '@/data/mockIssues';
import { CATEGORY_INFO, STATUS_INFO } from '@/types/issue';
import { 
  MapPin, 
  Layers, 
  Filter, 
  X, 
  ChevronRight,
  ThumbsUp,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const MapPage = () => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [showList, setShowList] = useState(true);

  const issue = selectedIssue ? mockIssues.find((i) => i.id === selectedIssue) : null;

  return (
    <Layout showFooter={false}>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Map Area */}
        <div className="flex-1 relative bg-muted">
          {/* Map Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="text-center max-w-md p-8">
              <div className="w-20 h-20 rounded-full gradient-hero mx-auto mb-6 flex items-center justify-center">
                <MapPin className="h-10 w-10 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Interactive Map</h2>
              <p className="text-muted-foreground mb-6">
                To enable the interactive map with issue markers, you'll need to add your Mapbox public token.
              </p>
              <div className="bg-card p-4 rounded-lg text-left text-sm">
                <p className="font-medium mb-2">Setup Instructions:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Go to <a href="https://mapbox.com" target="_blank" rel="noopener" className="text-primary hover:underline">mapbox.com</a></li>
                  <li>Create an account or sign in</li>
                  <li>Copy your public token from the dashboard</li>
                  <li>Add it to your environment</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Map Markers Visualization */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {mockIssues.map((issue, index) => {
              const status = STATUS_INFO[issue.status];
              const positions = [
                { top: '20%', left: '30%' },
                { top: '35%', left: '60%' },
                { top: '50%', left: '25%' },
                { top: '40%', left: '75%' },
                { top: '65%', left: '45%' },
                { top: '25%', left: '50%' },
              ];
              const pos = positions[index % positions.length];
              
              return (
                <button
                  key={issue.id}
                  className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => setSelectedIssue(issue.id)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 ${
                    issue.status === 'pending' ? 'bg-status-pending' :
                    issue.status === 'in_progress' ? 'bg-status-progress' :
                    'bg-status-resolved'
                  }`}>
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 shadow-lg" style={{
                    backgroundColor: issue.status === 'pending' ? 'hsl(var(--status-pending))' :
                      issue.status === 'in_progress' ? 'hsl(var(--status-progress))' :
                      'hsl(var(--status-resolved))'
                  }} />
                </button>
              );
            })}
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Button variant="secondary" size="icon" className="shadow-lg">
              <Layers className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="shadow-lg">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <p className="text-xs font-medium mb-2">Status Legend</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-status-pending" />
                <span>Pending</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-status-progress" />
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-status-resolved" />
                <span>Resolved</span>
              </div>
            </div>
          </div>

          {/* Toggle List Button (Mobile) */}
          <Button
            variant="secondary"
            className="absolute bottom-4 right-4 shadow-lg lg:hidden"
            onClick={() => setShowList(!showList)}
          >
            {showList ? 'Hide List' : 'Show List'}
          </Button>
        </div>

        {/* Sidebar */}
        <div className={`w-full lg:w-96 border-l bg-background overflow-auto transition-all ${
          showList ? 'block' : 'hidden lg:block'
        }`}>
          {/* Selected Issue Detail */}
          {issue ? (
            <div className="p-4 border-b bg-card">
              <div className="flex items-start justify-between mb-3">
                <Badge variant={STATUS_INFO[issue.status].variant}>
                  {STATUS_INFO[issue.status].label}
                </Badge>
                <Button variant="ghost" size="icon" onClick={() => setSelectedIssue(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {issue.images[0] && (
                <img
                  src={issue.images[0]}
                  alt={issue.title}
                  className="w-full aspect-video object-cover rounded-lg mb-3"
                />
              )}
              
              <h3 className="font-semibold text-lg mb-2">{issue.title}</h3>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="category">
                  {CATEGORY_INFO[issue.category].icon} {CATEGORY_INFO[issue.category].label}
                </Badge>
                {(issue.priority === 'high' || issue.priority === 'critical') && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {issue.priority}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {issue.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{issue.upvotes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}</span>
                </div>
              </div>
              
              <Link to={`/issues/${issue.id}`}>
                <Button variant="hero" className="w-full gap-2">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Issues in View</h2>
              <p className="text-sm text-muted-foreground">
                Click a marker to view details
              </p>
            </div>
          )}

          {/* Issues List */}
          <div className="divide-y">
            {mockIssues.map((issueItem) => {
              const category = CATEGORY_INFO[issueItem.category];
              const status = STATUS_INFO[issueItem.status];
              const isSelected = selectedIssue === issueItem.id;
              
              return (
                <button
                  key={issueItem.id}
                  className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                    isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                  }`}
                  onClick={() => setSelectedIssue(issueItem.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      issueItem.status === 'pending' ? 'bg-status-pending/10' :
                      issueItem.status === 'in_progress' ? 'bg-status-progress/10' :
                      'bg-status-resolved/10'
                    }`}>
                      <span className="text-xl">{category.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={status.variant} className="text-[10px] px-1.5 py-0">
                          {status.label}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm line-clamp-1">{issueItem.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {issueItem.location.address}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MapPage;
