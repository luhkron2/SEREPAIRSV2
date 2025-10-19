'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UploadZone } from '@/components/upload-zone';
import { fetchMappings, type MappingsCache } from '@/lib/mappings';
import { queueIssue, retryQueue, getQueueLength } from '@/lib/offline';
import { toast } from 'sonner';
import { Loader2, MapPin, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Navigation } from '@/components/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const reportSchema = z.object({
  driverName: z.string().min(1, 'Driver name is required'),
  driverPhone: z.string().optional(),
  fleetNumber: z.string().min(1, 'Fleet number is required'),
  primeRego: z.string().optional(),
  trailerA: z.string().optional(),
  trailerB: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  description: z.string().min(10, 'Description must be at least 10 characters'), 
  location: z.string().optional(),
  safeToContinue: z.string().optional(),
  preferredFrom: z.string().optional(),
  preferredTo: z.string().optional(),
});

type ReportForm = z.infer<typeof reportSchema>;

export default function ReportPage() {
  const { isAuthenticated, accessLevel, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mappings, setMappings] = useState<MappingsCache | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isOffline, setIsOffline] = useState(false);
  
  // Get dropdown data from database mappings
  const fleetNumbers = mappings ? Object.keys(mappings.fleets).filter(fleet => mappings.fleets[fleet].status === 'Active').sort() : [];
  const trailerAOptions = mappings ? Object.keys(mappings.trailers || {}).filter(trailer => mappings.trailers[trailer].type === 'Trailer A' && mappings.trailers[trailer].status === 'Active').sort() : [];
  const trailerBOptions = mappings ? Object.keys(mappings.trailers || {}).filter(trailer => mappings.trailers[trailer].type === 'Trailer B' && mappings.trailers[trailer].status === 'Active').sort() : [];
  const drivers = mappings ? Object.keys(mappings.drivers).filter(driver => mappings.drivers[driver].status === 'Active').sort() : [];

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ReportForm>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      severity: 'MEDIUM',
      safeToContinue: 'Yes',
    },
  });

  useEffect(() => {
    fetchMappings().then(setMappings).catch(console.error);
    
    const handleOnline = async () => {
      setIsOffline(false);
      // Retry offline queue when coming back online
      try {
        const result = await retryQueue();
        if (result.success > 0) {
          toast.success(`${result.success} offline reports submitted successfully!`);
        }
        if (result.failed > 0) {
          toast.error(`${result.failed} reports failed to sync. Please check your submissions.`);
        }
      } catch (error) {
        console.error('Error retrying offline queue:', error);
      }
    };
    
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOffline(!navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/access');
        return;
      }
    }
  }, [authLoading, isAuthenticated, router]);

  const driverName = watch('driverName');
  const fleetNumber = watch('fleetNumber');

  // Smart auto-fill logic - only auto-fill when fields are empty
  useEffect(() => {
    if (!mappings) return;
    
    // Auto-fill driver phone when driver name is selected (only if phone field is empty)
    if (driverName && mappings.drivers[driverName]) {
      const driverData = mappings.drivers[driverName];
      const currentPhone = watch('driverPhone');
      if (driverData.phone && (!currentPhone || currentPhone.trim() === '')) {
        setValue('driverPhone', driverData.phone);
      }
    }
    
    // Auto-fill fleet registration when fleet number is selected (only if rego field is empty)
    if (fleetNumber && mappings.fleets[fleetNumber]) {
      const fleetData = mappings.fleets[fleetNumber];
      const currentRego = watch('primeRego');
      if (fleetData.rego && (!currentRego || currentRego.trim() === '')) {
        setValue('primeRego', fleetData.rego);
      }
    }
    
  }, [fleetNumber, driverName, setValue, mappings, watch]);

  const useGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setValue('location', `GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          toast.success('Location captured');
        },
        (error) => {
          toast.error('Failed to get location');
        }
      );
    } else {
      toast.error('Geolocation not supported');
    }
  };

  const manualAutoFill = () => {
    if (!mappings) {
      toast.error('Data not loaded yet');
      return;
    }

    let filledCount = 0;

    // Auto-fill driver phone if driver name is selected
    if (driverName && mappings.drivers[driverName]) {
      const driverData = mappings.drivers[driverName];
      if (driverData.phone) {
        setValue('driverPhone', driverData.phone);
        filledCount++;
      }
    }
    
    // Auto-fill fleet registration if fleet number is selected
    if (fleetNumber && mappings.fleets[fleetNumber]) {
      const fleetData = mappings.fleets[fleetNumber];
      if (fleetData.rego) {
        setValue('primeRego', fleetData.rego);
        filledCount++;
      }
    }
    

    if (filledCount > 0) {
      toast.success(`Auto-filled ${filledCount} field${filledCount > 1 ? 's' : ''}`);
    } else {
      toast.info('No data available to auto-fill. Please select a fleet number or driver first.');
    }
  };

  const onSubmit = async (data: ReportForm) => {
    setLoading(true);
    let mediaUrls: string[] = [];
    
    try {
      if (files.length > 0) {
        const formData = new FormData();
        formData.append('issueId', 'temp');
        files.forEach((file) => formData.append('files', file));

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const { urls } = await uploadRes.json();
          mediaUrls = urls;
        }
      }

      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, mediaUrls }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
        throw new Error('Failed to submit report');
      }

      const { ticket } = await response.json();
      toast.success('Report submitted successfully!');
      router.push(`/thanks/${ticket}`);
    } catch (error) {
      if (isOffline || error instanceof TypeError) {
        // Queue for offline sync
        try {
          const queueId = await queueIssue({ ...data, mediaUrls });
          toast.success('Report saved offline. Will submit when you reconnect.');
          console.log('Queued offline issue:', queueId);
        } catch (queueError) {
          toast.error('Failed to save report offline. Please try again.');
        }
      } else {
        toast.error(error instanceof Error ? error.message : 'Failed to submit report');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <Logo size="lg" className="mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Report an Issue
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Submit a repair request for your truck or trailer
          </p>
        </div>

        <Card className="rounded-3xl border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="p-8">
            <div className="flex items-center gap-2 mb-4">
              {isOffline ? (
                <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-sm text-yellow-700 dark:text-yellow-400">
                  <WifiOff className="w-5 h-5" />
                  <span className="font-medium">You're currently offline. Your report will be submitted when you reconnect.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-sm text-green-700 dark:text-green-400">
                  <Wifi className="w-5 h-5" />
                  <span className="font-medium">You're online. Reports will be submitted immediately.</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Driver Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Driver Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driverName">Driver Name *</Label>
                    <Input id="driverName" {...register('driverName')} list="drivers" />
                    <datalist id="drivers">
                      {drivers.map((driver, index) => (
                        <option key={`${driver}-${index}`} value={driver} />
                      ))}
                    </datalist>
                    {errors.driverName && <p className="text-sm text-destructive">{errors.driverName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driverPhone">Phone</Label>
                    <Input id="driverPhone" {...register('driverPhone')} type="tel" />
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Vehicle Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fleetNumber">Fleet Number *</Label>
                    <Input id="fleetNumber" {...register('fleetNumber')} list="fleets" />
                    <datalist id="fleets">
                      {fleetNumbers.map((fleet) => (
                        <option key={fleet} value={fleet} />
                      ))}
                    </datalist>
                    {errors.fleetNumber && <p className="text-sm text-destructive">{errors.fleetNumber.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primeRego">Prime Rego</Label>
                    <Input id="primeRego" {...register('primeRego')} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trailerA">Trailer A</Label>
                    <Input id="trailerA" {...register('trailerA')} placeholder="e.g., 03A REGO" list="trailerA" />
                    <datalist id="trailerA">
                      {trailerAOptions.map((trailer, index) => (
                        <option key={`${trailer}-${index}`} value={`${trailer} ${mappings?.trailers[trailer]?.rego || ''}`} />
                      ))}
                    </datalist>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="trailerB">Trailer B</Label>
                    <Input id="trailerB" {...register('trailerB')} placeholder="e.g., 03B REGO" list="trailerB" />
                    <datalist id="trailerB">
                      {trailerBOptions.map((trailer, index) => (
                        <option key={`${trailer}-${index}`} value={`${trailer} ${mappings?.trailers[trailer]?.rego || ''}`} />
                      ))}
                    </datalist>
                  </div>
                </div>

              </div>

              {/* Issue Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Issue Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => setValue('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mechanical">Mechanical</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                        <SelectItem value="Body">Body</SelectItem>
                        <SelectItem value="Tyres">Tyres</SelectItem>
                        <SelectItem value="Brakes">Brakes</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Severity *</Label>
                    <RadioGroup defaultValue="MEDIUM" onValueChange={(value) => setValue('severity', value as any)}>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="LOW" id="low" />
                          <Label htmlFor="low" className="font-normal">Low</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="MEDIUM" id="medium" />
                          <Label htmlFor="medium" className="font-normal">Medium</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="HIGH" id="high" />
                          <Label htmlFor="high" className="font-normal">High</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="CRITICAL" id="critical" />
                          <Label htmlFor="critical" className="font-normal">Critical</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea id="description" {...register('description')} rows={4} placeholder="Describe the issue in detail..." />
                  {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex gap-2">
                    <Input id="location" {...register('location')} placeholder="Enter location or use GPS" className="flex-1" />
                    <Button type="button" variant="outline" onClick={useGPS}>
                      <MapPin className="w-4 h-4 mr-1" />
                      GPS
                    </Button>
                    <Button type="button" variant="outline" onClick={manualAutoFill}>
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Auto-fill
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Safe to Continue Driving?</Label>
                  <RadioGroup defaultValue="Yes" onValueChange={(value) => setValue('safeToContinue', value)}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id="yes" />
                        <Label htmlFor="yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="no" />
                        <Label htmlFor="no" className="font-normal">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Unsure" id="unsure" />
                        <Label htmlFor="unsure" className="font-normal">Unsure</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Media Upload */}
              <div className="space-y-2">
                <Label>Photos/Videos</Label>
                <UploadZone onFilesChange={setFiles} />
              </div>

              {/* Preferred Service Window */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Preferred Service Window (Optional)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredFrom">From</Label>
                    <Input id="preferredFrom" type="datetime-local" {...register('preferredFrom')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredTo">To</Label>
                    <Input id="preferredTo" type="datetime-local" {...register('preferredTo')} />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-6">
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Report
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

