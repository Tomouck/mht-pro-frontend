'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Shield, 
  CreditCard,
  Bell,
  Globe,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Trash2,
  Camera
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

const profileSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().optional(),
  locale: z.enum(['fr', 'nl', 'en', 'de']),
  timezone: z.string()
});

const passwordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type ProfileData = z.infer<typeof profileSchema>;
type PasswordData = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const profileForm = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      locale: (user?.locale as 'fr' | 'nl' | 'en' | 'de') || 'fr',
      timezone: user?.timezone || 'Europe/Brussels'
    }
  });

  const passwordForm = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema)
  });

  const newPassword = passwordForm.watch('newPassword');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (newPassword) {
      let strength = 0;
      if (newPassword.length >= 8) strength += 25;
      if (newPassword.length >= 12) strength += 25;
      if (/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword)) strength += 25;
      if (/[0-9]/.test(newPassword)) strength += 12.5;
      if (/[^A-Za-z0-9]/.test(newPassword)) strength += 12.5;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [newPassword]);

  const onProfileSubmit = async (data: ProfileData) => {
    setIsLoading(true);
    setProfileError('');
    setProfileSuccess(false);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile`,
        data
      );
      
      if (response.data.success) {
        setProfileSuccess(true);
        // Update local user data
        useAuthStore.setState({ user: response.data.user });
        setTimeout(() => setProfileSuccess(false), 3000);
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      setProfileError(error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordData) => {
    setIsLoading(true);
    setPasswordError('');
    setPasswordSuccess(false);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/change-password`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        }
      );
      
      if (response.data.success) {
        setPasswordSuccess(true);
        passwordForm.reset();
        setTimeout(() => setPasswordSuccess(false), 3000);
      }
    } catch (error: any) {
      console.error('Password change error:', error);
      setPasswordError(error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    // Implementation for account deletion
    console.log('Delete account');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
            </div>
            <Button variant="outline" onClick={logout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Facturation</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Mettez à jour vos informations personnelles et vos préférences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  {profileSuccess && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Profil mis à jour avec succès
                      </AlertDescription>
                    </Alert>
                  )}

                  {profileError && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{profileError}</AlertDescription>
                    </Alert>
                  )}

                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Photo de profil</p>
                      <p className="text-xs text-gray-500">JPG, GIF ou PNG. 5MB max.</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        {...profileForm.register('firstName')}
                        id="firstName"
                        disabled={isLoading}
                      />
                      {profileForm.formState.errors.firstName && (
                        <p className="text-sm text-red-500">
                          {profileForm.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        {...profileForm.register('lastName')}
                        id="lastName"
                        disabled={isLoading}
                      />
                      {profileForm.formState.errors.lastName && (
                        <p className="text-sm text-red-500">
                          {profileForm.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="email"
                        value={user.email}
                        disabled
                        className="flex-1"
                      />
                      {user.emailVerified ? (
                        <Badge className="bg-green-100 text-green-700">Vérifié</Badge>
                      ) : (
                        <Badge variant="secondary">Non vérifié</Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      {...profileForm.register('phone')}
                      id="phone"
                      type="tel"
                      placeholder="+32 123 45 67 89"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="locale">Langue</Label>
                      <Select 
                        value={profileForm.watch('locale')}
                        onValueChange={(value) => profileForm.setValue('locale', value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="nl">Nederlands</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Fuseau horaire</Label>
                      <Select 
                        value={profileForm.watch('timezone')}
                        onValueChange={(value) => profileForm.setValue('timezone', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/Brussels">Europe/Brussels</SelectItem>
                          <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                          <SelectItem value="Europe/Amsterdam">Europe/Amsterdam</SelectItem>
                          <SelectItem value="Europe/Luxembourg">Europe/Luxembourg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Modifier le mot de passe</CardTitle>
                <CardDescription>
                  Assurez-vous d'utiliser un mot de passe fort et unique.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  {passwordSuccess && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Mot de passe modifié avec succès
                      </AlertDescription>
                    </Alert>
                  )}

                  {passwordError && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{passwordError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <div className="relative">
                      <Input
                        {...passwordForm.register('currentPassword')}
                        type={showCurrentPassword ? 'text' : 'password'}
                        id="currentPassword"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <div className="relative">
                      <Input
                        {...passwordForm.register('newPassword')}
                        type={showNewPassword ? 'text' : 'password'}
                        id="newPassword"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {passwordForm.formState.errors.newPassword && (
                      <p className="text-sm text-red-500">
                        {passwordForm.formState.errors.newPassword.message}
                      </p>
                    )}
                    
                    {newPassword && (
                      <div className="space-y-1">
                        <Progress value={passwordStrength} className="h-2" />
                        <p className="text-xs text-gray-600">
                          Force: {passwordStrength >= 80 ? 'Excellent' : passwordStrength >= 60 ? 'Bon' : passwordStrength >= 30 ? 'Moyen' : 'Faible'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                    <div className="relative">
                      <Input
                        {...passwordForm.register('confirmPassword')}
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Modification...' : 'Modifier le mot de passe'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentification à deux facteurs</CardTitle>
                <CardDescription>
                  Ajoutez une couche de sécurité supplémentaire à votre compte.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">2FA {user.twoFactorEnabled ? 'activé' : 'désactivé'}</p>
                    <p className="text-sm text-gray-500">
                      {user.twoFactorEnabled 
                        ? 'Votre compte est protégé par l\'authentification à deux facteurs.'
                        : 'Protégez votre compte avec l\'authentification à deux facteurs.'}
                    </p>
                  </div>
                  <Switch checked={user.twoFactorEnabled} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Zone dangereuse</CardTitle>
                <CardDescription>
                  Actions irréversibles concernant votre compte.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Supprimer le compte</p>
                      <p className="text-sm text-gray-500">
                        Supprimez définitivement votre compte et toutes vos données.
                      </p>
                    </div>
                    <Button 
                      variant="destructive"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notification</CardTitle>
                <CardDescription>
                  Gérez la façon dont vous recevez les notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Notifications par email</p>
                      <p className="text-sm text-gray-500">Recevez des mises à jour par email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Rappels de tâches</p>
                      <p className="text-sm text-gray-500">Rappels pour les tâches à venir</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Mises à jour de projet</p>
                      <p className="text-sm text-gray-500">Notifications sur l'avancement des projets</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-gray-500">Conseils et actualités MyHomeTracker</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plan actuel</CardTitle>
                <CardDescription>
                  Gérez votre abonnement et vos informations de facturation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-lg">
                        {user.tenant?.plan === 'trial' ? 'Essai gratuit' : 
                         user.tenant?.plan === 'essential' ? 'Essential' :
                         user.tenant?.plan === 'professional' ? 'Professional' : 'Enterprise'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.tenant?.plan === 'trial' && 'Expire dans 14 jours'}
                      </p>
                    </div>
                    <Badge variant={user.tenant?.status === 'active' ? 'default' : 'secondary'}>
                      {user.tenant?.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>

                  {user.tenant?.plan === 'trial' && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Votre période d'essai expire bientôt. Passez à un plan payant pour continuer à utiliser tous les modules.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Modules actifs</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Gestion de projets</Badge>
                      <Badge variant="secondary">Devis Manager</Badge>
                      <Badge variant="secondary">Planning simple</Badge>
                      <Badge variant="secondary">Documents</Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <Button variant="outline">
                      Historique de facturation
                    </Button>
                    <Button>
                      {user.tenant?.plan === 'trial' ? 'Choisir un plan' : 'Changer de plan'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}