// utils/analytics-salt.ts — Gestionnaire de Salt Sécurisé

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';

export class AnalyticsSaltManager {
  
  /**
   * 🔧 Stratégie principale: Auto-génération avec persistence
   * Recommandée pour la plupart des cas d'usage
   */
  static getOrCreateSalt(): string {
    // 1. Essayer la variable d'environnement (priorité maximale)
    if (process.env.ANALYTICS_SALT) {
      console.log('✅ Using ANALYTICS_SALT from environment');
      return process.env.ANALYTICS_SALT;
    }

    // 2. Essayer de lire depuis un fichier persistant
    const saltFilePath = join(process.cwd(), '.analytics-salt');
    if (existsSync(saltFilePath)) {
      try {
        const savedSalt = readFileSync(saltFilePath, 'utf-8').trim();
        if (savedSalt && savedSalt.length > 10) {
          console.log('✅ Using saved ANALYTICS_SALT from file');
          return savedSalt;
        }
      } catch (error) {
        console.warn('⚠️ Failed to read saved salt file:', error.message);
      }
    }

    // 3. Générer un nouveau salt et le sauvegarder
    const newSalt = this.generateSecureSalt();
    try {
      writeFileSync(saltFilePath, newSalt);
      console.log('🔐 Generated new ANALYTICS_SALT and saved to file');
      console.log('💡 Recommendation: Add to .env.local for better security:');
      console.log(`   ANALYTICS_SALT="${newSalt}"`);
    } catch (error) {
      console.warn('⚠️ Failed to save salt file:', error.message);
      console.warn('💡 Consider setting ANALYTICS_SALT in environment variables');
    }

    return newSalt;
  }

  /**
   * 🔐 Stratégie stricte: Fail fast si pas de salt
   * Recommandée pour la production avec monitoring
   */
  static getStrictSalt(): string {
    if (!process.env.ANALYTICS_SALT) {
      throw new Error(`
🚨 ANALYTICS_SALT environment variable is required!

Quick fix:
1. Add to .env.local:
   ANALYTICS_SALT="wellknownmcp_$(openssl rand -hex 32)"

2. Or generate one:
   node -e "console.log('ANALYTICS_SALT=wellknownmcp_' + require('crypto').randomBytes(32).toString('hex'))"

Security: Without a unique salt, IP hashing is vulnerable to rainbow table attacks.
      `);
    }
    return process.env.ANALYTICS_SALT;
  }

  /**
   * 🎲 Stratégie runtime: Génération basée sur l'environnement
   * Moins sécurisé mais fonctionnel pour le développement
   */
  static getRuntimeSalt(): string {
    if (process.env.ANALYTICS_SALT) {
      return process.env.ANALYTICS_SALT;
    }

    // Générer basé sur des propriétés du système (consistent entre redémarrages)
    const hostname = process.env.HOSTNAME || process.env.COMPUTERNAME || 'localhost';
    const nodeVersion = process.version;
    const platform = process.platform;
    
    // Utiliser un hash basé sur des propriétés système stables
    const systemFingerprint = `${hostname}_${nodeVersion}_${platform}`;
    const runtimeSalt = `wellknownmcp_runtime_${Buffer.from(systemFingerprint).toString('base64')}`;
    
    console.warn(`
⚠️ Using runtime-generated ANALYTICS_SALT
🔐 Security: Moderate (consistent within deployment)
💡 Recommendation: Set ANALYTICS_SALT in environment variables
    `);

    return runtimeSalt;
  }

  /**
   * 🔄 Stratégie rotation: Salt qui change périodiquement
   * Pour les environnements avec politique de rotation des secrets
   */
  static getRotatingSalt(): string {
    const baseSalt = process.env.ANALYTICS_SALT || this.generateSecureSalt();
    
    // Rotation mensuelle basée sur la date
    const currentMonth = new Date().toISOString().slice(0, 7); // "2025-01"
    const rotatedSalt = `${baseSalt}_${currentMonth}`;
    
    console.log(`🔄 Using rotating salt for period: ${currentMonth}`);
    return rotatedSalt;
  }

  /**
   * 🧪 Mode développement avec avertissements appropriés
   */
  static getDevSalt(): string {
    if (process.env.NODE_ENV === 'production') {
      return this.getStrictSalt(); // Strict en production
    }

    // Mode dev: permissif avec avertissement
    const devSalt = process.env.ANALYTICS_SALT || 'wellknownmcp_dev_unsafe_salt';
    
    if (!process.env.ANALYTICS_SALT) {
      console.warn(`
🧪 DEV MODE: Using default ANALYTICS_SALT
⚠️ This is unsafe for production!
🔧 Set ANALYTICS_SALT in .env.local for realistic testing
      `);
    }

    return devSalt;
  }

  /**
   * 🛡️ Générateur de salt sécurisé
   */
  private static generateSecureSalt(): string {
    const randomPart = randomBytes(32).toString('hex');
    const timestamp = Date.now().toString(36);
    const prefix = 'wellknownmcp';
    return `${prefix}_${timestamp}_${randomPart}`;
  }

  /**
   * 🔍 Validation du salt
   */
  static validateSalt(salt: string): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    if (!salt) {
      issues.push('Salt is empty');
      return { valid: false, issues };
    }
    
    if (salt.length < 32) {
      issues.push('Salt is too short (minimum 32 characters)');
    }
    
    if (salt === 'wellknownmcp_dev_unsafe_salt') {
      issues.push('Using default development salt (unsafe for production)');
    }
    
    if (!salt.includes('wellknownmcp')) {
      issues.push('Salt should include project identifier for uniqueness');
    }
    
    if (!/[0-9a-f]{32}/.test(salt)) {
      issues.push('Salt should contain sufficient entropy (hex characters)');
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  /**
   * 📊 Info sur le salt actuel
   */
  static getSaltInfo(): {
    source: string;
    length: number;
    validation: { valid: boolean; issues: string[] };
    recommendations: string[];
  } {
    let salt: string;
    let source: string;

    if (process.env.ANALYTICS_SALT) {
      salt = process.env.ANALYTICS_SALT;
      source = 'environment_variable';
    } else {
      const saltFilePath = join(process.cwd(), '.analytics-salt');
      if (existsSync(saltFilePath)) {
        salt = readFileSync(saltFilePath, 'utf-8').trim();
        source = 'persistent_file';
      } else {
        salt = 'wellknownmcp_dev_unsafe_salt';
        source = 'fallback_default';
      }
    }

    const validation = this.validateSalt(salt);
    const recommendations: string[] = [];

    if (source === 'fallback_default') {
      recommendations.push('Set ANALYTICS_SALT in .env.local');
    }

    if (process.env.NODE_ENV === 'production' && !validation.valid) {
      recommendations.push('Use a cryptographically secure salt in production');
    }

    if (source === 'persistent_file') {
      recommendations.push('Consider moving salt to environment variables');
    }

    return {
      source,
      length: salt.length,
      validation,
      recommendations
    };
  }
}