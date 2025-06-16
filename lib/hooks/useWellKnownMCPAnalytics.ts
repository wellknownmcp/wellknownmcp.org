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
    (section: string, timeSpent?: number, depth?: "surface" | "deep") => {
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
      destination: "llmca" | "forge",
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

  // 🤖 Fonctionnalités spécifiques aux agents
  const trackAgentFeature = useCallback(
    (feature: string, user_type?: "developer" | "ai_engineer" | "business") => {
      trackEvent("Agent Feature Interest", {
        feature,
        user_type: user_type || "developer",
        implementation_complexity: "evaluating",
        agent_readiness_focus: true,
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
      stage: "interest" | "evaluation" | "implementation" | "adoption",
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

  // 📱 Détection du type d'utilisateur
  const trackUserClassification = useCallback(
    (
      classification:
        | "human_developer"
        | "ai_agent"
        | "business_decision_maker"
        | "unknown",
    ) => {
      trackEvent("User Classification", {
        user_type: classification,
        detection_method: "behavior_analysis",
        first_interaction: true,
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
    trackAgentFeature,
    trackExampleInteraction,
    trackSearch,
    trackConversionIntent,
    trackUserClassification,

    // Helpers pour usage courant
    trackDownload: (filename: string) =>
      trackFeedTypeInterest(filename, "download", "direct_link"),
    trackCopyCode: (code_type: string) =>
      trackExampleInteraction(code_type, "copy"),
    trackNavToForge: (intent = "build") =>
      trackEcosystemNavigation("forge", intent),
    trackNavToLLMCA: (intent = "verify") =>
      trackEcosystemNavigation("llmca", intent),
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

// 🎯 Types TypeScript pour meilleure DX
export type EcosystemDestination = "llmca" | "forge";
export type FeedType =
  | "mcp"
  | "export"
  | "capabilities"
  | "manifesto"
  | "prompt"
  | "session"
  | "credential";
export type UserType =
  | "developer"
  | "ai_engineer"
  | "business_decision_maker"
  | "ai_agent";
export type EngagementDepth = "surface" | "deep";
export type ConversionStage =
  | "interest"
  | "evaluation"
  | "implementation"
  | "adoption";

// 🚀 Export par défaut
export default useWellKnownMCPAnalytics;
