import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-600 mb-6">Dernière mise à jour : 30 août 2025</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            MyHomeTracker Pro ("nous", "notre", "nos") s'engage à protéger votre vie privée. 
            Cette politique de confidentialité explique comment nous collectons, utilisons, 
            partageons et protégeons vos informations personnelles.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Données collectées</h2>
          <h3 className="text-xl font-semibold mt-4 mb-2">2.1 Données fournies directement</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Nom, prénom, adresse email</li>
            <li>Numéro de téléphone (optionnel)</li>
            <li>Adresse du projet de construction</li>
            <li>Documents de projet (devis, plans, photos)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2">2.2 Données collectées automatiquement</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Adresse IP</li>
            <li>Type de navigateur et appareil</li>
            <li>Pages visitées et durée de visite</li>
            <li>Données de localisation (avec votre consentement)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Utilisation des données</h2>
          <p>Nous utilisons vos données pour :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fournir et améliorer nos services</li>
            <li>Personnaliser votre expérience</li>
            <li>Communiquer avec vous (support, mises à jour)</li>
            <li>Analyser l'utilisation du service</li>
            <li>Respecter nos obligations légales</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Base légale du traitement</h2>
          <p>Nous traitons vos données sur les bases suivantes :</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Contrat :</strong> Pour fournir nos services</li>
            <li><strong>Consentement :</strong> Pour les communications marketing</li>
            <li><strong>Intérêt légitime :</strong> Pour améliorer nos services</li>
            <li><strong>Obligation légale :</strong> Pour respecter la loi</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Partage des données</h2>
          <p>
            Nous ne vendons jamais vos données personnelles. Nous pouvons les partager avec :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Nos prestataires techniques (hébergement, emails)</li>
            <li>Les autorités légales si requis par la loi</li>
            <li>Des tiers avec votre consentement explicite</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Sécurité des données</h2>
          <p>
            Nous prenons des mesures techniques et organisationnelles appropriées pour protéger 
            vos données :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Chiffrement des données en transit (HTTPS)</li>
            <li>Chiffrement des données au repos</li>
            <li>Accès restreint aux données</li>
            <li>Audits de sécurité réguliers</li>
            <li>Formation du personnel</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Conservation des données</h2>
          <p>
            Nous conservons vos données personnelles aussi longtemps que nécessaire pour :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fournir nos services</li>
            <li>Respecter nos obligations légales (10 ans pour les factures)</li>
            <li>Résoudre les litiges éventuels</li>
          </ul>
          <p>
            Vous pouvez demander la suppression de vos données à tout moment, sauf obligation légale contraire.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Vos droits (RGPD)</h2>
          <p>Conformément au RGPD, vous avez le droit de :</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Accès :</strong> Obtenir une copie de vos données</li>
            <li><strong>Rectification :</strong> Corriger vos données</li>
            <li><strong>Effacement :</strong> Supprimer vos données</li>
            <li><strong>Limitation :</strong> Limiter le traitement</li>
            <li><strong>Portabilité :</strong> Récupérer vos données</li>
            <li><strong>Opposition :</strong> Vous opposer au traitement</li>
            <li><strong>Retrait du consentement :</strong> À tout moment</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Cookies</h2>
          <p>
            Nous utilisons des cookies essentiels pour le fonctionnement du site et, avec votre 
            consentement, des cookies analytiques pour améliorer nos services. Vous pouvez 
            gérer vos préférences cookies à tout moment.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Transferts internationaux</h2>
          <p>
            Vos données sont stockées dans l'Union européenne. Si nous devons les transférer 
            hors UE, nous utilisons des clauses contractuelles types ou d'autres mécanismes 
            approuvés par la Commission européenne.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Mineurs</h2>
          <p>
            Notre service n'est pas destiné aux personnes de moins de 16 ans. Nous ne collectons 
            pas sciemment de données de mineurs sans consentement parental.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Modifications</h2>
          <p>
            Nous pouvons mettre à jour cette politique. Les modifications importantes seront 
            notifiées par email ou via le service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact et DPO</h2>
          <p>
            Pour exercer vos droits ou toute question sur vos données :
            <br /><br />
            <strong>Délégué à la Protection des Données (DPO)</strong>
            <br />
            Email : dpo@myhometracker.pro
            <br />
            Adresse : MyHomeTracker Pro, 123 Avenue Louise, 1050 Bruxelles, Belgique
            <br /><br />
            Vous pouvez également déposer une plainte auprès de l'Autorité de Protection des 
            Données : <a href="https://www.autoriteprotectiondonnees.be" className="text-blue-600 hover:underline">
              www.autoriteprotectiondonnees.be
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}