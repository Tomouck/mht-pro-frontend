'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Home, 
  FileText, 
  Calendar, 
  Euro, 
  Users, 
  Bell, 
  Settings,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null;
  }

  // Mock data for demonstration
  const stats = {
    activeProjects: 3,
    totalQuotes: 12,
    pendingPayments: 4500,
    upcomingTasks: 8
  };

  const recentProjects = [
    {
      id: 1,
      name: 'Rénovation Cuisine',
      status: 'in_progress',
      progress: 65,
      budget: 25000,
      spent: 16250
    },
    {
      id: 2,
      name: 'Extension Maison',
      status: 'planning',
      progress: 20,
      budget: 45000,
      spent: 0
    },
    {
      id: 3,
      name: 'Salle de Bain',
      status: 'in_progress',
      progress: 80,
      budget: 15000,
      spent: 12000
    }
  ];

  const upcomingTasks = [
    { id: 1, title: 'Rendez-vous architecte', date: '2025-02-01', type: 'meeting' },
    { id: 2, title: 'Validation devis électricité', date: '2025-02-02', type: 'validation' },
    { id: 3, title: 'Réception matériaux', date: '2025-02-03', type: 'delivery' },
    { id: 4, title: 'Inspection chantier', date: '2025-02-05', type: 'inspection' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-700">En cours</Badge>;
      case 'planning':
        return <Badge className="bg-orange-100 text-orange-700">Planification</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Terminé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Users className="h-4 w-4" />;
      case 'validation':
        return <CheckCircle className="h-4 w-4" />;
      case 'delivery':
        return <Home className="h-4 w-4" />;
      case 'inspection':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">MyHomeTracker Pro</h1>
              {user.tenant?.plan === 'trial' && (
                <Badge variant="secondary">Essai gratuit</Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour {user.firstName} ! 👋
          </h2>
          <p className="text-gray-600">
            Voici un aperçu de vos projets de construction et rénovation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projets actifs</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProjects}</div>
              <p className="text-xs text-muted-foreground">+1 ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Devis reçus</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuotes}</div>
              <p className="text-xs text-muted-foreground">3 en attente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paiements en attente</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingPayments}€</div>
              <p className="text-xs text-muted-foreground">2 factures</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tâches à venir</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingTasks}</div>
              <p className="text-xs text-muted-foreground">Cette semaine</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Mes Projets</CardTitle>
                    <CardDescription>Vos projets de construction et rénovation</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau projet
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{project.name}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            {getStatusBadge(project.status)}
                            <span className="text-sm text-gray-600">
                              Budget: {project.budget.toLocaleString()}€
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progression</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Dépensé</span>
                          <span className={project.spent > project.budget * 0.8 ? 'text-orange-600 font-medium' : ''}>
                            {project.spent.toLocaleString()}€ / {project.budget.toLocaleString()}€
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="w-full">
                    Voir tous les projets
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks Section */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Prochaines tâches</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="mt-0.5 text-gray-500">
                        {getTaskIcon(task.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(task.date).toLocaleDateString('fr-FR', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" size="sm">
                    Voir le calendrier complet
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Nouveau devis
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Inviter un pro
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Planifier
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Rapports
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trial Banner */}
            {user.tenant?.plan === 'trial' && (
              <Card className="mt-6 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">Période d'essai</CardTitle>
                  <CardDescription className="text-blue-700">
                    Il vous reste 14 jours d'essai gratuit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Passer à la version Pro
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}