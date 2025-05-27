import { DownloadFeeds } from '@/components/landing/DownloadFeeds'
import { PageHeader } from '@/components/landing/PageHeader'
import { ToolsGrid } from '@/components/landing/ToolsGrid'
import { FAQList } from '@/components/landing/FAQList'
import { MissionBadges } from '@/components/landing/MissionBadges'
import { NewsSection } from '@/components/landing/NewsSection'
import { InjectHooks } from '@/components/landing/InjectHooks'
import { TestimonyCarousel } from '@/components/landing/TestimonyCarousel'
import { WhatYouCanDeclare } from '@/components/landing/WhatYouCanDeclare'
import { Community } from '@/components/landing/Community'
import { SchemaHeroSection } from '@/components/landing/SchemaHeroSection'

export default function Home() {
  return (
    <div className="space-y-12 px-4 sm:px-8 md:px-16">
      <PageHeader />
      <DownloadFeeds />
      <TestimonyCarousel />
      <WhatYouCanDeclare />
      <ToolsGrid />
      <SchemaHeroSection />
      <FAQList />
      <MissionBadges />
      <NewsSection />
      <Community />
      <InjectHooks />
    </div>
  )
}
