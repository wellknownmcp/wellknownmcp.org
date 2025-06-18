// lib/hooks/useWellKnownMCPAnalytics.ts
"use client";

import { useCallback, useEffect } from "react";

// 🎯 Tous les types nécessaires
export type EcosystemDestination = "llmca" | "forge";
export type FeedType = "mcp" | "export" | "capabilities" | "manifesto" | "prompt" | "session" | "credential";
export type UserType = "developer" | "ai_engineer" | "business_decision_maker" | "ai_agent" | "llm_instance" | "agent_crawler" | "unknown";
export type EngagementDepth = "surface" | "deep";
export type ConversionStage = "interest" | "evaluation" | "implementation" | "adoption";
export type AgentBehaviorSignal = "structured_data_preference" | "direct_feed_access" | "no_javascript_execution" | "curl_like_patterns" | "api_endpoint_discovery" | "schema_validation_requests";
export type AgentDetectionMethod = "user_agent_pattern" | "behavior_analysis" | "explicit_declaration" | "api_access_pattern" | "feed_interaction_style";

// 🚀 VRAI Hook React (pas une fonction qui retourne un hook)
export function useWellKnownMCPAnalytics() {
  console.log('🔍 Analytics hook utilisé correctement');

  const trackEvent = useCallback((event: string, properties?: Record<string, any>) => {
    console.log('📊 Analytics Event:', event, properties);
  }, []);

  const trackSpecEngagement = useCallback((section: string, timeSpent?: number, depth?: EngagementDepth) => {
    console.log('📖 Spec Engagement:', section, timeSpent, depth);
  }, []);

  const trackEcosystemNavigation = useCallback((destination: EcosystemDestination, intent?: string, cta_location?: string) => {
    console.log('🌐 Ecosystem Navigation:', destination, intent, cta_location);
  }, []);

  const trackFeedTypeInterest = useCallback((feedType: string, action: "view" | "download" | "copy", context?: string) => {
    console.log('📥 Feed Type Interest:', feedType, action, context);
  }, []);

  const trackToolUsage = useCallback((tool: string, action: string, success?: boolean) => {
    console.log('🛠️ Tool Usage:', tool, action, success);
  }, []);

  const trackAgentFeature = useCallback((feature: string, user_type?: UserType, detection_signals?: AgentBehaviorSignal[]) => {
    console.log('🤖 Agent Feature:', feature, user_type, detection_signals);
  }, []);

  const trackExampleInteraction = useCallback((example_type: string, action: "view" | "copy" | "download" | "modify") => {
    console.log('📚 Example Interaction:', example_type, action);
  }, []);

  const trackSearch = useCallback((query: string, results_found: number, section?: string) => {
    console.log('🔍 Search:', query, results_found, section);
  }, []);

  const trackConversionIntent = useCallback((stage: ConversionStage, trigger?: string) => {
    console.log('🎯 Conversion Intent:', stage, trigger);
  }, []);

  const trackUserClassification = useCallback((classification: UserType, detection_method?: AgentDetectionMethod, confidence?: "low" | "medium" | "high") => {
    console.log('📱 User Classification:', classification, detection_method, confidence);
  }, []);

  const trackAgentBehavior = useCallback((signals: AgentBehaviorSignal[], detected_type?: UserType) => {
    console.log('🤖 Agent Behavior:', signals, detected_type);
  }, []);

  const trackDirectAPIAccess = useCallback((endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", user_agent?: string) => {
    console.log('📡 Direct API Access:', endpoint, method, user_agent);
  }, []);

  const trackFeedValidation = useCallback((feed_url: string, validation_result: "valid" | "invalid" | "error", agent_initiated?: boolean) => {
    console.log('✅ Feed Validation:', feed_url, validation_result, agent_initiated);
  }, []);

  // Helpers avec useCallback
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
    trackAgentFeature("feed_discovery", "ai_agent", ["structured_data_preference"]);
  }, [trackAgentFeature]);

  const trackCurlAccess = useCallback((command: string) => {
    trackAgentBehavior(["curl_like_patterns", "direct_feed_access"], "agent_crawler");
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

    // Helpers
    trackDownload,
    trackCopyCode,
    trackNavToForge,
    trackNavToLLMCA,
    trackAgentDiscovery,
    trackCurlAccess,
    trackSchemaValidation,
  };
}

// 📊 Hooks auxiliaires
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
    trackEvent("Client Error", { error_type: error, context: context || "unknown", user_impact: "negative" });
  }, [trackEvent]);

  const trackPerformanceMetric = useCallback((metric: string, value: number, threshold?: number) => {
    trackEvent("Performance Metric", {
      metric,
      value: Math.round(value),
      meets_threshold: threshold ? value <= threshold : null,
      user_experience_impact: threshold && value > threshold ? "negative" : "positive",
    });
  }, [trackEvent]);

  return { trackError, trackPerformanceMetric };
}

export function useAgentDetection() {
  const { trackUserClassification, trackAgentBehavior } = useWellKnownMCPAnalytics();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const userAgent = navigator.userAgent;
    const signals: AgentBehaviorSignal[] = [];
    let detectedType: UserType = "unknown";

    const agentPatterns = [/bot/i, /crawler/i, /spider/i, /agent/i, /claude/i, /gpt/i, /gemini/i, /mistral/i, /curl/i, /wget/i, /python/i, /node/i];

    if (agentPatterns.some(pattern => pattern.test(userAgent))) {
      signals.push("curl_like_patterns");
      detectedType = "agent_crawler";
    }

    if (!userAgent.includes('Mozilla')) {
      signals.push("no_javascript_execution");
      detectedType = "llm_instance";
    }

    if (window.location.pathname.includes('/.well-known/') || window.location.search.includes('format=json')) {
      signals.push("structured_data_preference");
      detectedType = "ai_agent";
    }

    if (signals.length > 0) {
      trackUserClassification(detectedType, "user_agent_pattern", "medium");
      trackAgentBehavior(signals, detectedType);
    }
  }, [trackUserClassification, trackAgentBehavior]);

  return {
    isLikelyAgent: () => {
      if (typeof window === 'undefined') return false;
      const userAgent = navigator.userAgent;
      return !userAgent.includes('Mozilla') || /bot|crawler|spider|agent|claude|gpt|curl/i.test(userAgent);
    }
  };
}

// Export par défaut pour compatibilité
export default useWellKnownMCPAnalytics;

// Test d'export
console.log('🚀 Analytics hook défini correctement, type:', typeof useWellKnownMCPAnalytics);