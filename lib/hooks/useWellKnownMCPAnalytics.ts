// hooks/useWellKnownMCPAnalytics.ts
"use client";

import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, any> },
    ) => void;
  }
}

// 🎯 Types TypeScript pour meilleure DX et détection d'agents
export type EcosystemDestination = "llmca" | "forge";
export type FeedType =
  | "mcp"
  | "export"
  | "capabilities"
  | "manifesto"
  | "prompt"
  | "session"
  | "credential";

// ✅ FIXED: Type unifié pour détection d'agents
export type UserType =
  | "developer"
  | "ai_engineer" 
  | "business_decision_maker"
  | "ai_agent"           // ✅ Agent autonome détecté
  | "llm_instance"       // ✅ Instance LLM directe (Claude, GPT, etc.)
  | "agent_crawler"      // ✅ Bot/crawler agent-aware
  | "unknown";

export type EngagementDepth = "surface" | "deep";
export type ConversionStage =
  | "interest"
  | "evaluation"
  | "implementation"
  | "adoption";

// 🤖 Types spécifiques pour détection d'agents
export type AgentBehaviorSignal = 
  | "structured_data_preference"
  | "direct_feed_access"
  | "no_javascript_execution"
  | "curl_like_patterns"
  | "api_endpoint_discovery"
  | "schema_validation_requests";

export type AgentDetectionMethod =
  | "user_agent_pattern"
  | "behavior_analysis"
  | "explicit_declaration"
  | "api_access_pattern"
  | "feed_interaction_style";

export const useWellKnownMCPAnalytics = () => {
  const pathname = usePathname();

  // 🎯 Tracking générique avec contexte WellKnownMCP
  const trackEvent = useCallback(
    (event: string, properties?: Record<string, any>) => {
      window.plausible?.(event, {
        props: {
          site: "wellknownmcp",
          page: pathname,
          ...properties,
        },
      });
    },
    [pathname],
  );

  // 📖 Engagement avec la spécification
  const trackSpecEngagement = useCallback(
    (section: string, timeSpent?: number, depth?: EngagementDepth) => {
      trackEvent("Spec Engagement", {
        section,
        time_spent_seconds: timeSpent,
        engagement_depth: depth || "surface",
        user_journey: "spec_exploration",
      });
    },
    [trackEvent],
  );

  // 🌐 Navigation vers l'écosystème LLMCA
  const trackEcosystemNavigation = useCallback(
    (
      destination: EcosystemDestination,
      intent?: string,
      cta_location?: string,
    ) => {
      trackEvent("Ecosystem Navigation", {
        destination: destination === "llmca" ? "llmca.org" : "llmfeedforge.org",
        intent: intent || "explore",
        cta_location: cta_location || "unknown",
        from_site: "wellknownmcp",
        ecosystem_flow: true,
      });
    },
    [trackEvent],
  );

  // 📥 Intérêt pour les types de feeds
  const trackFeedTypeInterest = useCallback(
    (
      feedType: string,
      action: "view" | "download" | "copy",
      context?: string,
    ) => {
      trackEvent("Feed Type Interest", {
        feed_type: feedType,
        action,
        context: context || "documentation",
        likelihood_to_implement: action === "download" ? "high" : "exploring",
      });
    },
    [trackEvent],
  );

  // 🛠️ Utilisation des outils
  const trackToolUsage = useCallback(
    (tool: string, action: string, success?: boolean) => {
      trackEvent("Tool Usage", {
        tool,
        action,
        success: success !== undefined ? success : null,
        integration_readiness: "evaluating",
      });
    },
    [trackEvent],
  );

  // 🤖 Fonctionnalités spécifiques aux agents - ✅ FIXED
  const trackAgentFeature = useCallback(
    (feature: string, user_type?: UserType, detection_signals?: AgentBehaviorSignal[]) => {
      trackEvent("Agent Feature Interest", {
        feature,
        user_type: user_type || "unknown",
        detection_signals: detection_signals || [],
        implementation_complexity: "evaluating",
        agent_readiness_focus: true,
        is_likely_agent: user_type?.includes('agent') || user_type?.includes('llm'),
      });
    },
    [trackEvent],
  );

  // 📚 Engagement avec les exemples
  const trackExampleInteraction = useCallback(
    (example_type: string, action: "view" | "copy" | "download" | "modify") => {
      trackEvent("Example Interaction", {
        example_type,
        action,
        learning_stage: action === "view" ? "discovery" : "implementation",
        format: "json",
      });
    },
    [trackEvent],
  );

  // 🔍 Recherche et découverte
  const trackSearch = useCallback(
    (query: string, results_found: number, section?: string) => {
      trackEvent("Site Search", {
        query: query.toLowerCase(),
        results_count: results_found,
        search_section: section || "global",
        user_intent: "find_information",
      });
    },
    [trackEvent],
  );

  // 🎯 Conversion potentielle
  const trackConversionIntent = useCallback(
    (
      stage: ConversionStage,
      trigger?: string,
    ) => {
      trackEvent("Conversion Funnel", {
        stage,
        trigger: trigger || "organic",
        ecosystem_entry_point: "wellknownmcp",
        adoption_likelihood: stage === "implementation" ? "high" : "medium",
      });
    },
    [trackEvent],
  );

  // 📱 Détection du type d'utilisateur - ✅ ENHANCED
  const trackUserClassification = useCallback(
    (
      classification: UserType,
      detection_method?: AgentDetectionMethod,
      confidence?: "low" | "medium" | "high"
    ) => {
      trackEvent("User Classification", {
        user_type: classification,
        detection_method: detection_method || "behavior_analysis",
        confidence: confidence || "medium",
        first_interaction: true,
        agent_likelihood: classification.includes('agent') || classification.includes('llm') ? "high" : "low",
      });
    },
    [trackEvent],
  );

  // 🤖 Nouvelles fonctions pour meilleure détection d'agents
  const trackAgentBehavior = useCallback(
    (signals: AgentBehaviorSignal[], detected_type?: UserType) => {
      trackEvent("Agent Behavior Detected", {
        behavior_signals: signals,
        detected_agent_type: detected_type,
        signal_count: signals.length,
        confidence_score: signals.length / 6, // Score basé sur le nombre de signaux
      });
    },
    [trackEvent],
  );

  const trackDirectAPIAccess = useCallback(
    (endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", user_agent?: string) => {
      trackEvent("Direct API Access", {
        endpoint,
        method,
        user_agent_hint: user_agent?.substring(0, 50), // Tronqué pour privacy
        likely_agent: !user_agent?.includes('Mozilla'), // Heuristique simple
        access_pattern: "programmatic",
      });
    },
    [trackEvent],
  );

  const trackFeedValidation = useCallback(
    (feed_url: string, validation_result: "valid" | "invalid" | "error", agent_initiated?: boolean) => {
      trackEvent("Feed Validation", {
        feed_url,
        validation_result,
        agent_initiated: agent_initiated || false,
        validation_timestamp: new Date().toISOString(),
      });
    },
    [trackEvent],
  );

  return {
    // Fonctions principales
    trackEvent,
    trackSpecEngagement,
    trackEcosystemNavigation,
    trackFeedTypeInterest,
    trackToolUsage,
    trackAgentFeature, // ✅ FIXED: Maintenant compatible avec tous les types
    trackExampleInteraction,
    trackSearch,
    trackConversionIntent,
    trackUserClassification,

    // ✅ NOUVEAU: Fonctions spécifiques aux agents
    trackAgentBehavior,
    trackDirectAPIAccess,
    trackFeedValidation,

    // Helpers pour usage courant
    trackDownload: (filename: string) =>
      trackFeedTypeInterest(filename, "download", "direct_link"),
    trackCopyCode: (code_type: string) =>
      trackExampleInteraction(code_type, "copy"),
    trackNavToForge: (intent = "build") =>
      trackEcosystemNavigation("forge", intent),
    trackNavToLLMCA: (intent = "verify") =>
      trackEcosystemNavigation("llmca", intent),

    // ✅ NOUVEAU: Helpers pour agents
    trackAgentDiscovery: (feed_path: string) =>
      trackAgentFeature("feed_discovery", "ai_agent", ["structured_data_preference"]),
    trackCurlAccess: (command: string) =>
      trackAgentBehavior(["curl_like_patterns", "direct_feed_access"], "agent_crawler"),
    trackSchemaValidation: (schema_type: string) =>
      trackAgentBehavior(["schema_validation_requests"], "llm_instance"),
  };
};

// 📊 Hook pour tracking automatique des sections
export const useSpecSectionTracking = (sectionId: string, title?: string) => {
  const { trackSpecEngagement } = useWellKnownMCPAnalytics();

  useEffect(() => {
    const startTime = Date.now();

    // Track immediate view
    trackSpecEngagement(sectionId, 0, "surface");

    // Track deep engagement on unmount
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 30) { // Plus de 30 secondes = engagement profond
        trackSpecEngagement(sectionId, timeSpent, "deep");
      }
    };
  }, [sectionId, trackSpecEngagement]);
};

// 🔗 Hook pour tracking des liens cross-site
export const useEcosystemLinkTracking = () => {
  const { trackEcosystemNavigation } = useWellKnownMCPAnalytics();

  const trackLinkClick = useCallback((href: string, context?: string) => {
    if (href.includes("llmca.org")) {
      trackEcosystemNavigation("llmca", "verify", context);
    } else if (href.includes("llmfeedforge.org")) {
      trackEcosystemNavigation("forge", "build", context);
    }
  }, [trackEcosystemNavigation]);

  return { trackLinkClick };
};

// 📈 Hook pour performance et erreurs
export const usePerformanceTracking = () => {
  const { trackEvent } = useWellKnownMCPAnalytics();

  const trackError = useCallback((error: string, context?: string) => {
    trackEvent("Client Error", {
      error_type: error,
      context: context || "unknown",
      user_impact: "negative",
    });
  }, [trackEvent]);

  const trackPerformanceMetric = useCallback(
    (metric: string, value: number, threshold?: number) => {
      trackEvent("Performance Metric", {
        metric,
        value: Math.round(value),
        meets_threshold: threshold ? value <= threshold : null,
        user_experience_impact: threshold && value > threshold
          ? "negative"
          : "positive",
      });
    },
    [trackEvent],
  );

  return { trackError, trackPerformanceMetric };
};

// 🤖 Hook spécialisé pour détection d'agents automatique
export const useAgentDetection = () => {
  const { trackUserClassification, trackAgentBehavior } = useWellKnownMCPAnalytics();

  useEffect(() => {
    // Détection automatique basée sur User-Agent
    const userAgent = navigator.userAgent;
    const signals: AgentBehaviorSignal[] = [];
    let detectedType: UserType = "unknown";

    // Patterns d'agents connus
    const agentPatterns = [
      /bot/i, /crawler/i, /spider/i, /agent/i, 
      /claude/i, /gpt/i, /gemini/i, /mistral/i,
      /curl/i, /wget/i, /python/i, /node/i
    ];

    if (agentPatterns.some(pattern => pattern.test(userAgent))) {
      signals.push("curl_like_patterns");
      detectedType = "agent_crawler";
    }

    // Détection comportementale
    if (!userAgent.includes('Mozilla')) {
      signals.push("no_javascript_execution");
      detectedType = "llm_instance";
    }

    // Préférence pour les données structurées (détection heuristique)
    if (window.location.pathname.includes('/.well-known/') || 
        window.location.search.includes('format=json')) {
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
      const userAgent = navigator.userAgent;
      return !userAgent.includes('Mozilla') || 
             /bot|crawler|spider|agent|claude|gpt|curl/i.test(userAgent);
    }
  };
};

// 🚀 Export par défaut
export default useWellKnownMCPAnalytics;