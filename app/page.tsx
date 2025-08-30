import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  BarChart3, 
  Shield, 
  Clock, 
  Users, 
  FileText,
  ArrowRight,
  Star,
  Building2,
  Banknote,
  Calendar
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">MyHomeTracker Pro</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-800 hover:text-blue-600 font-medium">
                Fonctionnalités
              </Link>
              <Link href="#benefits" className="text-gray-800 hover:text-blue-600 font-medium">
                Avantages
              </Link>
              <Link href="#testimonials" className="text-gray-800 hover:text-blue-600 font-medium">
                Témoignages
              </Link>
              <Link href="#faq" className="text-gray-800 hover:text-blue-600 font-medium">
                FAQ
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Se connecter</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Commencer gratuitement</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Gérez vos projets de construction
            <span className="text-blue-600"> en toute sérénité</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            La plateforme tout-en-un pour comparer vos devis, suivre vos chantiers 
            et maîtriser votre budget. Fini les mauvaises surprises !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8">
                Démarrer gratuitement <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Voir une démo
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-700">
            ✨ Gratuit pendant 30 jours • Sans carte bancaire • 5 minutes pour commencer
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-700">Projets gérés</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">€2.5M</div>
              <div className="text-gray-700">Économies réalisées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-700">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">-30%</div>
              <div className="text-gray-700">Temps gagné</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Des outils puissants et intuitifs pour gérer votre projet de A à Z
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comparateur de devis intelligent</h3>
              <p className="text-gray-700 mb-4">
                Importez vos devis PDF et comparez-les automatiquement. 
                Notre IA détecte les différences et vous alerte sur les postes manquants.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Import par photo ou PDF</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Extraction automatique des données</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Tableau comparatif détaillé</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Banknote className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Suivi budgétaire en temps réel</h3>
              <p className="text-gray-700 mb-4">
                Gardez le contrôle de vos dépenses avec des alertes automatiques 
                en cas de dépassement. Anticipez les coûts cachés.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Dashboard financier clair</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Prévisions et alertes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Historique des paiements</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Planning et coordination</h3>
              <p className="text-gray-700 mb-4">
                Organisez les interventions, suivez l'avancement et communiquez 
                efficacement avec tous les intervenants.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Gantt interactif</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Notifications automatiques</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Suivi photo du chantier</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir MyHomeTracker Pro ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex items-start space-x-4">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">100% Sécurisé</h3>
                <p className="text-gray-700 text-sm">
                  Vos données sont chiffrées et hébergées en Europe. 
                  Conformité RGPD garantie.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Gain de temps</h3>
                <p className="text-gray-700 text-sm">
                  Économisez jusqu'à 10h par semaine sur la gestion administrative.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <BarChart3 className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Économies garanties</h3>
                <p className="text-gray-700 text-sm">
                  En moyenne, nos utilisateurs économisent 15% sur leur budget travaux.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Users className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Support réactif</h3>
                <p className="text-gray-700 text-sm">
                  Une équipe d'experts disponible 7j/7 pour vous accompagner.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Building2 className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Multi-projets</h3>
                <p className="text-gray-700 text-sm">
                  Gérez plusieurs chantiers simultanément depuis une interface unique.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Star className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Simple et intuitif</h3>
                <p className="text-gray-700 text-sm">
                  Aucune formation nécessaire. Prise en main en moins de 5 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "MyHomeTracker m'a permis d'économiser 8000€ sur ma rénovation. 
                J'ai pu comparer facilement les devis et négocier avec les artisans."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="font-semibold">Sophie L.</div>
                  <div className="text-sm text-gray-700">Propriétaire</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "En tant qu'architecte, je recommande MyHomeTracker à tous mes clients. 
                C'est un gain de temps énorme pour le suivi de chantier."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="font-semibold">Marc D.</div>
                  <div className="text-sm text-gray-700">Architecte</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "La fonctionnalité de comparaison de devis est exceptionnelle. 
                J'ai immédiatement vu qu'il manquait des postes importants."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="font-semibold">Thomas R.</div>
                  <div className="text-sm text-gray-700">Investisseur</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            <details className="bg-white rounded-lg p-6 cursor-pointer">
              <summary className="font-semibold">Est-ce vraiment gratuit ?</summary>
              <p className="mt-4 text-gray-700">
                Oui ! Vous bénéficiez de 30 jours d'essai gratuit avec toutes les fonctionnalités. 
                Aucune carte bancaire n'est requise pour commencer.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 cursor-pointer">
              <summary className="font-semibold">Comment fonctionne l'import de devis ?</summary>
              <p className="mt-4 text-gray-700">
                Prenez simplement une photo ou uploadez un PDF de vos devis. 
                Notre IA extrait automatiquement toutes les informations importantes 
                et les organise dans un tableau comparatif.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 cursor-pointer">
              <summary className="font-semibold">Mes données sont-elles sécurisées ?</summary>
              <p className="mt-4 text-gray-700">
                Absolument. Nous utilisons un chiffrement de niveau bancaire et 
                vos données sont hébergées en Europe. Nous sommes conformes au RGPD 
                et ne partageons jamais vos informations.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 cursor-pointer">
              <summary className="font-semibold">Puis-je gérer plusieurs projets ?</summary>
              <p className="mt-4 text-gray-700">
                Oui, vous pouvez gérer autant de projets que vous le souhaitez. 
                Chaque projet dispose de son propre espace avec ses devis, 
                planning et documents.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 cursor-pointer">
              <summary className="font-semibold">Y a-t-il une application mobile ?</summary>
              <p className="mt-4 text-gray-700">
                MyHomeTracker Pro fonctionne parfaitement sur mobile via votre navigateur. 
                Une application native est prévue pour 2025.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à simplifier votre projet ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de propriétaires qui gèrent leurs travaux sereinement
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Commencer gratuitement <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <p className="mt-4 text-blue-100 text-sm">
            30 jours gratuits • Sans engagement • Support 7j/7
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6 text-blue-500" />
                <span className="font-bold text-white">MyHomeTracker Pro</span>
              </div>
              <p className="text-sm">
                La plateforme de référence pour gérer vos projets de construction.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white">Fonctionnalités</Link></li>
                <li><Link href="#" className="hover:text-white">Tarifs</Link></li>
                <li><Link href="#" className="hover:text-white">Sécurité</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Centre d'aide</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white">Conditions d'utilisation</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Politique de confidentialité</Link></li>
                <li><Link href="/privacy" className="hover:text-white">RGPD</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2025 MyHomeTracker Pro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}