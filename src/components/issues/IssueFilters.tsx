import { Issue, CATEGORY_INFO, STATUS_INFO, IssueStatus, IssueCategory } from '@/types/issue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';
import { useState } from 'react';

interface IssueFiltersProps {
  onFilterChange: (filters: IssueFilterState) => void;
  filters: IssueFilterState;
}

export interface IssueFilterState {
  search: string;
  status: IssueStatus | 'all';
  category: IssueCategory | 'all';
}

export function IssueFilters({ onFilterChange, filters }: IssueFiltersProps) {
  const hasFilters = filters.search || filters.status !== 'all' || filters.category !== 'all';

  const clearFilters = () => {
    onFilterChange({ search: '', status: 'all', category: 'all' });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange({ ...filters, status: value as IssueStatus | 'all' })}
        >
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {Object.entries(STATUS_INFO).map(([key, info]) => (
              <SelectItem key={key} value={key}>
                {info.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select
          value={filters.category}
          onValueChange={(value) => onFilterChange({ ...filters, category: value as IssueCategory | 'all' })}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.entries(CATEGORY_INFO).map(([key, info]) => (
              <SelectItem key={key} value={key}>
                <span className="flex items-center gap-2">
                  <span>{info.icon}</span>
                  {info.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.status !== 'all' && (
            <Badge variant={STATUS_INFO[filters.status].variant}>
              {STATUS_INFO[filters.status].label}
            </Badge>
          )}
          {filters.category !== 'all' && (
            <Badge variant="category">
              {CATEGORY_INFO[filters.category].icon} {CATEGORY_INFO[filters.category].label}
            </Badge>
          )}
          {filters.search && (
            <Badge variant="secondary">
              Search: "{filters.search}"
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
