// lib/hooks/useWellKnownMCPAnalytics.ts
"use client";

import { useCallback, useEffect } from "react";

// Types nécessaires
export type UserType = "developer" | "ai_engineer" | "business_decision_maker" | "ai_agent" | "llm_instance" | "agent_crawler" | "unknown";
export type ConversionStage = "interest" | "evaluation" | "implementation" | "adoption";
export type EngagementDepth = "surface" | "deep";
export type EcosystemDestination = "llmca" | "forge";
export type AgentBehaviorSignal = "structured_data_preference" | "direct_feed_access" | "no_javascript_execution" | "curl_like_patterns" | "api_endpoint_discovery" | "schema_validation_requests";
export type AgentDetectionMethod = "user_agent_pattern" | "behavior_analysis" | "explicit_declaration" | "api_access_pattern" | "feed_interaction_style";

// Déclaration Plausible
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}

export function useWellKnownMCPAnalytics() {
  console.log('🔍 Analytics hook with Plausible + Agent Detection');

  // 🎯 Fonction principale de tracking
  const trackEvent = useCallback((event: string, properties?: Record<string, any>) => {
    // Development logs
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event, properties);
    }
    
    // Plausible tracking
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(event, {
        props: {
          site: "wellknownmcp",
          ...properties,
        }
      });
    }
  }, []);

  // 🤖 Détection d'agents avec détails
  const detectAgentType = useCallback(() => {
    if (typeof window === 'undefined') return null;

    const userAgent = navigator.userAgent.toLowerCase();
    const referrer = document.referrer.toLowerCase();
    
    // Patterns d'agents spécifiques
    const agentPatterns = {
      'claude': /claude/i,
      'gpt': /gpt|openai/i, 
      'curl': /curl/i,
      'wget': /wget/i,
      'python': /python|requests/i,
      'node': /node/i,
      'bot': /bot/i,
      'crawler': /crawler|spider/i,
      'anthropic': /anthropic/i,
      'perplexity': /perplexity/i,
      'brave_search': /brave/i
    };

    // Détection du type d'agent
    for (const [type, pattern] of Object.entries(agentPatterns)) {
      if (pattern.test(userAgent)) {
        return {
          type,
          userAgent: userAgent.substring(0, 100), // Limité pour privacy
          likely_automated: !userAgent.includes('mozilla'),
          referrer: referrer.substring(0, 50)
        };
      }
    }

    // Détection par référent
    if (referrer.includes('claude.ai')) return { type: 'claude_web', referrer };
    if (referrer.includes('openai.com')) return { type: 'gpt_web', referrer };
    if (referrer.includes('perplexity.ai')) return { type: 'perplexity_web', referrer };

    return null;
  }, []);

  // 🕷️ Track des accès d'agents
  const trackAgentAccess = useCallback(() => {
    const agentInfo = detectAgentType();
    
    if (agentInfo) {
      trackEvent('Agent Visit', {
        agent_type: agentInfo.type,
        user_agent_snippet: agentInfo.userAgent?.substring(0, 50),
        likely_automated: agentInfo.likely_automated || false,
        referrer: agentInfo.referrer || 'direct',
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        is_feed_access: window.location.pathname.includes('.llmfeed.json') || window.location.pathname.includes('.well-known/')
      });

      // Track spécifique pour les curls
      if (agentInfo.type === 'curl' || agentInfo.type === 'wget') {
        trackEvent('Curl Access', {
          tool: agentInfo.type,
          target: window.location.pathname,
          likely_developer: true
        });
      }

      // Track spécifique pour les search engines AI
      if (['brave_search', 'perplexity'].includes(agentInfo.type)) {
        trackEvent('AI Search Engine', {
          engine: agentInfo.type,
          indexing_attempt: true
        });
      }
    }
  }, [trackEvent, detectAgentType]);

  // 📁 Track des accès directs aux feeds
  const trackFeedAccess = useCallback((feedPath?: string) => {
    const path = feedPath || window.location.pathname;
    
    if (path.includes('.llmfeed.json') || path.includes('.well-known/')) {
      const agentInfo = detectAgentType();
      
      trackEvent('Direct Feed Access', {
        feed_path: path,
        agent_type: agentInfo?.type || 'unknown',
        access_method: agentInfo?.type === 'curl' ? 'curl' : 'browser',
        feed_type: path.includes('mcp.llmfeed.json') ? 'mcp' : 
                  path.includes('capabilities') ? 'capabilities' : 
                  path.includes('llm-index') ? 'index' : 'other'
      });
    }
  }, [trackEvent, detectAgentType]);

  // Auto-track à l'initialisation
  useEffect(() => {
    trackAgentAccess();
    trackFeedAccess();
  }, [trackAgentAccess, trackFeedAccess]);

  // 🎯 Fonctions principales (simplifiées)
  const trackConversionIntent = useCallback((stage: ConversionStage, trigger?: string) => {
    trackEvent('Conversion Intent', { stage, trigger });
  }, [trackEvent]);

  const trackAgentFeature = useCallback((feature: string, user_type?: UserType) => {
    trackEvent('Agent Feature Interest', { feature, user_type });
  }, [trackEvent]);

  const trackToolUsage = useCallback((tool: string, action: string, success?: boolean) => {
    trackEvent('Tool Usage', { tool, action, success });
  }, [trackEvent]);

  const trackFeedTypeInterest = useCallback((feedType: string, action: string, context?: string) => {
    trackEvent('Feed Type Interest', { feed_type: feedType, action, context });
  }, [trackEvent]);

  // 🔍 Helpers spécifiques aux agents
  const trackUserClassification = useCallback((classification: UserType, confidence?: "low" | "medium" | "high") => {
    trackEvent('User Classification', {
      user_type: classification,
      confidence,
      detection_method: 'automatic',
      agent_likelihood: classification.includes('agent') ? 'high' : 'low'
    });
  }, [trackEvent]);

  // Autres fonctions nécessaires (stubs)
  const trackSpecEngagement = useCallback((section: string, timeSpent?: number, depth?: EngagementDepth) => {
    trackEvent('Spec Engagement', { section, time_spent: timeSpent, depth });
  }, [trackEvent]);

  const trackEcosystemNavigation = useCallback((destination: EcosystemDestination, intent?: string, cta_location?: string) => {
    trackEvent('Ecosystem Navigation', { destination, intent, cta_location });
  }, [trackEvent]);

  const trackExampleInteraction = useCallback((example_type: string, action: string) => {
    trackEvent('Example Interaction', { example_type, action });
  }, [trackEvent]);

  const trackSearch = useCallback((query: string, results_found: number, section?: string) => {
    trackEvent('Site Search', { query, results_count: results_found, section });
  }, [trackEvent]);

  const trackAgentBehavior = useCallback((signals: AgentBehaviorSignal[], detected_type?: UserType) => {
    trackEvent('Agent Behavior', { signals, detected_type, signal_count: signals.length });
  }, [trackEvent]);

  const trackDirectAPIAccess = useCallback((endpoint: string, method: string, user_agent?: string) => {
    trackEvent('Direct API Access', { endpoint, method, user_agent: user_agent?.substring(0, 50) });
  }, [trackEvent]);

  const trackFeedValidation = useCallback((feed_url: string, validation_result: string, agent_initiated?: boolean) => {
    trackEvent('Feed Validation', { feed_url, validation_result, agent_initiated });
  }, [trackEvent]);

  // Helpers
  const trackDownload = useCallback((filename: string) => {
    trackFeedTypeInterest(filename, "download", "direct_link");
  }, [trackFeedTypeInterest]);

  const trackCopyCode = useCallback((code_type: string) => {
    trackExampleInteraction(code_type, "copy");
  }, [trackExampleInteraction]);

  const trackNavToForge = useCallback((intent = "build") => {
    trackEcosystemNavigation("forge", intent);
  }, [trackEcosystemNavigation]);

  const trackNavToLLMCA = useCallback((intent = "verify") => {
    trackEcosystemNavigation("llmca", intent);
  }, [trackEcosystemNavigation]);

  const trackAgentDiscovery = useCallback((feed_path: string) => {
    trackAgentFeature("feed_discovery", "ai_agent");
  }, [trackAgentFeature]);

  const trackCurlAccess = useCallback((command: string) => {
    trackAgentBehavior(["curl_like_patterns"], "agent_crawler");
  }, [trackAgentBehavior]);

  const trackSchemaValidation = useCallback((schema_type: string) => {
    trackAgentBehavior(["schema_validation_requests"], "llm_instance");
  }, [trackAgentBehavior]);

  return {
    // Fonctions principales
    trackEvent,
    trackSpecEngagement,
    trackEcosystemNavigation,
    trackFeedTypeInterest,
    trackToolUsage,
    trackAgentFeature,
    trackExampleInteraction,
    trackSearch,
    trackConversionIntent,
    trackUserClassification,

    // Fonctions spécifiques aux agents
    trackAgentBehavior,
    trackDirectAPIAccess,
    trackFeedValidation,
    trackAgentAccess,
    trackFeedAccess,

    // Helpers
    trackDownload,
    trackCopyCode,
    trackNavToForge,
    trackNavToLLMCA,
    trackAgentDiscovery,
    trackCurlAccess,
    trackSchemaValidation,

    // Utilitaires
    detectAgentType,
  };
}

// Hooks auxiliaires simplifiés
export function useSpecSectionTracking(sectionId: string, title?: string) {
  const { trackSpecEngagement } = useWellKnownMCPAnalytics();

  useEffect(() => {
    const startTime = Date.now();
    trackSpecEngagement(sectionId, 0, "surface");

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 30) {
        trackSpecEngagement(sectionId, timeSpent, "deep");
      }
    };
  }, [sectionId, trackSpecEngagement]);
}

export function useEcosystemLinkTracking() {
  const { trackEcosystemNavigation } = useWellKnownMCPAnalytics();

  const trackLinkClick = useCallback((href: string, context?: string) => {
    if (href.includes("llmca.org")) {
      trackEcosystemNavigation("llmca", "verify", context);
    } else if (href.includes("llmfeedforge.org")) {
      trackEcosystemNavigation("forge", "build", context);
    }
  }, [trackEcosystemNavigation]);

  return { trackLinkClick };
}

export function usePerformanceTracking() {
  const { trackEvent } = useWellKnownMCPAnalytics();

  const trackError = useCallback((error: string, context?: string) => {
    trackEvent("Client Error", { error_type: error, context: context || "unknown" });
  }, [trackEvent]);

  const trackPerformanceMetric = useCallback((metric: string, value: number, threshold?: number) => {
    trackEvent("Performance Metric", { metric, value: Math.round(value), meets_threshold: threshold ? value <= threshold : null });
  }, [trackEvent]);

  return { trackError, trackPerformanceMetric };
}

export function useAgentDetection() {
  const { trackUserClassification, trackAgentBehavior, detectAgentType } = useWellKnownMCPAnalytics();

  useEffect(() => {
    const agentInfo = detectAgentType();
    
    if (agentInfo) {
      const userType: UserType = agentInfo.type.includes('curl') ? 'agent_crawler' :
                                agentInfo.type.includes('gpt') ? 'llm_instance' :
                                agentInfo.type.includes('claude') ? 'llm_instance' :
                                'ai_agent';
      
      trackUserClassification(userType, "high");
      trackAgentBehavior(["structured_data_preference"], userType);
    }
  }, [trackUserClassification, trackAgentBehavior, detectAgentType]);

  return {
    isLikelyAgent: () => {
      const agentInfo = detectAgentType();
      return !!agentInfo;
    }
  };
}

export default useWellKnownMCPAnalytics;