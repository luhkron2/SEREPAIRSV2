import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { Navigation } from '@/components/navigation';
import { Truck, ArrowRight, Shield, Clock, CheckCircle, Users } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to access page
  redirect('/access');
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
                 {/* Hero Section */}
                 <div className="text-center space-y-8 mb-20">
                   <div className="flex justify-center mb-8">
                     <Logo size="xl" />
                   </div>
                   <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
                     SE Repairs
                   </h1>
                   <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                     Professional truck and trailer repair management system
                   </p>

                   <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                     <Link href="/report">
                       <Button size="lg" className="text-lg px-10 py-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold">
                         <Truck className="mr-2 h-5 w-5" />
                         Report an Issue
                         <ArrowRight className="ml-2 h-4 w-4" />
                       </Button>
                     </Link>
                     <Link href="/login">
                       <Button variant="outline" size="lg" className="text-lg px-10 py-6 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-semibold">
                         <Users className="mr-2 h-5 w-5" />
                         Staff Login
                       </Button>
                     </Link>
                   </div>
                 </div>

                 {/* Professional Features */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                   <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                     <CardContent className="p-8 text-center">
                       <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                         <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                       </div>
                       <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Fast Response</h3>
                       <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                         Issues are reported and tracked in real-time with instant notifications to workshop staff.
                       </p>
                     </CardContent>
                   </Card>

                   <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                     <CardContent className="p-8 text-center">
                       <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                         <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                       </div>
                       <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Secure & Reliable</h3>
                       <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                         Enterprise-grade security with offline capabilities and automatic data synchronization.
                       </p>
                     </CardContent>
                   </Card>

                   <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                     <CardContent className="p-8 text-center">
                       <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                         <CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                       </div>
                       <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Quality Assurance</h3>
                       <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                         Comprehensive tracking and quality control with detailed reporting and analytics.
                       </p>
                     </CardContent>
                   </Card>
                 </div>


                 {/* Footer with Credit */}
                 <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
                   <p className="text-sm text-gray-500 dark:text-gray-400">
                     Created by <span className="font-medium text-gray-700 dark:text-gray-300">Karan</span>
                   </p>
                 </div>

        </div>
      </div>
    </div>
  );
}
