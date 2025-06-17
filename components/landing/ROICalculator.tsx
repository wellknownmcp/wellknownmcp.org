'use client'

import { useState, useEffect } from 'react'
import { Calculator, TrendingUp, DollarSign, Clock, Users, Zap } from 'lucide-react'
import { useWellKnownMCPAnalytics } from '@/lib/hooks/useWellKnownMCPAnalytics'

interface BusinessInputs {
  monthlyAgentInteractions: number
  averageTokensPerInteraction: number
  tokenCostPer1K: number
  developerHourlyRate: number
  hoursSpentOnAgentIntegration: number
  customerSupportTickets: number
}

interface ROIResults {
  currentMonthlyCost: number
  mcpMonthlyCost: number
  monthlySavings: number
  annualSavings: number
  implementationCost: number
  paybackPeriod: number
  roi12Months: number
  tokenSavingsPercent: number
  timeSavingsPercent: number
  additionalBenefits: string[]
}

export function ROICalculator() {
  const [inputs, setInputs] = useState<BusinessInputs>({
    monthlyAgentInteractions: 10000,
    averageTokensPerInteraction: 8000,
    tokenCostPer1K: 0.002,
    developerHourlyRate: 120,
    hoursSpentOnAgentIntegration: 40,
    customerSupportTickets: 500
  })
  
  const [results, setResults] = useState<ROIResults | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [industry, setIndustry] = useState('technology')
  const { trackEvent, trackConversionIntent, trackToolUsage } = useWellKnownMCPAnalytics()

  const industryPresets = {
    technology: {
      monthlyAgentInteractions: 50000,
      averageTokensPerInteraction: 8000,
      label: 'Technology/SaaS'
    },
    ecommerce: {
      monthlyAgentInteractions: 25000,
      averageTokensPerInteraction: 6000,
      label: 'E-commerce'
    },
    financial: {
      monthlyAgentInteractions: 15000,
      averageTokensPerInteraction: 12000,
      label: 'Financial Services'
    },
    healthcare: {
      monthlyAgentInteractions: 8000,
      averageTokensPerInteraction: 10000,
      label: 'Healthcare'
    },
    consulting: {
      monthlyAgentInteractions: 5000,
      averageTokensPerInteraction: 15000,
      label: 'Consulting'
    }
  }

  const calculateROI = () => {
    // Current costs (HTML scraping approach)
    const currentMonthlyTokens = inputs.monthlyAgentInteractions * inputs.averageTokensPerInteraction
    const currentMonthlyCost = (currentMonthlyTokens / 1000) * inputs.tokenCostPer1K
    
    // MCP approach costs (90%+ token reduction)
    const mcpTokenReduction = 0.967 // 96.7% reduction based on our metrics
    const mcpMonthlyTokens = currentMonthlyTokens * (1 - mcpTokenReduction)
    const mcpMonthlyCost = (mcpMonthlyTokens / 1000) * inputs.tokenCostPer1K
    
    // Implementation costs
    const implementationCost = inputs.developerHourlyRate * inputs.hoursSpentOnAgentIntegration
    
    // Savings calculations
    const monthlySavings = currentMonthlyCost - mcpMonthlyCost
    const annualSavings = monthlySavings * 12
    const paybackPeriod = implementationCost / monthlySavings
    const roi12Months = ((annualSavings - implementationCost) / implementationCost) * 100
    
    // Additional benefits
    const additionalBenefits = [
      '10x faster agent response times',
      'Reduced customer support volume',
      'Improved agent accuracy (62% → 98%)',
      'Better user experience',
      'Reduced server load',
      'Future-proof agent compatibility'
    ]

    const calculatedResults: ROIResults = {
      currentMonthlyCost,
      mcpMonthlyCost,
      monthlySavings,
      annualSavings,
      implementationCost,
      paybackPeriod,
      roi12Months,
      tokenSavingsPercent: mcpTokenReduction * 100,
      timeSavingsPercent: 90.4, // From our performance metrics
      additionalBenefits
    }

    setResults(calculatedResults)
    
    // Track calculation
    trackToolUsage('roi_calculator', 'calculate_roi', true)
    trackEvent('ROI Calculator', {
      industry,
      monthly_interactions: inputs.monthlyAgentInteractions,
      calculated_annual_savings: annualSavings,
      roi_percentage: roi12Months,
      payback_months: paybackPeriod
    })
    
    if (roi12Months > 200) {
      trackConversionIntent('evaluation', 'high_roi_calculated')
    }
  }

  const applyIndustryPreset = (industryKey: string) => {
    const preset = industryPresets[industryKey as keyof typeof industryPresets]
    setInputs(prev => ({
      ...prev,
      monthlyAgentInteractions: preset.monthlyAgentInteractions,
      averageTokensPerInteraction: preset.averageTokensPerInteraction
    }))
    setIndustry(industryKey)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(Math.round(num))
  }

  // Auto-calculate when inputs change
  useEffect(() => {
    const timer = setTimeout(calculateROI, 500)
    return () => clearTimeout(timer)
  }, [inputs])

  return (
    <section className="max-w-5xl mx-auto bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Calculator className="w-4 h-4" />
          ROI Calculator
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          💰 Calculate Your MCP Savings
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          See how much money and time your organization can save by implementing 
          MCP feeds instead of traditional agent HTML scraping.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Input Panel */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📊 Your Business Parameters
          </h3>

          {/* Industry Presets */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry Quick Start:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(industryPresets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyIndustryPreset(key)}
                  className={`text-sm px-3 py-2 rounded border text-left ${
                    industry === key
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Core Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Agent Interactions
              </label>
              <input
                type="number"
                value={inputs.monthlyAgentInteractions}
                onChange={(e) => setInputs(prev => ({
                  ...prev,
                  monthlyAgentInteractions: parseInt(e.target.value) || 0
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="10000"
              />
              <p className="text-xs text-gray-500 mt-1">
                How many times per month do AI agents interact with your content?
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Average Tokens per Interaction
              </label>
              <input
                type="number"
                value={inputs.averageTokensPerInteraction}
                onChange={(e) => setInputs(prev => ({
                  ...prev,
                  averageTokensPerInteraction: parseInt(e.target.value) || 0
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="8000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Typical tokens needed for agents to understand your pages
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Token Cost (per 1K tokens)
              </label>
              <input
                type="number"
                step="0.001"
                value={inputs.tokenCostPer1K}
                onChange={(e) => setInputs(prev => ({
                  ...prev,
                  tokenCostPer1K: parseFloat(e.target.value) || 0
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.002"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your current cost per 1,000 tokens (e.g., GPT-4: $0.002)
              </p>
            </div>

            {/* Advanced Inputs */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {showAdvanced ? '▼' : '▶'} Advanced Parameters
              </button>
              
              {showAdvanced && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Developer Hourly Rate
                    </label>
                    <input
                      type="number"
                      value={inputs.developerHourlyRate}
                      onChange={(e) => setInputs(prev => ({
                        ...prev,
                        developerHourlyRate: parseInt(e.target.value) || 0
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="120"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hours for MCP Implementation
                    </label>
                    <input
                      type="number"
                      value={inputs.hoursSpentOnAgentIntegration}
                      onChange={(e) => setInputs(prev => ({
                        ...prev,
                        hoursSpentOnAgentIntegration: parseInt(e.target.value) || 0
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="40"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Your ROI Analysis
          </h3>

          {results && (
            <div className="space-y-6">
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {formatCurrency(results.currentMonthlyCost)}
                  </div>
                  <div className="text-sm text-red-700">Current Monthly Cost</div>
                  <div className="text-xs text-red-600 mt-1">HTML Scraping</div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatCurrency(results.mcpMonthlyCost)}
                  </div>
                  <div className="text-sm text-green-700">MCP Monthly Cost</div>
                  <div className="text-xs text-green-600 mt-1">Structured Feeds</div>
                </div>
              </div>

              {/* Savings Highlights */}
              <div className="bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {formatCurrency(results.annualSavings)}
                  </div>
                  <div className="text-lg font-semibold text-green-800">Annual Savings</div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-blue-600">
                      {results.roi12Months.toFixed(0)}%
                    </div>
                    <div className="text-xs text-blue-700">12-Month ROI</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-600">
                      {results.paybackPeriod.toFixed(1)}
                    </div>
                    <div className="text-xs text-purple-700">Payback (months)</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-600">
                      {results.tokenSavingsPercent.toFixed(1)}%
                    </div>
                    <div className="text-xs text-green-700">Token Savings</div>
                  </div>
                </div>
              </div>

              {/* Implementation Details */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">💼 Implementation Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">One-time implementation cost:</span>
                    <span className="font-medium">{formatCurrency(results.implementationCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly savings:</span>
                    <span className="font-medium text-green-600">{formatCurrency(results.monthlySavings)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Break-even point:</span>
                    <span className="font-medium">{results.paybackPeriod.toFixed(1)} months</span>
                  </div>
                </div>
              </div>

              {/* Additional Benefits */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">🚀 Additional Benefits</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  {results.additionalBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      {results && results.roi12Months > 100 && (
        <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-6 text-center">
          <h4 className="text-xl font-bold mb-2">
            🎉 Strong Business Case Detected!
          </h4>
          <p className="mb-4 opacity-90">
            With {results.roi12Months.toFixed(0)}% ROI and {formatCurrency(results.annualSavings)} annual savings, 
            MCP implementation is a clear win for your organization.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/tools/prompt"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              onClick={() => trackConversionIntent('implementation', 'roi_calculator_high_value')}
            >
              🛠️ Start Implementation
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              onClick={() => trackConversionIntent('evaluation', 'roi_calculator_contact')}
            >
              💬 Speak with Expert
            </a>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>
          * Calculations based on industry averages and WellKnownMCP performance benchmarks. 
          Actual results may vary depending on your specific use case and implementation.
        </p>
      </div>
    </section>
  )
}