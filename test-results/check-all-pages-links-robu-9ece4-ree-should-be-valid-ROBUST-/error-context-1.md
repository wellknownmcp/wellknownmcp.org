# Test info

- Name: All internal links across entire app tree should be valid (ROBUST)
- Location: C:\Users\Santoline\wellknownmcp\wellknownmcp.org\tests\check-all-pages-links-robust.spec.ts:51:5

# Error details

```
Error: browserContext._wrapApiCall: Test ended.
Browser logs:

<launching> C:\Users\Santoline\AppData\Local\ms-playwright\chromium_headless_shell-1169\chrome-win\headless_shell.exe --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-extensions --disable-features=AcceptCHFrame,AutoExpandDetailsElement,AvoidUnnecessaryBeforeUnloadCheckSync,CertificateTransparencyComponentUpdater,DeferRendererTasksAfterInput,DestroyProfileOnBrowserClose,DialMediaRouteProvider,ExtensionManifestV2Disabled,GlobalMediaControls,HttpsUpgrades,ImprovedCookieControls,LazyFrameLoading,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --enable-automation --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=C:\Users\SANTOL~1\AppData\Local\Temp\playwright_chromiumdev_profile-6uIgo4 --remote-debugging-pipe --no-startup-window
<launched> pid=6528
```

# Test source

```ts
   1 | // playwright.config.ts (configuration recommandée)
   2 | import { defineConfig, devices } from '@playwright/test'
   3 |
   4 | export default defineConfig({
   5 |   testDir: './tests', // ou './e2e' selon ton setup
   6 |   
   7 |   // 🎯 TIMEOUTS ÉTENDUS
   8 |   timeout: 60000,        // 60s par test (au lieu de 30s)
   9 |   expect: { timeout: 10000 },
   10 |   
   11 |   fullyParallel: false,  // ⚠️ IMPORTANT: évite la surcharge
   12 |   workers: 1,            // Un seul worker pour éviter les conflits
   13 |   
   14 |   // 🔄 RETRY STRATEGY
   15 |   retries: 2,           // Retry 2 fois en cas d'échec
   16 |   
   17 |   use: {
   18 |     baseURL: 'http://localhost:3000',
   19 |     
   20 |     // 🕐 TIMEOUTS ÉTENDUS pour les actions
   21 |     actionTimeout: 15000,
   22 |     navigationTimeout: 30000,
   23 |     
   24 |     // 📊 DEBUGGING
   25 |     trace: 'retain-on-failure',
   26 |     screenshot: 'only-on-failure',
   27 |     video: 'retain-on-failure',
   28 |   },
   29 |
   30 |   // 🚀 AUTO-START SERVER (optionnel)
   31 |   webServer: {
   32 |     command: 'npm run start',
   33 |     port: 3000,
   34 |     timeout: 120000,    // 2 minutes pour démarrer
   35 |     reuseExistingServer: !process.env.CI,
   36 |   },
   37 |
   38 |   projects: [
   39 |     {
   40 |       name: 'chromium',
   41 |       use: { ...devices['Desktop Chrome'] },
   42 |     },
   43 |   ],
   44 | })
   45 |
   46 | // ===================================
   47 |
   48 | // check-all-pages-links-robust.spec.ts (version robuste)
   49 | import { test, expect } from '@playwright/test'
   50 |
>  51 | test('All internal links across entire app tree should be valid (ROBUST)', async ({
      |     ^ Error: browserContext._wrapApiCall: Test ended.
   52 |   page,
   53 |   baseURL,
   54 | }) => {
   55 |   
   56 |   // 🎯 PAGES ESSENTIELLES D'ABORD (pour debug rapide)
   57 |   const essentialPages = [
   58 |     '/',
   59 |     '/about', 
   60 |     '/spec',
   61 |     '/tools',
   62 |   ]
   63 |   
   64 |   // 🌍 PAGES COMPLÈTES (si les essentielles passent)
   65 |   const allPages = [
   66 |     ...essentialPages,
   67 |     '/download', 
   68 |     '/ecosystem',
   69 |     '/faq',
   70 |     '/feeds', 
   71 |     '/join',
   72 |     '/legal',
   73 |     '/sdk',
   74 |     '/verify',
   75 |     '/why-sign',
   76 |     
   77 |     // Tools
   78 |     '/tools/agent-behavior',
   79 |     '/tools/api-explained', 
   80 |     '/tools/badges',
   81 |     '/tools/export-button',
   82 |     '/tools/pricing',
   83 |     '/tools/schema',
   84 |     
   85 |     // LLMFeedHub
   86 |     '/llmfeedhub',
   87 |     
   88 |     // News (langues principales seulement)
   89 |     '/en/news',
   90 |     '/fr/news',
   91 |     '/en/about',
   92 |     '/fr/about',
   93 |   ]
   94 |   
   95 |   console.log(`🔍 Testing ${allPages.length} pages for broken links...`)
   96 |   
   97 |   const brokenLinks: string[] = []
   98 |   const pageErrors: string[] = []
   99 |   let successfulPages = 0
  100 |   
  101 |   // 🛡️ STRATÉGIE ROBUSTE : Test page par page avec gestion d'erreur
  102 |   for (let i = 0; i < allPages.length; i++) {
  103 |     const path = allPages[i]
  104 |     const fullUrl = `${baseURL}${path}`
  105 |     
  106 |     console.log(`📄 [${i+1}/${allPages.length}] Checking: ${path}`)
  107 |     
  108 |     try {
  109 |       // 🚀 Navigation avec retry intégré
  110 |       await page.goto(fullUrl, { 
  111 |         timeout: 30000,
  112 |         waitUntil: 'domcontentloaded' // Plus rapide que 'networkidle'
  113 |       })
  114 |       
  115 |       // ⏱️ Attente réduite mais robuste
  116 |       await page.waitForTimeout(1000) // 1 seconde de grâce
  117 |       
  118 |       successfulPages++
  119 |       
  120 |     } catch (err: any) {
  121 |       pageErrors.push(`❌ Failed to load ${path} — ${err.message}`)
  122 |       console.log(`  ⚠️ Skipping ${path}: ${err.message}`)
  123 |       
  124 |       // 🔄 Si trop d'erreurs consécutives, arrêter
  125 |       if (pageErrors.length > 10) {
  126 |         console.log(`🛑 Too many consecutive errors. Stopping test.`)
  127 |         break
  128 |       }
  129 |       continue
  130 |     }
  131 |
  132 |     try {
  133 |       // 🔗 Extraction des liens avec timeout
  134 |       const links = await page.$$eval('a[href^="/"]', (anchors) =>
  135 |         anchors.map((a) => a.getAttribute('href'))
  136 |       )
  137 |
  138 |       const uniqueLinks = [
  139 |         ...new Set(links.filter((href) => 
  140 |           href && 
  141 |           !href.startsWith('/#') &&
  142 |           !href.includes('/api/') &&
  143 |           !href.match(/\.(json|xml|txt|zip)$/)
  144 |         )),
  145 |       ].slice(0, 20) // Limite à 20 liens par page pour la vitesse
  146 |
  147 |       console.log(`  └─ Found ${uniqueLinks.length} internal links`)
  148 |
  149 |       // 🧪 Test rapide des liens (HEAD requests)
  150 |       for (const href of uniqueLinks) {
  151 |         const target = `${baseURL}${href}`
```