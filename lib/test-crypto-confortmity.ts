// test-crypto-conformity.ts
// Test d'intégration pour vérifier la conformité frontend/backend

import { verifyFeedSignature, verifyFeedCertification, verifySignatureHash } from './verifyCrypto'
import { analyzeBlocksWithValidation } from './analyzeBlocks'

/**
 * Test avec un feed réel de wellknownmcp.org (RECOMMANDÉ)
 */
export async function testWithRealFeed() {
  console.log('🌐 TEST AVEC UN FEED RÉEL\n')
  
  try {
    console.log('📡 Téléchargement du feed...')
    const response = await fetch('https://wellknownmcp.org/.well-known/mcp.llmfeed.json')
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const realFeed = await response.json()
    
    console.log('📥 Feed téléchargé avec succès!')
    console.log('📋 Titre:', realFeed.metadata?.title || 'Unknown')
    console.log('🏷️ Type:', realFeed.feed_type || 'Unknown')
    console.log('🔐 Trust block présent:', !!realFeed.trust)
    console.log('✍️ Signature présente:', !!realFeed.signature)
    console.log('🏅 Certification présente:', !!realFeed.certification)
    console.log()
    
    // Test de canonicalisation avec feed réel
    console.log('🔧 TEST DE CANONICALISATION:')
    testCanonicalization(realFeed)
    console.log()
    
    // Test de vérification de signature
    console.log('🔐 TEST DE VÉRIFICATION DE SIGNATURE:')
    const signatureResult = await verifyFeedSignature(realFeed)
    console.log('- Status:', signatureResult.ok ? '✅ VALID' : '❌ INVALID')
    console.log('- Message:', signatureResult.message)
    
    if (signatureResult.ok) {
      console.log('🎉 SUCCESS! Le frontend est conforme au backend!')
    } else {
      console.log('❌ FAILURE! Problème de conformité détecté.')
      console.log('💡 Possible causes:')
      console.log('  - Canonicalisation différente entre frontend/backend')
      console.log('  - Clé publique inaccessible ou changée')
      console.log('  - Algorithme de signature différent')
    }
    console.log()
    
    // Test de certification si présente
    if (realFeed.certification) {
      console.log('🏅 TEST DE CERTIFICATION:')
      const certifications = Array.isArray(realFeed.certification) 
        ? realFeed.certification 
        : [realFeed.certification]
      
      for (let i = 0; i < certifications.length; i++) {
        const cert = certifications[i]
        console.log(`📜 Certification ${i + 1}:`)
        
        try {
          const certResult = await verifyFeedCertification(realFeed, cert)
          console.log(`  - Status: ${certResult.ok ? '✅ VALID' : '❌ INVALID'}`)
          console.log(`  - Message: ${certResult.message}`)
          
          // Test du hash de signature si présent
          if (cert.signature_value_hash) {
            const hashResult = await verifySignatureHash(realFeed, cert)
            console.log(`  - Signature Hash: ${hashResult.ok ? '✅ VALID' : '❌ INVALID'}`)
            console.log(`  - Hash Message: ${hashResult.message}`)
          }
        } catch (error) {
          console.error(`  - ❌ ERREUR:`, error)
        }
      }
      console.log()
    }
    
    // Analyse complète des blocs
    console.log('📊 ANALYSE DES BLOCS:')
    const blockAnalysis = analyzeBlocksWithValidation(realFeed, signatureResult)
    
    blockAnalysis.forEach(block => {
      const statusIcon = getBlockStatusIcon(block)
      console.log(`${statusIcon} ${block.blockName}:`)
      console.log(`   - Signed: ${block.isSigned}`)
      console.log(`   - Signature Status: ${block.signatureValidationStatus}`)
      console.log(`   - Cert Status: ${block.certificationValidationStatus}`)
      console.log(`   - Content: ${block.contentType} (${block.contentSize} bytes)`)
      
      if (block.hasValidationErrors) {
        console.log('   - ⚠️ HAS VALIDATION ERRORS')
      }
      console.log()
    })
    
    return { success: signatureResult.ok, feed: realFeed }
    
  } catch (error) {
    console.error('💥 Erreur lors du test avec feed réel:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Test complet de conformité avec un feed custom (pour tests spécifiques)
 */
export async function testFullConformity(customFeed?: any) {
  console.log('🧪 TEST DE CONFORMITÉ FRONTEND/BACKEND\n')
  
  // Utiliser un feed custom ou un exemple par défaut
  const testFeed = customFeed || {
    "feed_type": "export",
    "metadata": {
      "title": "Test Feed",
      "description": "Feed de test pour validation conformité",
      "version": "1.0.0",
      "created_at": "2025-06-20T10:00:00Z"
    },
    "trust": {
      "signed_blocks": ["feed_type", "metadata", "trust"],
      "algorithm": "ed25519",
      "canonicalization": "https://llmca.org/mcp-canonical-json/v1",
      "public_key_hint": "https://wellknownmcp.org/.well-known/public.pem",
      "scope": "partial",
      "warning": "Only 3/3 blocks are signed."
    },
    "signature": {
      "value": "SIGNATURE_BASE64_ICI_REMPLACER_PAR_VRAIE_SIGNATURE",
      "created_at": "2025-06-20T10:00:00Z"
    }
  }

  console.log('📋 Test Feed Structure:')
  console.log('- Feed Type:', testFeed.feed_type)
  console.log('- Signed Blocks:', testFeed.trust?.signed_blocks)
  console.log('- Algorithm:', testFeed.trust?.algorithm)
  console.log('- Canonicalization:', testFeed.trust?.canonicalization)
  console.log()

  // Test 1: Canonicalisation (le plus important!)
  console.log('🔧 TEST 1: Test de canonicalisation')
  const canonResult = testCanonicalization(testFeed)
  console.log()

  // Test 2: Vérification de signature
  console.log('🔐 TEST 2: Verification de signature')
  try {
    const signatureResult = await verifyFeedSignature(testFeed)
    console.log('✅ Signature Status:', signatureResult.ok ? 'VALID' : 'INVALID')
    console.log('📝 Message:', signatureResult.message)
    
    if (!signatureResult.ok && !testFeed.signature.value.includes('SIGNATURE_BASE64_ICI')) {
      console.log('❌ ÉCHEC: La signature n\'est pas valide')
      console.log('💡 Cela peut indiquer un problème de canonicalisation ou de clé')
    }
  } catch (error) {
    console.error('💥 ERREUR lors de la vérification:', error)
  }
  console.log()

  // Test 3: Analyse des blocs
  console.log('📊 TEST 3: Analyse des blocs')
  const blockAnalysis = analyzeBlocksWithValidation(testFeed)
  
  blockAnalysis.forEach(block => {
    console.log(`📄 Block: ${block.blockName}`)
    console.log(`   - Signed: ${block.isSigned}`)
    console.log(`   - Content Type: ${block.contentType}`)
    console.log(`   - Size: ${block.contentSize} bytes`)
    console.log(`   - Validation Status: ${block.signatureValidationStatus}`)
    console.log()
  })

  console.log('🎯 RECOMMANDATIONS:')
  console.log('1. Utilisez testWithRealFeed() pour un test complet avec un vrai feed')
  console.log('2. Vérifiez que la canonicalisation produit exactement les mêmes bytes')
  console.log('3. Confirmez que les clés publiques sont accessibles')
  console.log('4. Créez un feed de test avec une vraie signature de votre backend Python')
  
  return canonResult
}

/**
 * Test spécifique de la canonicalisation (CRITIQUE pour la conformité)
 */
function testCanonicalization(feed: any): { correct: string, wrong: string, match: boolean } {
  const signedBlocks = feed.trust?.signed_blocks || []
  
  if (signedBlocks.length === 0) {
    console.log('⚠️ Aucun bloc signé trouvé dans le feed')
    return { correct: '', wrong: '', match: true }
  }
  
  // Reconstruction du partial comme le backend
  const partial: any = {}
  for (const key of signedBlocks) {
    if (
      feed[key] !== undefined &&
      key !== 'signature' &&
      key !== 'certification' &&
      key !== '_meta' &&
      key !== '_verification_help'
    ) {
      partial[key] = feed[key]
    }
  }

  console.log('🔧 Partial Feed pour canonicalisation:')
  console.log(JSON.stringify(partial, null, 2))
  console.log()

  // Test des différentes canonicalisations
  const correctCanon = JSON.stringify(partial)
    .replace(/,\s+/g, ',')      // Enlever espaces après virgules
    .replace(/:\s+/g, ':')      // Enlever espaces après deux-points
  
  const wrongCanon = JSON.stringify(partial)  // Avec espaces par défaut JS
  const sortedWrong = JSON.stringify(partial, Object.keys(partial).sort()) // Mauvais ordre

  console.log('✅ Canonicalisation CORRECTE (backend-compatible):')
  console.log(`"${correctCanon}"`)
  console.log(`Length: ${correctCanon.length} bytes`)
  console.log()

  console.log('❌ Canonicalisation INCORRECTE (défaut JS):')
  console.log(`"${wrongCanon}"`)
  console.log(`Length: ${wrongCanon.length} bytes`)
  console.log(`Différente: ${correctCanon !== wrongCanon ? '✅ OUI' : '❌ NON (problème!)'}`)
  console.log()

  if (correctCanon === wrongCanon) {
    console.log('⚠️ ATTENTION: Les canonicalisations sont identiques!')
    console.log('Cela peut indiquer que votre JSON n\'a pas d\'espaces par défaut.')
    console.log('Testez avec un feed plus complexe pour voir la différence.')
  }

  // Test avec ordre des clés
  console.log('🔍 Test ordre des clés:')
  console.log('Original order:', Object.keys(partial))
  console.log('Sorted order:', Object.keys(partial).sort())
  console.log('Order matters:', JSON.stringify(Object.keys(partial)) !== JSON.stringify(Object.keys(partial).sort()))
  console.log()

  // Test des bytes
  const correctBytes = new TextEncoder().encode(correctCanon)
  const wrongBytes = new TextEncoder().encode(wrongCanon)
  
  console.log('📦 Bytes Comparison:')
  console.log(`Correct bytes length: ${correctBytes.length}`)
  console.log(`Wrong bytes length: ${wrongBytes.length}`)
  console.log(`Bytes are different: ${correctBytes.length !== wrongBytes.length || correctCanon !== wrongCanon}`)

  return { 
    correct: correctCanon, 
    wrong: wrongCanon, 
    match: correctCanon === wrongCanon 
  }
}

/**
 * Icônes pour les statuts des blocs
 */
function getBlockStatusIcon(block: any): string {
  if (block.hasValidationErrors) return '❌'
  if (block.signatureValidationStatus === 'valid' && block.certificationValidationStatus === 'valid') return '🟢'
  if (block.signatureValidationStatus === 'valid') return '🟡'
  if (block.signatureValidationStatus === 'not_signed') return '⚪'
  return '🔴'
}

/**
 * Test express pour développement rapide
 */
export async function quickTest() {
  console.log('⚡ QUICK TEST - Vérification conformité rapide\n')
  
  try {
    const result = await testWithRealFeed()
    
    if (result.success) {
      console.log('🎉 RÉSULTAT: Frontend conforme au backend!')
      console.log('✅ Votre vérification cryptographique fonctionne correctement.')
    } else {
      console.log('❌ RÉSULTAT: Problème de conformité détecté.')
      console.log('🔧 Vérifiez la canonicalisation et les clés publiques.')
    }
    
    return result.success
    
  } catch (error) {
    console.error('💥 Quick test failed:', error)
    return false
  }
}

/**
 * Test de performance
 */
export async function performanceTest() {
  console.log('🚀 TEST DE PERFORMANCE\n')
  
  const start = performance.now()
  
  try {
    const result = await testWithRealFeed()
    const end = performance.now()
    
    console.log(`⏱️ Temps total: ${(end - start).toFixed(2)}ms`)
    console.log(`📊 Résultat: ${result.success ? 'SUCCESS' : 'FAILURE'}`)
    
    return { duration: end - start, success: result.success }
    
  } catch (error) {
    const end = performance.now()
    console.error('💥 Performance test failed:', error)
    return { duration: end - start, success: false }
  }
}

// Auto-exécution pour test rapide
if (typeof window !== 'undefined') {
  (window as any).testCryptoConformity = testFullConformity;
  (window as any).testWithRealFeed = testWithRealFeed;
  (window as any).quickTest = quickTest;
  (window as any).performanceTest = performanceTest;
  
  console.log('🧪 Tests de conformité crypto disponibles:')
  console.log('- quickTest() - Test express avec feed réel')
  console.log('- testWithRealFeed() - Test complet avec feed wellknownmcp.org')
  console.log('- testCryptoConformity() - Test avec feed custom')
  console.log('- performanceTest() - Mesure de performance')
}