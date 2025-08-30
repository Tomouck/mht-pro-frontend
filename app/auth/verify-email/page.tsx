'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import axios from 'axios';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setVerificationStatus('error');
      setError('Token de vérification manquant');
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-email`, {
        token
      });
      
      if (response.data.success) {
        setVerificationStatus('success');
        setTimeout(() => {
          router.push('/auth/login');
        }, 5000);
      }
    } catch (error: any) {
      console.error('Email verification error:', error);
      setVerificationStatus('error');
      setError(error.response?.data?.message || 'Une erreur est survenue lors de la vérification');
    }
  };

  const resendVerificationEmail = async () => {
    setVerificationStatus('loading');
    setError('');
    
    try {
      // This would need the user's email, which could be stored in localStorage
      // or passed as a query parameter
      const email = localStorage.getItem('pendingVerificationEmail');
      
      if (email) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/resend-verification`, {
          email
        });
        
        if (response.data.success) {
          setVerificationStatus('error');
          setError('Un nouveau lien de vérification a été envoyé à votre adresse email.');
        }
      } else {
        setError('Email non trouvé. Veuillez vous reconnecter.');
      }
    } catch (error: any) {
      setVerificationStatus('error');
      setError(error.response?.data?.message || 'Impossible de renvoyer l\'email de vérification');
    }
  };

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
            </div>
            <CardTitle className="text-2xl">Vérification en cours...</CardTitle>
            <CardDescription>
              Nous vérifions votre adresse email, veuillez patienter.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Email vérifié avec succès !</CardTitle>
            <CardDescription>
              Votre adresse email a été vérifiée. Vous allez être redirigé vers la page de connexion...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Vous pouvez maintenant vous connecter à votre compte MyHomeTracker Pro.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Link href="/auth/login" className="w-full">
              <Button className="w-full">
                Aller à la page de connexion
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Échec de la vérification</CardTitle>
          <CardDescription>
            Nous n'avons pas pu vérifier votre adresse email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p className="text-sm text-gray-600">Raisons possibles de l'échec :</p>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Le lien de vérification a expiré (valide 24h)</li>
              <li>Le lien a déjà été utilisé</li>
              <li>Le lien est invalide ou corrompu</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            onClick={resendVerificationEmail} 
            className="w-full"
            variant="default"
          >
            <Mail className="mr-2 h-4 w-4" />
            Renvoyer l'email de vérification
          </Button>
          
          <Link href="/auth/login" className="w-full">
            <Button variant="outline" className="w-full">
              Retour à la connexion
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}