import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { IssueCard } from '@/components/issues/IssueCard';
import { IssueFilters, IssueFilterState } from '@/components/issues/IssueFilters';
import { mockIssues } from '@/data/mockIssues';
import { Button } from '@/components/ui/button';
import { PlusCircle, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';

const IssuesPage = () => {
  const [filters, setFilters] = useState<IssueFilterState>({
    search: '',
    status: 'all',
    category: 'all',
  });
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredIssues = useMemo(() => {
    return mockIssues.filter((issue) => {
      const matchesSearch =
        !filters.search ||
        issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || issue.status === filters.status;
      const matchesCategory = filters.category === 'all' || issue.category === filters.category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [filters]);

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Civic Issues</h1>
            <p className="text-muted-foreground mt-1">
              Browse and track all reported issues in your area
            </p>
          </div>
          <Link to="/report">
            <Button variant="hero" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Report Issue
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <IssueFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* View Toggle & Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredIssues.length}</span> issues
          </p>
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Issues List/Grid */}
        {filteredIssues.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-4' : 'space-y-4'}>
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No issues found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button variant="outline" onClick={() => setFilters({ search: '', status: 'all', category: 'all' })}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IssuesPage;
