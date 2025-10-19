'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/ui/logo';
import { FileText, Wrench, Settings, Shield } from 'lucide-react';
import { toast } from 'sonner';

const ACCESS_LEVELS = {
  driver: {
    name: 'Driver',
    description: 'Report issues and view your submissions',
    icon: FileText,
    password: 'driver123',
    redirect: '/report'
  },
  operations: {
    name: 'Operations',
    description: 'Manage operations and view all reports',
    icon: Settings,
    password: 'ops123',
    redirect: '/operations'
  },
  workshop: {
    name: 'Workshop',
    description: 'Manage repairs and workshop operations',
    icon: Wrench,
    password: 'workshop123',
    redirect: '/workshop'
  }
};

export default function AccessPage() {
  const [selectedAccess, setSelectedAccess] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAccessSelect = (accessType: string) => {
    setSelectedAccess(accessType);
    setPassword('');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccess) return;

    setLoading(true);

    // Simulate password check
    setTimeout(() => {
      const accessConfig = ACCESS_LEVELS[selectedAccess as keyof typeof ACCESS_LEVELS];
      
      if (password === accessConfig.password) {
        // Store access level in session storage
        sessionStorage.setItem('accessLevel', selectedAccess);
        sessionStorage.setItem('isAuthenticated', 'true');
        
        toast.success(`Welcome to ${accessConfig.name}!`);
        router.push(accessConfig.redirect);
      } else {
        toast.error('Invalid password. Please try again.');
        setPassword('');
      }
      setLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    setSelectedAccess(null);
    setPassword('');
  };

  if (selectedAccess) {
    const accessConfig = ACCESS_LEVELS[selectedAccess as keyof typeof ACCESS_LEVELS];
    const IconComponent = accessConfig.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl">{accessConfig.name} Access</CardTitle>
            <p className="text-muted-foreground">{accessConfig.description}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Enter Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                  Back
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Verifying...' : 'Access'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <Logo size="xl" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-6 mb-4">
            SE Repairs System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose your access level to continue
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(ACCESS_LEVELS).map(([key, config]) => {
            const IconComponent = config.icon;
            return (
              <Card 
                key={key} 
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 rounded-2xl"
                onClick={() => handleAccessSelect(key)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">{config.name}</CardTitle>
                  <p className="text-muted-foreground">{config.description}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Access {config.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Select your role to access the appropriate system features
          </p>
        </div>
      </div>
    </div>
  );
}
