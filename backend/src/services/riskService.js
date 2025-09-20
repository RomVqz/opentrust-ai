class RiskService {
  constructor() {
    this.rules = [
      {
        name: 'new_sender',
        weight: 0.3,
        check: (payment, context) => {
          // Verificar si el remitente es nuevo
          return context.isNewSender;
        },
        message: 'Remitente nuevo sin historial previo'
      },
      {
        name: 'amount_anomaly',
        weight: 0.4,
        check: (payment, context) => {
          // Verificar si el monto es inusual comparado con el promedio
          const average = context.averageTransactionAmount || 1;
          const ratio = payment.amount / average;
          return ratio > 2; // Más del doble del promedio
        },
        message: (payment, context) => {
          const average = context.averageTransactionAmount || 1;
          const ratio = (payment.amount / average).toFixed(2);
          return `Monto ${ratio}x mayor al promedio (${average})`;
        }
      },
      {
        name: 'unusual_location',
        weight: 0.2,
        check: (payment, context) => {
          // Verificar si la ubicación es inusual
          return context.isUnusualLocation;
        },
        message: 'Transacción desde ubicación inusual'
      },
      {
        name: 'high_risk_country',
        weight: 0.3,
        check: (payment, context) => {
          // Países considerados de alto riesgo
          const highRiskCountries = ['VE', 'IR', 'KP', 'SY', 'SD'];
          return highRiskCountries.includes(payment.countryCode);
        },
        message: 'Transacción desde país de alto riesgo'
      }
    ];
  }

  // Calcular el puntaje de riesgo base
  calculateBaseRiskScore(payment, context = {}) {
    let riskScore = 0;
    const factors = [];

    // Aplicar cada regla
    this.rules.forEach(rule => {
      if (rule.check(payment, context)) {
        riskScore += rule.weight * 100;
        
        const message = typeof rule.message === 'function' 
          ? rule.message(payment, context) 
          : rule.message;
          
        factors.push({
          type: rule.name,
          impact: rule.weight * 100,
          description: message
        });
      }
    });

    // Asegurar que el score esté entre 0 y 100
    riskScore = Math.min(100, Math.max(0, riskScore));

    return {
      riskScore: Math.round(riskScore),
      factors
    };
  }

  // Generar explicación básica en lenguaje natural
  generateBasicExplanation(factors) {
    if (factors.length === 0) {
      return "Transacción de bajo riesgo. No se detectaron anomalías significativas.";
    }

    const mainFactors = factors.sort((a, b) => b.impact - a.impact).slice(0, 2);
    const explanations = mainFactors.map(f => f.description);
    
    return `Riesgo elevado debido a: ${explanations.join('; ')}.`;
  }

  // Determinar recomendación basada en el score
  getRecommendation(riskScore) {
    if (riskScore < 30) {
      return { action: 'approve', confidence: 0.9 };
    } else if (riskScore < 70) {
      return { action: 'review', confidence: 0.7 };
    } else {
      return { action: 'block', confidence: 0.85 };
    }
  }

  // Analizar pago completo
  analyzePayment(payment, context = {}) {
    const { riskScore, factors } = this.calculateBaseRiskScore(payment, context);
    const explanation = this.generateBasicExplanation(factors);
    const recommendation = this.getRecommendation(riskScore);

    return {
      risk_score: riskScore,
      explanation,
      factors,
      recommendation: recommendation.action,
      confidence: recommendation.confidence
    };
  }
}

module.exports = RiskService;