import { Issue, CATEGORY_INFO, STATUS_INFO } from '@/types/issue';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ThumbsUp, MessageCircle, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const category = CATEGORY_INFO[issue.category];
  const status = STATUS_INFO[issue.status];

  return (
    <Link to={`/issues/${issue.id}`}>
      <Card className="group cursor-pointer overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            {issue.images[0] ? (
              <div className="sm:w-40 h-32 sm:h-auto relative overflow-hidden">
                <img
                  src={issue.images[0]}
                  alt={issue.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            ) : (
              <div className="sm:w-40 h-32 sm:h-auto bg-muted flex items-center justify-center">
                <span className="text-4xl">{category.icon}</span>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="category" className="gap-1">
                      <span>{category.icon}</span>
                      {category.label}
                    </Badge>
                    <Badge variant={status.variant}>
                      {status.label}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                    {issue.title}
                  </h3>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {issue.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate max-w-[150px]">{issue.location.address?.split(',')[0]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t">
                <div className="flex items-center gap-1.5 text-sm">
                  <ThumbsUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">{issue.upvotes}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span>{issue.comments}</span>
                </div>
                <span className="text-sm text-muted-foreground ml-auto">
                  by {issue.createdBy.name}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
