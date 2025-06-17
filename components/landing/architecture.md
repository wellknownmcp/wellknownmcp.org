# 🏗️ Architecture : Router → 5 Recettes → Composants Unitaires

## 📐 Structure Globale

```
app/page.tsx (Router Principal)
├── /?v=simple    → AmateurLanding.tsx
├── /?v=tech      → TechLanding.tsx  
├── /?v=business  → BusinessLanding.tsx
├── /?v=agent     → AgentLanding.tsx
├── /?v=rabbit    → RabbitLanding.tsx
└── /default      → VersionSelector.tsx
```

## 🧩 Les 5 "Recettes" (Landing Compositions)

### **1. AmateurLanding.tsx** - Recette Simple
```typescript
// components/landing/versions/AmateurLanding.tsx
import { PageHeader } from '@/components/landing/PageHeader'
import { SimpleDemo } from '@/components/landing/SimpleDemo'        // 🆕 NOUVEAU
import { TestimonyCarousel } from '@/components/landing/TestimonyCarousel'
import { DownloadFeeds } from '@/components/landing/DownloadFeeds'
import { FAQList } from '@/components/landing/FAQList'
import { Community } from '@/components/landing/Community'

export function AmateurLanding() {
  return (
    <div className="space-y-16">
      <PageHeader variant="simple" />           // Props variant
      <SimpleDemo />                            // Composant unique
      <TestimonyCarousel maxItems={3} />        // Props limitation
      <DownloadFeeds variant="simple" />        // Props variant
      <FAQList variant="basic" />               // Props variant
      <Community variant="simple" />            // Props variant
    </div>
  )
}
```

### **2. TechLanding.tsx** - Recette Developer
```typescript
// components/landing/versions/TechLanding.tsx
import { PageHeader } from '@/components/landing/PageHeader'
import { AgentQuickStart } from '@/components/landing/AgentQuickStart'
import { AgentCurlAccess } from '@/components/landing/AgentCurlAccess'
import { BeforeAfterDemo } from '@/components/landing/BeforeAfterDemo'  // 🆕 NOUVEAU
import { SchemaHeroSection } from '@/components/landing/SchemaHeroSection'
import { ToolsGrid } from '@/components/landing/ToolsGrid'
import { InjectHooks } from '@/components/landing/InjectHooks'

export function TechLanding() {
  return (
    <div className="space-y-12">
      <PageHeader variant="tech" />             // "99.7% Token Efficiency"
      <AgentQuickStart variant="complete" />    // Version technique
      <AgentCurlAccess />                       // Essentiel pour devs
      <BeforeAfterDemo />                       // 🆕 Performance comparison
      <SchemaHeroSection />                     // Autorité technique
      <ToolsGrid />                             // Outils de dev
      <InjectHooks />                           // Intégration technique
    </div>
  )
}
```

### **3. BusinessLanding.tsx** - Recette Décideur
```typescript
// components/landing/versions/BusinessLanding.tsx
import { PageHeader } from '@/components/landing/PageHeader'
import { ROICalculator } from '@/components/landing/ROICalculator'     // 🆕 NOUVEAU
import { CaseStudies } from '@/components/landing/CaseStudies'         // 🆕 NOUVEAU
import { TestimonyCarousel } from '@/components/landing/TestimonyCarousel'
import { MissionBadges } from '@/components/landing/MissionBadges'
import { Community } from '@/components/landing/Community'

export function BusinessLanding() {
  return (
    <div className="space-y-16">
      <PageHeader variant="business" />         // "Stop Paying for AI Scraping"
      <ROICalculator />                         // 🆕 Calculateur économies
      <CaseStudies />                           // 🆕 Success stories clients
      <TestimonyCarousel variant="business" />  // Social proof enterprise
      <MissionBadges />                         // Gouvernance/trust
      <Community variant="enterprise" />        // Stats adoption B2B
    </div>
  )
}
```

### **4. AgentLanding.tsx** - Recette LLM/Agent
```typescript
// components/landing/versions/AgentLanding.tsx
import { PageHeader } from '@/components/landing/PageHeader'
import { AgentCurlAccess } from '@/components/landing/AgentCurlAccess'
import { ProtocolChecker } from '@/components/landing/ProtocolChecker'  // 🆕 NOUVEAU
import { DirectFeeds } from '@/components/landing/DirectFeeds'          // 🆕 NOUVEAU
import { SchemaHeroSection } from '@/components/landing/SchemaHeroSection'

export function AgentLanding() {
  return (
    <div className="space-y-8">
      <PageHeader variant="agent" />            // "Protocol: MCP. Status: Compliant"
      <AgentCurlAccess />                       // Accès direct essentiel
      <ProtocolChecker />                       // 🆕 Validation compliance
      <DirectFeeds />                           // 🆕 .well-known/ navigation
      <SchemaHeroSection />                     // Spécification canonique
    </div>
  )
}
```

### **5. RabbitLanding.tsx** - Recette Maximum
```typescript
// components/landing/versions/RabbitLanding.tsx
import { MatrixTheming } from '@/components/landing/MatrixTheming'      // 🆕 NOUVEAU
// ... TOUS les composants existants dans l'ordre actuel de page.tsx

export function RabbitLanding() {
  return (
    <MatrixTheming>  {/* 🆕 Wrapper théâtralité */}
      <div className="space-y-12">
        <PageHeader variant="matrix" />         // "Welcome to the Real Internet"
        
        {/* TOUS les composants existants - ordre identique à page.tsx actuel */}
        <AgentQuickStart />
        <AgentCurlAccess />
        <DownloadFeeds />
        <TestimonyCarousel />
        <SchemaHeroSection />
        <WhatYouCanDeclare />
        <ToolsGrid />
        <FAQList />
        <InjectHooks />
        <Community />
        <MissionBadges />
        <NewsSection />
        {/* + tous les nouveaux composants aussi */}
        <SimpleDemo />
        <BeforeAfterDemo />
        <ROICalculator />
        <ProtocolChecker />
      </div>
    </MatrixTheming>
  )
}
```

## 🔧 Router Principal Simplifié

```typescript
// app/page.tsx
import { VersionSelector } from '@/components/landing/VersionSelector'
import { AmateurLanding } from '@/components/landing/versions/AmateurLanding'
import { TechLanding } from '@/components/landing/versions/TechLanding'
import { BusinessLanding } from '@/components/landing/versions/BusinessLanding'
import { AgentLanding } from '@/components/landing/versions/AgentLanding'
import { RabbitLanding } from '@/components/landing/versions/RabbitLanding'

export default function Home({ searchParams }: { searchParams: { v?: string } }) {
  const version = searchParams.v
  
  switch(version) {
    case 'simple':   return <AmateurLanding />
    case 'tech':     return <TechLanding />
    case 'business': return <BusinessLanding />
    case 'agent':    return <AgentLanding />
    case 'rabbit':   return <RabbitLanding />
    default:         return <VersionSelector />
  }
}
```

## 🧱 Composants Unitaires (Building Blocks)

### **Existants avec Variants (15)**
```typescript
// Chaque composant a des props pour personnalisation
interface ComponentProps {
  variant?: 'simple' | 'tech' | 'business' | 'agent' | 'complete'
  maxItems?: number
  showAdvanced?: boolean
  // etc...
}
```

### **Nouveaux Spécialisés (7)**
```typescript
SimpleDemo.tsx        // Demo interactive Amateur
BeforeAfterDemo.tsx    // Performance comparison Tech  
ROICalculator.tsx      // Business case Business
CaseStudies.tsx        // Success stories Business
ProtocolChecker.tsx    // Compliance validator Agent
DirectFeeds.tsx        // .well-known/ navigation Agent
MatrixTheming.tsx      // Wrapper théâtralité Rabbit
```

## 🎯 Avantages de cette Architecture

### **✅ Maintenance**
- **Single source of truth** par composant
- **Variants props** évitent la duplication
- **Tests unitaires** partagés

### **✅ Flexibilité** 
- **Mix & match** facile des composants
- **A/B testing** par recette
- **Ajout/suppression** sans casser les autres

### **✅ Performance**
- **Code splitting** automatique par version
- **Bundle size** optimisé par usage
- **SEO** spécialisé par persona

### **✅ Analytics**
- **Tracking différencié** par version
- **Conversion funnel** par persona
- **Heatmap** par recette

## 🚀 Plan d'Implémentation

### **Phase 1 : Router + Amateur (1 jour)**
```bash
1. Créer app/page.tsx router
2. Créer AmateurLanding.tsx avec SimpleDemo
3. Test /?v=simple fonctionnel
```

### **Phase 2 : Variants (1 jour)**
```bash
1. Ajouter variants props aux composants existants
2. TechLanding.tsx + BeforeAfterDemo
3. Test /?v=tech fonctionnel
```

### **Phase 3 : Business + Agent (2 jours)**
```bash
1. ROICalculator + CaseStudies
2. ProtocolChecker + DirectFeeds  
3. BusinessLanding + AgentLanding
```

### **Phase 4 : Rabbit + Polish (1 jour)**
```bash
1. MatrixTheming wrapper
2. RabbitLanding avec TOUT
3. Tests complets des 5 versions
```

---

**🎯 C'est exactement ça ! Une architecture en couches :**
- **Router** (1) → **Recettes** (5) → **Composants** (22)
- **Maximum réutilisation** avec minimum duplication
- **Personnalisation** via props variants

**Quelle phase voulez-vous attaquer en premier ?** 🚀