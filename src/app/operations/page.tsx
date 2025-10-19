'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { formatMelbourneShort } from '@/lib/time';
import { Download, Search, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Issue } from '@prisma/client';

export default function OperationsPage() {
  const { isAuthenticated, accessLevel, loading, logout, requireAuth } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);

  useEffect(() => {
    if (!loading && !requireAuth('operations')) {
      return;
    }
  }, [loading, requireAuth]);

  useEffect(() => {
    if (isAuthenticated && accessLevel === 'operations') {
      fetchIssues();
    }
  }, [isAuthenticated, accessLevel]);

  useEffect(() => {
    const filtered = issues.filter((issue) => {
      const search = searchQuery.toLowerCase();
      return (
        issue.fleetNumber.toLowerCase().includes(search) ||
        issue.driverName.toLowerCase().includes(search) ||
        issue.description.toLowerCase().includes(search) ||
        issue.ticket.toString().includes(search)
      );
    });
    setFilteredIssues(filtered);
  }, [issues, searchQuery]);

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

  const handleExport = async (format: 'csv' | 'pdf') => {
    try {
      const response = await fetch(`/api/export/${format}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `issues-export.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to export:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || accessLevel !== 'operations') {
    return null; // Will redirect via useAuth
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/workshop" className="text-xl font-bold">SE Repairs</Link>
              <nav className="hidden md:flex gap-4">
                <Link href="/workshop" className="text-sm font-medium">Workshop</Link>
                <Link href="/operations" className="text-sm font-medium">Operations</Link>
                <Link href="/admin/mappings" className="text-sm font-medium">Admin</Link>
              </nav>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Operations Dashboard</h1>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by ticket, fleet, driver, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleExport('csv')}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={() => handleExport('pdf')}>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <div className="bg-card rounded-2xl border p-6">
            <div className="space-y-4">
              {issues.filter(issue => issue.status === 'SCHEDULED').map((issue) => (
                <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">#{issue.ticket} - {issue.fleetNumber}</h4>
                    <p className="text-sm text-muted-foreground">{issue.description}</p>
                    <p className="text-xs text-muted-foreground">Driver: {issue.driverName}</p>
                  </div>
                  <div className="text-right">
                    <SeverityBadge severity={issue.severity} />
                    <p className="text-xs text-muted-foreground mt-1">Scheduled</p>
                  </div>
                </div>
              ))}
              {issues.filter(issue => issue.status === 'SCHEDULED').length === 0 && (
                <p className="text-center text-muted-foreground py-8">No scheduled repairs for today</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Fleet</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">#{issue.ticket}</TableCell>
                  <TableCell><StatusBadge status={issue.status} /></TableCell>
                  <TableCell><SeverityBadge severity={issue.severity} /></TableCell>
                  <TableCell>{issue.fleetNumber}</TableCell>
                  <TableCell>{issue.driverName}</TableCell>
                  <TableCell>{issue.category}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatMelbourneShort(issue.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Link href={`/issues/${issue.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredIssues.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No issues found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

