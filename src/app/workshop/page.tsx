'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IssueCard } from '@/components/issue-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Logo } from '@/components/ui/logo';
import { Navigation } from '@/components/navigation';
import { LogOut, Filter } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Issue } from '@prisma/client';
import { TruckBooking } from '@/components/truck-booking';

export default function WorkshopPage() {
  const { isAuthenticated, accessLevel, loading, logout } = useAuth();
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [fleetFilter, setFleetFilter] = useState<string>('');

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || accessLevel !== 'workshop') {
        router.push('/access');
        return;
      }
      fetchIssues();
    }
  }, [loading, isAuthenticated, accessLevel, router]);

  useEffect(() => {
    filterIssues();
  }, [issues, severityFilter, fleetFilter]);

  const fetchIssues = async () => {
    try {
      const response = await fetch('/api/issues');
      if (response.ok) {
        const data = await response.json();
        setIssues(data);
      }
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    }
  };

  const filterIssues = () => {
    let filtered = [...issues];
    
    if (severityFilter !== 'all') {
      filtered = filtered.filter((issue) => issue.severity === severityFilter);
    }
    
    if (fleetFilter) {
      filtered = filtered.filter((issue) => 
        issue.fleetNumber.toLowerCase().includes(fleetFilter.toLowerCase())
      );
    }
    
    setFilteredIssues(filtered);
  };

  const getIssuesByStatus = (status: string) => {
    return filteredIssues.filter((issue) => issue.status === status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || accessLevel !== 'workshop') {
    return null; // Will redirect via useAuth
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Logo size="lg" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Workshop Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">Manage and track repair issues</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="CRITICAL">Critical</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              placeholder="Filter by fleet..."
              value={fleetFilter}
              onChange={(e) => setFleetFilter(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </div>

        <Tabs defaultValue="kanban">
          <TabsList>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="booking">Book Service</TabsTrigger>
          </TabsList>

          <TabsContent value="kanban">
            <div className="grid md:grid-cols-4 gap-6">
              {['PENDING', 'IN_PROGRESS', 'SCHEDULED', 'COMPLETED'].map((status) => (
                <Card key={status} className="rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      {status.replace('_', ' ')}
                      <span className="ml-2 text-muted-foreground">
                        ({getIssuesByStatus(status).length})
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-[calc(100vh-24rem)] overflow-y-auto">
                    {getIssuesByStatus(status).map((issue) => (
                      <IssueCard
                        key={issue.id}
                        issue={issue}
                        onSchedule={() => {}}
                        onComment={() => {}}
                      />
                    ))}
                    {getIssuesByStatus(status).length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No issues
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="grid gap-6">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getIssuesByStatus('SCHEDULED').map((issue) => (
                      <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{issue.fleetNumber}</h4>
                          <p className="text-sm text-muted-foreground">{issue.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{issue.severity}</p>
                          <p className="text-xs text-muted-foreground">Scheduled</p>
                        </div>
                      </div>
                    ))}
                    {getIssuesByStatus('SCHEDULED').length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No scheduled repairs for today</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="booking">
            <div className="grid gap-6">
              <TruckBooking />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

