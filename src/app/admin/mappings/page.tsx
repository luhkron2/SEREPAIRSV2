'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Download, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface MappingsData {
  drivers: Record<string, { phone: string }>;
  fleets: Record<string, { rego: string }>;
  trailers: Record<string, { rego: string; type: string; status: string; location: string }>;
}

export default function AdminMappingsPage() {
  const [mappings, setMappings] = useState<MappingsData>({ drivers: {}, fleets: {}, trailers: {} });
  const [newDriver, setNewDriver] = useState({ name: '', phone: '' });
  const [newFleet, setNewFleet] = useState({ number: '', rego: '' });
  const [newTrailer, setNewTrailer] = useState({ fleetNumber: '', rego: '', type: 'Trailer A' });

  useEffect(() => {
    fetchMappings();
  }, []);

  const fetchMappings = async () => {
    try {
      const response = await fetch('/api/mappings');
      if (response.ok) {
        const data = await response.json();
        setMappings(data);
      }
    } catch (error) {
      console.error('Failed to fetch mappings:', error);
    }
  };

  const addDriver = async () => {
    if (!newDriver.name || !newDriver.phone) {
      toast.error('Name and phone are required');
      return;
    }

    try {
      const response = await fetch('/api/mappings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'driver',
          key: newDriver.name,
          value: JSON.stringify({ phone: newDriver.phone }),
        }),
      });

      if (response.ok) {
        toast.success('Driver added');
        setNewDriver({ name: '', phone: '' });
        fetchMappings();
      }
    } catch (error) {
      toast.error('Failed to add driver');
    }
  };

  const addFleet = async () => {
    if (!newFleet.number || !newFleet.rego) {
      toast.error('Fleet number and registration are required');
      return;
    }

    try {
      const response = await fetch('/api/mappings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'fleet',
          key: newFleet.number,
          value: JSON.stringify({ rego: newFleet.rego }),
        }),
      });

      if (response.ok) {
        toast.success('Fleet added');
        setNewFleet({ number: '', rego: '' });
        fetchMappings();
      }
    } catch (error) {
      toast.error('Failed to add fleet');
    }
  };

  const addTrailer = async () => {
    if (!newTrailer.fleetNumber || !newTrailer.rego) {
      toast.error('Fleet number and registration are required');
      return;
    }

    try {
      const response = await fetch('/api/mappings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'trailer',
          key: newTrailer.fleetNumber,
          value: JSON.stringify({ 
            rego: newTrailer.rego, 
            type: newTrailer.type,
            status: 'Active',
            location: 'TBD'
          }),
        }),
      });

      if (response.ok) {
        toast.success('Trailer added');
        setNewTrailer({ fleetNumber: '', rego: '', type: 'Trailer A' });
        fetchMappings();
      }
    } catch (error) {
      toast.error('Failed to add trailer');
    }
  };

  const deleteMapping = async (kind: string, key: string) => {
    try {
      const response = await fetch('/api/mappings', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, key }),
      });

      if (response.ok) {
        toast.success('Deleted successfully');
        fetchMappings();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const exportData = () => {
    const data = {
      drivers: mappings.drivers,
      fleets: mappings.fleets,
      trailers: mappings.trailers,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mappings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Fleet Data Management</h1>
        <Button onClick={exportData} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <Tabs defaultValue="drivers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="fleets">Fleet Units</TabsTrigger>
          <TabsTrigger value="trailers">Trailers</TabsTrigger>
        </TabsList>

        <TabsContent value="drivers">
          <Card>
            <CardHeader>
              <CardTitle>Driver Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Input
                  placeholder="Driver Name"
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                />
                <Input
                  placeholder="Phone Number"
                  value={newDriver.phone}
                  onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                />
                <Button onClick={addDriver}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Driver
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(mappings.drivers).map(([name, data]) => (
                    <TableRow key={name}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{data.phone}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMapping('driver', name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fleets">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Unit Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Input
                  placeholder="Fleet Number"
                  value={newFleet.number}
                  onChange={(e) => setNewFleet({ ...newFleet, number: e.target.value })}
                />
                <Input
                  placeholder="Registration"
                  value={newFleet.rego}
                  onChange={(e) => setNewFleet({ ...newFleet, rego: e.target.value })}
                />
                <Button onClick={addFleet}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Fleet Unit
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fleet Number</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(mappings.fleets).map(([number, data]) => (
                    <TableRow key={number}>
                      <TableCell>{number}</TableCell>
                      <TableCell>{data.rego}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMapping('fleet', number)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trailers">
          <Card>
            <CardHeader>
              <CardTitle>Trailer Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Input
                  placeholder="Fleet Number (e.g., 03A)"
                  value={newTrailer.fleetNumber}
                  onChange={(e) => setNewTrailer({ ...newTrailer, fleetNumber: e.target.value })}
                />
                <Input
                  placeholder="Registration"
                  value={newTrailer.rego}
                  onChange={(e) => setNewTrailer({ ...newTrailer, rego: e.target.value })}
                />
                <select
                  value={newTrailer.type}
                  onChange={(e) => setNewTrailer({ ...newTrailer, type: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="Trailer A">Trailer A</option>
                  <option value="Trailer B">Trailer B</option>
                </select>
                <Button onClick={addTrailer}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Trailer
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fleet Number</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(mappings.trailers).map(([fleetNumber, data]) => (
                    <TableRow key={fleetNumber}>
                      <TableCell>{fleetNumber}</TableCell>
                      <TableCell>{data.rego}</TableCell>
                      <TableCell>{data.type}</TableCell>
                      <TableCell>{data.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMapping('trailer', fleetNumber)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}