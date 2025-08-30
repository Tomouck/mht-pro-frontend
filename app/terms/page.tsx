import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl">MyHomeTracker Pro</span>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-600 mb-6">Dernière mise à jour : 30 août 2025</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptation des conditions</h2>
          <p>
            En utilisant MyHomeTracker Pro, vous acceptez d'être lié par ces conditions d'utilisation. 
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description du service</h2>
          <p>
            MyHomeTracker Pro est une plateforme de gestion de projets de construction et de rénovation 
            immobilière. Le service permet notamment :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>La comparaison de devis</li>
            <li>Le suivi de budget</li>
            <li>La planification de travaux</li>
            <li>La gestion documentaire</li>
            <li>Le suivi de chantier</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Inscription et compte utilisateur</h2>
          <p>
            Pour utiliser nos services, vous devez créer un compte en fournissant des informations 
            exactes et complètes. Vous êtes responsable de la confidentialité de vos identifiants 
            et de toutes les activités effectuées sous votre compte.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Utilisation acceptable</h2>
          <p>Vous vous engagez à utiliser le service de manière légale et éthique. Il est interdit de :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Violer les lois en vigueur</li>
            <li>Usurper l'identité d'autrui</li>
            <li>Télécharger du contenu malveillant</li>
            <li>Tenter d'accéder aux données d'autres utilisateurs</li>
            <li>Utiliser le service à des fins frauduleuses</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Propriété intellectuelle</h2>
          <p>
            Tous les contenus du service (logos, textes, designs, code) sont protégés par le droit 
            d'auteur et appartiennent à MyHomeTracker Pro ou à ses partenaires. Vous conservez tous 
            les droits sur les données que vous téléchargez.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Protection des données</h2>
          <p>
            Nous nous engageons à protéger vos données personnelles conformément au RGPD. 
            Pour plus d'informations, consultez notre{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              politique de confidentialité
            </Link>.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Tarification et paiement</h2>
          <p>
            L'utilisation du service est gratuite pendant 30 jours. Au-delà, un abonnement est 
            requis selon les tarifs en vigueur. Les prix sont indiqués en euros et hors taxes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation de responsabilité</h2>
          <p>
            MyHomeTracker Pro ne peut être tenu responsable des dommages directs ou indirects 
            résultant de l'utilisation ou de l'impossibilité d'utiliser le service. Notre 
            responsabilité est limitée au montant de votre abonnement annuel.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Résiliation</h2>
          <p>
            Vous pouvez résilier votre compte à tout moment depuis votre espace personnel. 
            Nous nous réservons le droit de suspendre ou résilier votre compte en cas de 
            violation de ces conditions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Modifications des conditions</h2>
          <p>
            Nous pouvons modifier ces conditions à tout moment. Les modifications entrent en 
            vigueur dès leur publication. Votre utilisation continue du service constitue une 
            acceptation des nouvelles conditions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Droit applicable</h2>
          <p>
            Ces conditions sont régies par le droit belge. Tout litige sera soumis aux tribunaux 
            compétents de Bruxelles.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact</h2>
          <p>
            Pour toute question concernant ces conditions, contactez-nous à : 
            <br />
            Email : legal@myhometracker.pro
            <br />
            Adresse : MyHomeTracker Pro, 123 Avenue Louise, 1050 Bruxelles, Belgique
          </p>
        </div>
      </main>
    </div>
  );
}