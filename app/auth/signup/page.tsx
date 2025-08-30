'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Building2, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const signupSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions d\'utilisation'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const password = watch('password', '');

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password
        }
      );

      if (response.data.success) {
        toast({
          title: "Compte créé avec succès !",
          description: "Un email de confirmation vous a été envoyé.",
        });
        router.push('/auth/verify-email?email=' + encodeURIComponent(data.email));
      }
    } catch (error: any) {
      toast({
        title: "Erreur lors de l'inscription",
        description: error.response?.data?.message || "Une erreur est survenue",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { met: password.length >= 8, text: "Au moins 8 caractères" },
    { met: /[A-Z]/.test(password), text: "Une majuscule" },
    { met: /[0-9]/.test(password), text: "Un chiffre" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl">MyHomeTracker Pro</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Créez votre compte
            </h1>
            <p className="text-gray-600">
              Commencez à gérer vos projets de construction en toute simplicité
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="firstName"
                    type="text"
                    className="pl-10"
                    placeholder="Jean"
                    {...register('firstName')}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">Nom</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="lastName"
                    type="text"
                    className="pl-10"
                    placeholder="Dupont"
                    {...register('lastName')}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email professionnel</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  placeholder="jean.dupont@exemple.com"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className={`h-3 w-3 ${req.met ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
              
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="terms" {...register('acceptTerms')} />
              <div className="text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  J'accepte les{' '}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    conditions d'utilisation
                  </Link>{' '}
                  et la{' '}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    politique de confidentialité
                  </Link>
                </label>
                {errors.acceptTerms && (
                  <p className="text-red-600 mt-1">{errors.acceptTerms.message}</p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                "Création du compte..."
              ) : (
                <>
                  Créer mon compte <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Ou</span>
            </div>
          </div>

          {/* OAuth buttons (for future) */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full" disabled>
              <img src="/google.svg" alt="Google" className="h-5 w-5 mr-2" />
              Continuer avec Google (bientôt)
            </Button>
          </div>

          {/* Sign in link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex lg:flex-1 bg-blue-600 text-white p-12 items-center justify-center">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-8">
            Commencez gratuitement pendant 30 jours
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-blue-200" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Comparateur de devis intelligent</h3>
                <p className="text-blue-100">
                  Importez et comparez automatiquement tous vos devis
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-blue-200" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Suivi de budget en temps réel</h3>
                <p className="text-blue-100">
                  Gardez le contrôle sur vos dépenses avec des alertes automatiques
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-blue-200" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Planning et coordination</h3>
                <p className="text-blue-100">
                  Organisez les interventions et suivez l'avancement du chantier
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-blue-200" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Support 7j/7</h3>
                <p className="text-blue-100">
                  Une équipe d'experts disponible pour vous accompagner
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-blue-700 rounded-lg">
            <p className="text-blue-100 mb-2">Plus de 10,000 propriétaires nous font confiance</p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-5 w-5 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-blue-100">4.9/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}