import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText } from 'lucide-react';

export default async function ThanksPage({ params }: { params: Promise<{ ticket: string }> }) {
  const { ticket } = await params;
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full rounded-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Report Submitted Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="bg-muted rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Your Ticket Number</p>
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-3xl font-bold text-primary">#{ticket}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Your report has been received and will be reviewed by our workshop team shortly.
            You'll be notified of any updates.
          </p>

          <div className="space-y-2">
            <Link href="/report" className="block">
              <Button className="w-full">Submit Another Report</Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="outline" className="w-full">Return Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

