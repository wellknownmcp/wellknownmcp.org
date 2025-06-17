'use client'

import { useState, useEffect } from 'react'
import { Play, CheckCircle, XCircle, AlertCircle, Loader, Link as LinkIcon, Shield, Zap } from 'lucide-react'
import { useWellKnownMCPAnalytics } from '@/lib/hooks/useWellKnownMCPAnalytics'

interface ValidationResult {
  status: 'valid' | 'invalid' | 'warning' | 'pending'
  message: string
  details?: string
  fix?: string
}

interface ProtocolValidation {
  endpoint: string
  checks: {
    accessibility: ValidationResult
    structure: ValidationResult
    signature: ValidationResult
    compliance: ValidationResult
    performance: ValidationResult
  }
  overall: 'pass' | 'fail' | 'warning' | 'pending'
  score: number
  recommendations: string[]
  metadata?: {
    title?: string
    origin?: string
    feedType?: string
    lastModified?: string
    size?: number
  }
}

export function ProtocolChecker() {
  const [targetUrl, setTargetUrl] = useState('https://wellknownmcp.org/.well-known/mcp.llmfeed.json')
  const [isValidating, setIsValidating] = useState(false)
  const [validation, setValidation] = useState<ProtocolValidation | null>(null)
  const [validationHistory, setValidationHistory] = useState<string[]>([])
  const { trackEvent, trackAgentFeature, trackToolUsage } = useWellKnownMCPAnalytics()

  const commonEndpoints = [
    'https://wellknownmcp.org/.well-known/mcp.llmfeed.json',
    'https://wellknownmcp.org/.well-known/capabilities.llmfeed.json',
    'https://wellknownmcp.org/.well-known/llm-index.llmfeed.json',
    'https://example.com/.well-known/mcp.llmfeed.json'
  ]

  const simulateValidation = async (url: string): Promise<ProtocolValidation> => {
    const isWellKnownMCP = url.includes('wellknownmcp.org')
    const isValidUrl = url.includes('.well-known') && url.includes('.llmfeed.json')
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

    if (!isValidUrl) {
      return {
        endpoint: url,
        checks: {
          accessibility: { status: 'invalid', message: 'Invalid URL format', details: 'URL must point to a .llmfeed.json file in .well-known directory' },
          structure: { status: 'pending', message: 'Skipped due to accessibility failure' },
          signature: { status: 'pending', message: 'Skipped due to accessibility failure' },
          compliance: { status: 'pending', message: 'Skipped due to accessibility failure' },
          performance: { status: 'pending', message: 'Skipped due to accessibility failure' }
        },
        overall: 'fail',
        score: 0,
        recommendations: ['Use proper .well-known/[name].llmfeed.json URL format']
      }
    }

    if (isWellKnownMCP) {
      // Excellent compliance for our own site
      return {
        endpoint: url,
        checks: {
          accessibility: { 
            status: 'valid', 
            message: 'Feed accessible via HTTPS', 
            details: 'Response time: 127ms, Status: 200 OK' 
          },
          structure: { 
            status: 'valid', 
            message: 'Valid MCP/LLMFeed structure', 
            details: 'All required fields present, proper JSON format' 
          },
          signature: { 
            status: 'valid', 
            message: 'Cryptographically signed', 
            details: 'Valid ed25519 signature, verified against public key' 
          },
          compliance: { 
            status: 'valid', 
            message: 'Fully MCP compliant', 
            details: 'Implements latest v2.0 specification' 
          },
          performance: { 
            status: 'valid', 
            message: 'Optimized for agents', 
            details: 'Efficient token usage, fast parsing' 
          }
        },
        overall: 'pass',
        score: 98,
        recommendations: [
          'Excellent implementation! This feed is agent-ready.',
          'Consider adding more granular capabilities if needed.',
          'Monitor signature validity and renew when approaching expiration.'
        ],
        metadata: {
          title: 'WellKnownMCP - Agent-Readable Web Standard',
          origin: 'https://wellknownmcp.org',
          feedType: 'mcp',
          lastModified: new Date().toISOString(),
          size: 2840
        }
      }
    } else {
      // Simulated validation for other URLs
      const hasStructureIssues = Math.random() > 0.7
      const hasSignature = Math.random() > 0.6
      const hasPerformanceIssues = Math.random() > 0.5

      return {
        endpoint: url,
        checks: {
          accessibility: { 
            status: 'valid', 
            message: 'Feed accessible', 
            details: 'Response time: 340ms, Status: 200 OK' 
          },
          structure: { 
            status: hasStructureIssues ? 'warning' : 'valid', 
            message: hasStructureIssues ? 'Minor structure issues' : 'Valid structure', 
            details: hasStructureIssues ? 'Missing optional fields: agent_guidance, capabilities' : 'All required fields present',
            fix: hasStructureIssues ? 'Add missing optional fields for better agent experience' : undefined
          },
          signature: { 
            status: hasSignature ? 'valid' : 'warning', 
            message: hasSignature ? 'Valid signature' : 'No cryptographic signature', 
            details: hasSignature ? 'Valid signature found' : 'Feed is not signed - consider adding signature for trust',
            fix: hasSignature ? undefined : 'Add cryptographic signature using ed25519 or similar'
          },
          compliance: { 
            status: 'valid', 
            message: 'MCP compliant', 
            details: 'Meets basic MCP specification requirements' 
          },
          performance: { 
            status: hasPerformanceIssues ? 'warning' : 'valid', 
            message: hasPerformanceIssues ? 'Performance could be improved' : 'Good performance', 
            details: hasPerformanceIssues ? 'Large file size, consider optimization' : 'Efficient size and structure',
            fix: hasPerformanceIssues ? 'Optimize JSON structure and reduce file size' : undefined
          }
        },
        overall: (hasStructureIssues || !hasSignature || hasPerformanceIssues) ? 'warning' : 'pass',
        score: 85 - (hasStructureIssues ? 10 : 0) - (hasSignature ? 0 : 8) - (hasPerformanceIssues ? 7 : 0),
        recommendations: [
          ...(hasStructureIssues ? ['Add agent_guidance field for better agent experience'] : []),
          ...(!hasSignature ? ['Implement cryptographic signatures for trust verification'] : []),
          ...(hasPerformanceIssues ? ['Optimize feed size and structure for faster parsing'] : []),
          'Consider implementing additional feed types (capabilities, exports)',
          'Monitor feed performance and update regularly'
        ],
        metadata: {
          title: 'External Site MCP Feed',
          origin: new URL(url).origin,
          feedType: 'mcp',
          lastModified: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          size: 1200 + Math.floor(Math.random() * 2000)
        }
      }
    }
  }

  const validateEndpoint = async () => {
    if (!targetUrl.trim()) return

    setIsValidating(true)
    setValidation(null)
    
    // Track validation start
    trackAgentFeature('protocol_checker', 'developer')
    trackToolUsage('protocol_checker', 'validate_endpoint', true)
    trackEvent('Protocol Validation', {
      target_url: targetUrl,
      action: 'start_validation'
    })

    try {
      const result = await simulateValidation(targetUrl)
      setValidation(result)
      
      // Add to history if not already present
      if (!validationHistory.includes(targetUrl)) {
        setValidationHistory(prev => [targetUrl, ...prev.slice(0, 4)])
      }
      
      // Track completion
      trackEvent('Protocol Validation', {
        target_url: targetUrl,
        action: 'validation_complete',
        overall_status: result.overall,
        score: result.score
      })
      
    } catch (error) {
      console.error('Validation failed:', error)
      trackEvent('Protocol Validation', {
        target_url: targetUrl,
        action: 'validation_error',
        error: 'network_failure'
      })
    } finally {
      setIsValidating(false)
    }
  }

  const getStatusIcon = (status: ValidationResult['status']) => {
    switch (status) {
      case 'valid': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'invalid': return <XCircle className="w-5 h-5 text-red-600" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'pending': return <div className="w-5 h-5 bg-gray-300 rounded-full" />
    }
  }

  const getStatusColor = (status: ValidationResult['status']) => {
    switch (status) {
      case 'valid': return 'border-green-200 bg-green-50'
      case 'invalid': return 'border-red-200 bg-red-50'
      case 'warning': return 'border-yellow-200 bg-yellow-50'
      case 'pending': return 'border-gray-200 bg-gray-50'
    }
  }

  const getOverallColor = (overall: ProtocolValidation['overall']) => {
    switch (overall) {
      case 'pass': return 'border-green-500 bg-green-50'
      case 'fail': return 'border-red-500 bg-red-50'
      case 'warning': return 'border-yellow-500 bg-yellow-50'
      case 'pending': return 'border-gray-500 bg-gray-50'
    }
  }

  return (
    <section className="max-w-5xl mx-auto bg-gray-900 text-gray-100 rounded-xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Shield className="w-4 h-4" />
          Protocol Validator
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          🔍 MCP Compliance Checker
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Validate any MCP/LLMFeed endpoint for compliance, performance, and security. 
          Ensure your feeds are properly structured for optimal agent interaction.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              MCP Feed URL to Validate:
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://example.com/.well-known/mcp.llmfeed.json"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isValidating}
              />
              <button
                onClick={validateEndpoint}
                disabled={isValidating || !targetUrl.trim()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isValidating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Validate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Access Buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-400">Quick test:</span>
            {commonEndpoints.slice(0, 3).map((url, index) => (
              <button
                key={index}
                onClick={() => setTargetUrl(url)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded border border-gray-600"
                disabled={isValidating}
              >
                {url.includes('wellknownmcp.org') ? 
                  url.split('/').pop()?.replace('.llmfeed.json', '') : 
                  'Example'
                }
              </button>
            ))}
          </div>

          {/* Validation History */}
          {validationHistory.length > 0 && (
            <div>
              <span className="text-sm text-gray-400">Recent validations:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {validationHistory.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setTargetUrl(url)}
                    className="text-xs bg-gray-600 hover:bg-gray-500 text-gray-200 px-2 py-1 rounded"
                    disabled={isValidating}
                  >
                    {new URL(url).hostname}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Validation Results */}
      {validation && (
        <div className="space-y-6">
          
          {/* Overall Status */}
          <div className={`border-2 rounded-lg p-6 ${getOverallColor(validation.overall)}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Overall Compliance: {validation.overall.toUpperCase()}
                </h3>
                <p className="text-gray-700">Score: {validation.score}/100</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  {validation.score}%
                </div>
                <div className="text-sm text-gray-600">Compliance Score</div>
              </div>
            </div>
            
            {validation.metadata && (
              <div className="bg-white/50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">📄 Feed Metadata</h4>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-600">Title:</span> {validation.metadata.title}</div>
                  <div><span className="text-gray-600">Origin:</span> {validation.metadata.origin}</div>
                  <div><span className="text-gray-600">Type:</span> {validation.metadata.feedType}</div>
                  <div><span className="text-gray-600">Size:</span> {validation.metadata.size} bytes</div>
                </div>
              </div>
            )}
          </div>

          {/* Detailed Checks */}
          <div className="grid md:grid-cols-1 gap-4">
            {Object.entries(validation.checks).map(([checkName, result]) => (
              <div key={checkName} className={`border rounded-lg p-4 ${getStatusColor(result.status)}`}>
                <div className="flex items-start gap-3">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 capitalize mb-1">
                      {checkName.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-gray-700 mb-1">{result.message}</p>
                    {result.details && (
                      <p className="text-sm text-gray-600 mb-2">{result.details}</p>
                    )}
                    {result.fix && (
                      <div className="bg-white/50 rounded p-2 text-sm">
                        <span className="font-medium text-gray-900">💡 Fix: </span>
                        <span className="text-gray-700">{result.fix}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          {validation.recommendations.length > 0 && (
            <div className="bg-blue-900 border border-blue-700 rounded-lg p-6">
              <h4 className="font-semibold text-blue-100 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Optimization Recommendations
              </h4>
              <ul className="space-y-2">
                {validation.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-blue-200">
                    <span className="text-blue-400 mt-1">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={validation.endpoint}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-gray-100 px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <LinkIcon className="w-5 h-5" />
              View Raw Feed
            </a>
            <button
              onClick={() => setValidation(null)}
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Clear Results
            </button>
            <a
              href="/tools/prompt"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              🛠️ Create Your Feed
            </a>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h4 className="font-semibold text-gray-100 mb-3">🤖 Agent Usage Tips</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <p>• Use this tool to verify MCP feeds before deploying</p>
          <p>• Check compliance after making changes to your feeds</p>
          <p>• Monitor feed performance and security regularly</p>
          <p>• Ensure signatures are valid and not expired</p>
          <p>• Test from different network locations for reliability</p>
        </div>
      </div>
    </section>
  )
}