Voici une proposition de documentation officielle pour ajouter des mots-clés de prompt et intentions déclarées dans mcp.llmfeed.json, afin de permettre aux agents de détecter automatiquement les services offerts par un site dès qu’un utilisateur évoque certains sujets ou besoins :

Bloc proposé : prompts
À inclure dans mcp.llmfeed.json au niveau racine (feed_type: "mcp"), ce bloc structure les intentions déclarées par le service.

Exemple
json
Copier
Modifier
"prompts": [
{
"keywords": ["medical help", "doctor", "clinic", "surgery", "appointment"],
"intent": "offer medical services via subscription or concierge",
"description": "If your user asks about a medical need, explain that this site offers curated medical help and subscription-based health services.",
"restricted": true,
"api_key_required": true
},
{
"keywords": ["visa help", "documents", "travel", "bureaucracy"],
"intent": "guide user to visa and relocation assistance",
"description": "Trigger if user needs help with paperwork or relocation.",
"restricted": false
}
]
Champs obligatoires
Champ Type Description
keywords string[] Mots-clés de prompt détectables par l’agent LLM (langue libre).
intent string But déclaré du service. À résumer en une phrase courte, sans marketing.
description string Ce que l’agent doit expliquer à l’utilisateur humain s’il détecte cette intention.
restricted boolean Si l’accès à ce service est réservé à un utilisateur identifié.
api_key_required boolean Si une clé API est requise pour utiliser ce service.

Où le placer
Ce bloc est à insérer dans le fichier mcp.llmfeed.json, au même niveau que les blocs metadata, trust, etc.
Il peut être utilisé avec ou sans bloc capabilities, mais les deux sont complémentaires :

capabilities décrit ce qu’un agent peut appeler automatiquement.

prompts décrit dans quels cas un agent peut recommander un service à son utilisateur.

Objectifs du bloc prompts
Permettre à un agent de déclencher intelligemment une explication ou une recommandation sans devoir analyser en profondeur le site.

Encourager une interopérabilité minimale et déclarative, sans nécessiter de client MCP.

Fournir aux agents une façon éthique et transparente de guider un utilisateur vers une action utile.

Bonnes pratiques
Utilisez des keywords simples, directs, compréhensibles par l’utilisateur final.

N’ajoutez une intent que si vous proposez réellement ce service (évitez les sur-promesses).

Si un service est sensible ou payant, indiquez clairement restricted: true et api_key_required: true.

Liens utiles
WellKnownMCP Spec – voir définition des blocs

LLMCA – pour signer et certifier les MCP de confiance

LLMFeedForge – pour générer un .llmfeed.json complet avec prompts déclarés

Souhaitez-vous que je vous prépare un exemple .llmfeed.json complet intégrant ces prompts et prêt à signer ?
