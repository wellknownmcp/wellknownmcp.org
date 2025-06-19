import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { CopyButton } from '@/components/CopyButton'

export default function CertificationProcess() {
  return (
    <>
      <SeoHead 
        title="Certification Process - LLMCA Trust Validation | WellKnownMCP"
        description="Complete guide to LLMCA certification for MCP feeds. From individual to enterprise certification, understand the trust validation process."
        keywords="LLMCA certification, trust validation, feed certification, MCP compliance, enterprise certification, trust scoring, signature verification"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageTitle 
          title="Certification Process" 
          subtitle="LLMCA Trust Validation for MCP Feeds"
          
        />

        {/* Hero Section */}
        <div className="mb-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-900">Trust as Infrastructure</h2>
              <p className="text-emerald-700">Third-party validation for the agent web</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-emerald-200">
              <h3 className="font-semibold text-emerald-900 mb-3">🎯 Certification Value</h3>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• <strong>Higher trust scores:</strong> Agents prefer certified feeds</li>
                <li>• <strong>Premium discovery:</strong> Better placement in agent search</li>
                <li>• <strong>Reduced friction:</strong> Skip manual verification</li>
                <li>• <strong>Marketing advantage:</strong> "Certified by LLMCA" badge</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-emerald-200">
              <h3 className="font-semibold text-emerald-900 mb-3">🚀 Business Impact</h3>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• <strong>Automated compliance:</strong> Certifier validates for you</li>
                <li>• <strong>Risk sharing:</strong> Reduced liability through third-party</li>
                <li>• <strong>Competitive edge:</strong> Professional credibility signal</li>
                <li>• <strong>Future-ready:</strong> Early adopter advantage</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Process Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔄 Certification Process</h2>
          
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">1</div>
              <h3 className="font-semibold text-blue-900">Request</h3>
              <p className="text-sm text-blue-700">Submit feed for certification</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">2</div>
              <h3 className="font-semibold text-orange-900">Verify</h3>
              <p className="text-sm text-orange-700">Identity & technical validation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">3</div>
              <h3 className="font-semibold text-green-900">Issue</h3>
              <p className="text-sm text-green-700">Certification block added</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">4</div>
              <h3 className="font-semibold text-purple-900">Monitor</h3>
              <p className="text-sm text-purple-700">Continuous compliance</p>
            </div>
          </div>
        </div>

        {/* Certification Tiers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Certification Tiers</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900">Individual</h3>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="font-semibold text-blue-900">Free Tier</p>
                  <p className="text-sm text-blue-700">Up to 5 feeds/month</p>
                </div>
                
                <div className="text-sm space-y-2">
                  <h4 className="font-semibold text-blue-900">Verification Requirements:</h4>
                  <ul className="space-y-1 text-blue-800">
                    <li>• Domain control (DNS verification)</li>
                    <li>• Basic identity confirmation</li>
                    <li>• Feed structure validation</li>
                  </ul>
                </div>
                
                <div className="text-sm space-y-2">
                  <h4 className="font-semibold text-blue-900">Best For:</h4>
                  <ul className="space-y-1 text-blue-800">
                    <li>• Personal blogs & portfolios</li>
                    <li>• Open source projects</li>
                    <li>• Developer experiments</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-900">Organization</h3>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <p className="font-semibold text-green-900">$100/year</p>
                  <p className="text-sm text-green-700">Unlimited feeds</p>
                </div>
                
                <div className="text-sm space-y-2">
                  <h4 className="font-semibold text-green-900">Verification Requirements:</h4>
                  <ul className="space-y-1 text-green-800">
                    <li>• Business registration verification</li>
                    <li>• DUNS number validation</li>
                    <li>• Security audit checklist</li>
                    <li>• Compliance framework review</li>
                  </ul>
                </div>
                
                <div className="text-sm space-y-2">
                  <h4 className="font-semibold text-green-900">Best For:</h4>
                  <ul className="space-y-1 text-green-800">
                    <li>• SaaS platforms</li>
                    <li>• Growing startups</li>
                    <li>• API-first companies</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.678-2.153-1.415-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-900">Enterprise</h3>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <p className="font-semibold text-purple-900">Custom Pricing</p>
                  <p className="text-sm text-purple-700">99.9% SLA included</p>
                </div>
                
                <div className="text-sm space-y-2">
                  <h4 className="font-semibold text-purple-900">Verification Requirements:</h4>
                  <ul className="space-y-1 text-purple-800">
                    <li>• Full security audit</li>
                    <li>• SOC2/ISO27001 compliance</li>
                    <li>• Key management review</li>
                    <li>• Dedicated support channel</li>
                  </ul>
                </div>
                
                <div className="text-sm space-y-2">
                  <h4 className="font-semibold text-purple-900">Best For:</h4>
                  <ul className="space-y-1 text-purple-800">
                    <li>• Fortune 500 companies</li>
                    <li>• Financial institutions</li>
                    <li>• Healthcare platforms</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔍 Verification Deep Dive</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Phase 1: Identity Verification</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2">🌐 Domain Control</h4>
                  <ul className="text-sm space-y-1 text-blue-700">
                    <li>• DNS TXT record validation</li>
                    <li>• HTTPS certificate verification</li>
                    <li>• Domain ownership history</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2">🏢 Business Registration</h4>
                  <ul className="text-sm space-y-1 text-blue-700">
                    <li>• Legal entity verification</li>
                    <li>• DUNS number validation</li>
                    <li>• Business license check</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2">🔑 Key Management</h4>
                  <ul className="text-sm space-y-1 text-blue-700">
                    <li>• Private key security audit</li>
                    <li>• Challenge-response test</li>
                    <li>• Key rotation procedures</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Phase 2: Technical Validation</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-800 mb-3">📐 Feed Structure</h4>
                  <ul className="text-sm space-y-1 text-orange-700">
                    <li>• Schema compliance validation</li>
                    <li>• Required metadata presence</li>
                    <li>• Signature format correctness</li>
                    <li>• Canonicalization adherence</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-800 mb-3">🔒 Security Assessment</h4>
                  <ul className="text-sm space-y-1 text-orange-700">
                    <li>• Cryptographic best practices</li>
                    <li>• Content security policies</li>
                    <li>• Access control mechanisms</li>
                    <li>• Vulnerability assessment</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-4">Phase 3: Reputation Assessment</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">📊 Historical Behavior</h4>
                  <ul className="text-sm space-y-1 text-green-700">
                    <li>• Previous certification history</li>
                    <li>• Community feedback analysis</li>
                    <li>• Security incident tracking</li>
                    <li>• Compliance track record</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">🏆 Trust Scoring</h4>
                  <ul className="text-sm space-y-1 text-green-700">
                    <li>• Weighted reputation calculation</li>
                    <li>• Community standing review</li>
                    <li>• Expert panel evaluation</li>
                    <li>• Final confidence score</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certification Models */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⚙️ Certification Models</h2>
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 border border-gray-200">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🎯 Signature Certification (Recommended)</h3>
              <p className="text-gray-700 mb-4">
                LLMCA certifies your identity and signing process, not the content itself. This allows content updates without re-certification.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">JSON Structure Example:</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
{`"certification": {
  "certifier": "https://llmca.org",
  "targets": ["signature"],
  "model": "identity_validation",
  "identity_verified": "stripe.com",
  "verification_level": "enterprise",
  "verification_details": {
    "domain_control": "verified",
    "business_registration": "verified",
    "key_management": "audited"
  },
  "signature_hash": "sha256-of-signature-value",
  "value": "base64-certifier-signature",
  "issued_at": "2025-06-12T15:00:00Z",
  "expires_at": "2026-06-12T15:00:00Z"
}`}
                </pre>
              </div>
              <CopyButton 
                text={`"certification": {
  "certifier": "https://llmca.org",
  "targets": ["signature"],
  "model": "identity_validation",
  "identity_verified": "stripe.com",
  "verification_level": "enterprise",
  "verification_details": {
    "domain_control": "verified",
    "business_registration": "verified", 
    "key_management": "audited"
  },
  "signature_hash": "sha256-of-signature-value",
  "value": "base64-certifier-signature",
  "issued_at": "2025-06-12T15:00:00Z",
  "expires_at": "2026-06-12T15:00:00Z"
}`}
                className="mt-3"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">✅ Advantages</h4>
                <ul className="text-sm space-y-1 text-green-700">
                  <li>• Content updates don't require re-certification</li>
                  <li>• Scalable for high-volume publishers</li>
                  <li>• Clear separation: identity vs content</li>
                  <li>• Lower certification overhead</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">🎯 Use Cases</h4>
                <ul className="text-sm space-y-1 text-blue-700">
                  <li>• News sites with frequent updates</li>
                  <li>• API platforms with dynamic content</li>
                  <li>• E-commerce with changing catalogs</li>
                  <li>• SaaS platforms with user-generated content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Getting Started</h2>
          
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-4">📋 Preparation Checklist</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                    <span className="text-purple-800">Feed is valid and signed</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                    <span className="text-purple-800">Domain control can be proven</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                    <span className="text-purple-800">Business registration documents ready</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                    <span className="text-purple-800">Key management procedures documented</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                    <span className="text-purple-800">Certification tier selected</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-4">🔗 Next Steps</h3>
                <div className="space-y-4">
                  <Link href="/tools/sign-and-verify" className="block bg-white rounded-lg p-4 border border-purple-200 hover:border-purple-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900">Sign Your Feed</h4>
                        <p className="text-sm text-purple-700">Create a signed feed first</p>
                      </div>
                    </div>
                  </Link>
                  
                  <a href="https://llmca.org/certify" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg p-4 border border-purple-200 hover:border-purple-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900">Request Certification</h4>
                        <p className="text-sm text-purple-700">Submit to LLMCA for review</p>
                      </div>
                    </div>
                  </a>
                  
                  <Link href="/tools/badges" className="block bg-white rounded-lg p-4 border border-purple-200 hover:border-purple-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900">Display Certification</h4>
                        <p className="text-sm text-purple-700">Add trust badges to your site</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support & Contact */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💬 Support & Contact</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">General Support</h3>
              <p className="text-blue-700 text-sm mb-3">Questions about the certification process</p>
              <a href="mailto:support@llmca.org" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                support@llmca.org
              </a>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H8m13-9.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V6z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-orange-900 mb-2">Appeals Process</h3>
              <p className="text-orange-700 text-sm mb-3">Dispute certification decisions</p>
              <a href="mailto:appeals@llmca.org" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                appeals@llmca.org
              </a>
            </div>
            
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-red-900 mb-2">Security Issues</h3>
              <p className="text-red-700 text-sm mb-3">Report security vulnerabilities</p>
              <a href="mailto:security@llmca.org" className="text-red-600 hover:text-red-800 text-sm font-medium">
                security@llmca.org
              </a>
            </div>
          </div>
        </div>

        {/* Export & Share */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">📤 Export This Guide</h2>
            <ExportToLLMButton 
              context="static"
              showSignatureStatus
              showCurlCommand
            />
          </div>
          
          <ShareButtons 
          />
        </div>
      </div>
    </>
  )
}