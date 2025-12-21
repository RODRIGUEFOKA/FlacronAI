// AI Service for FlacronAI
// Using Gemini AI (will switch to dual-AI later)

const geminiService = require('./geminiService');

/**
 * Generate insurance report using Gemini AI
 */
async function generateInsuranceReport(reportData) {
  return await geminiService.generateInsuranceReport(reportData);
}

/**
 * Analyze damage images using Gemini AI
 */
async function analyzeDamageImages(images) {
  return await geminiService.analyzeDamageImages(images);
}

/**
 * Generate executive summary using Gemini AI
 */
async function generateExecutiveSummary(fullReport) {
  return await geminiService.generateExecutiveSummary(fullReport);
}

/**
 * Enhance user input using Gemini AI
 */
async function enhanceReportInput(userInput) {
  return await geminiService.enhanceReportInput(userInput);
}

/**
 * Generate scope of work using Gemini AI
 */
async function generateScopeOfWork(damages, lossType) {
  return await geminiService.generateScopeOfWork(damages, lossType);
}

/**
 * Quality check report using Gemini AI
 */
async function qualityCheckReport(reportContent) {
  return await geminiService.qualityCheckReport(reportContent);
}

/**
 * Get AI provider status
 */
async function getAIStatus() {
  return {
    gemini: {
      available: !!process.env.GEMINI_API_KEY,
      configured: !!process.env.GEMINI_API_KEY,
      provider: 'Google Gemini AI',
      features: ['Report Generation', 'Image Analysis', 'Summaries', 'All AI Features']
    }
  };
}

module.exports = {
  generateInsuranceReport,
  analyzeDamageImages,
  generateExecutiveSummary,
  enhanceReportInput,
  generateScopeOfWork,
  qualityCheckReport,
  getAIStatus
};
