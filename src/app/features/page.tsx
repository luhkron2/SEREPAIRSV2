import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { Navigation } from '@/components/navigation';
import { Truck, ArrowRight, Shield, Clock, CheckCircle, Users, Wrench, Brain, Zap, Target, BarChart3, Smartphone, Wifi, Database } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Features & Capabilities
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive truck and trailer repair management with intelligent diagnostics
            </p>
          </div>

          {/* Core Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Issue Reporting</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Quick and easy issue reporting with auto-fill capabilities and offline support for drivers in remote locations.
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
                  Enterprise-grade security with offline capabilities and automatic data synchronization when connectivity is restored.
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
                  Comprehensive tracking and quality control with detailed reporting and analytics for fleet management.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Diagnostic Features */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                AI-Powered Diagnostics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Intelligent system that analyzes reported issues and suggests possible causes and solutions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Smart Issue Analysis</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    When you report an issue, our AI analyzes the symptoms and suggests:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• <strong>Possible causes</strong> based on similar reported issues</li>
                    <li>• <strong>Immediate safety checks</strong> you can perform</li>
                    <li>• <strong>Recommended priority level</strong> for workshop scheduling</li>
                    <li>• <strong>Estimated repair time</strong> and complexity</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Intelligent Solutions</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Get instant diagnostic insights and repair guidance:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• <strong>Step-by-step troubleshooting</strong> for common issues</li>
                    <li>• <strong>Parts and tools needed</strong> for repairs</li>
                    <li>• <strong>Safety warnings</strong> and precautions</li>
                    <li>• <strong>Workshop preparation</strong> to speed up repairs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0 shadow-lg max-w-4xl mx-auto">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Example: "Engine won't start" Report
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">🔍 AI Analysis:</h5>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Battery voltage low (85% probability)</li>
                        <li>• Fuel system issue (60% probability)</li>
                        <li>• Starter motor problem (40% probability)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">🛠️ Suggested Actions:</h5>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Check battery terminals for corrosion</li>
                        <li>• Verify fuel level and pump operation</li>
                        <li>• Listen for starter motor engagement</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Advanced Capabilities
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Professional tools for comprehensive fleet management and workshop operations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Analytics Dashboard</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Real-time insights into fleet performance, maintenance patterns, and cost analysis.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mobile Optimized</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Fully responsive design that works perfectly on mobile devices for field reporting.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center">
                      <Wifi className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Offline Support</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Continue working even without internet connection, with automatic sync when online.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center">
                      <Database className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Management</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Comprehensive data storage with export capabilities for reporting and compliance.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fast Processing</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Optimized performance with instant notifications and real-time updates.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Precision Tracking</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Accurate tracking of issues, repairs, and maintenance schedules with detailed history.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-blue-100 mb-6">
                  Experience the power of intelligent fleet management with SE Repairs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/report">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                      <Truck className="mr-2 h-5 w-5" />
                      Report an Issue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                      <Users className="mr-2 h-5 w-5" />
                      Staff Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer with Credit */}
          <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700 mt-16">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Created by <span className="font-medium text-gray-700 dark:text-gray-300">Karan</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
