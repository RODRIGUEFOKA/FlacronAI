import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotFAQ = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! 👋 I\'m your FlacronAI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // FAQ Knowledge Base
  const faqData = {
    greetings: ['hello', 'hi', 'hey', 'greetings'],
    pricing: ['price', 'cost', 'pricing', 'payment', 'plan', 'subscription', 'how much'],
    features: ['features', 'what can', 'capabilities', 'what does', 'functionality'],
    reports: ['report', 'generate', 'create', 'document'],
    export: ['export', 'download', 'pdf', 'docx', 'format'],
    trial: ['trial', 'free', 'demo', 'test'],
    support: ['support', 'help', 'contact', 'assistance'],
    ai: ['ai', 'artificial intelligence', 'watsonx', 'openai', 'technology'],
    integration: ['api', 'integrate', 'integration', 'connect'],
    security: ['security', 'secure', 'safe', 'privacy', 'gdpr', 'soc2']
  };

  const responses = {
    greetings: 'Hello! Welcome to FlacronAI. I can help you with questions about our pricing, features, reports, and more. What would you like to know?',
    pricing: 'We offer three plans:\n\n🆓 **Starter**: Free - 1 report/month\n💼 **Pro**: $39.99/month - 20 reports/month with custom branding\n🏢 **Enterprise**: Custom pricing - Unlimited reports with API access\n\nWould you like more details about any plan?',
    features: 'FlacronAI offers:\n\n✨ AI-powered report generation\n📄 Multiple export formats (PDF, DOCX, HTML)\n📸 Photo integration & damage analysis\n🗺️ Automatic GPS & map inclusion\n✅ Quality checking\n👥 Multi-user access\n🌐 Multi-language support\n\nWhat feature interests you most?',
    reports: 'Our AI generates professional insurance reports instantly! Simply:\n\n1. Fill in the structured form with claim details\n2. Upload photos (optional)\n3. Click generate\n4. Download in your preferred format\n\nReports are generated in seconds using IBM WatsonX AI & Microsoft.',
    export: 'You can export reports in multiple formats:\n\n📄 **PDF** - Professional, print-ready\n📝 **DOCX** - Editable Word document\n🌐 **HTML** - Web-ready format\n\nPro and Enterprise plans include custom logo branding on all exports!',
    trial: 'Yes! Start with our **Free Starter Plan**:\n\n✅ 1 report per month\n✅ All report types\n✅ PDF export\n\nNo credit card required. Upgrade anytime when you need more reports!',
    support: 'We\'re here to help! 🤝\n\n📧 **Email**: support@flacronenterprises.com\n💬 **Pro Plan**: Email support\n🎯 **Enterprise**: Dedicated support team\n\nYou can also check our documentation or contact us through the website.',
    ai: 'FlacronAI is powered by cutting-edge AI:\n\n🔵 **IBM WatsonX AI** - Enterprise-grade intelligence\n🔷 **Microsoft** - Advanced AI technology\n\nThis ensures 99% accuracy, consistent formatting, and professional reports every time!',
    integration: 'Enterprise plan includes:\n\n🔌 **REST API** - Full programmatic access\n🎨 **White-label portal** - Your branding\n🔗 **Custom integrations** - Connect your systems\n📊 **Webhooks** - Real-time notifications\n\nContact sales for API documentation!',
    security: 'Your data security is our priority:\n\n🔒 **SOC 2 Certified**\n🛡️ **GDPR Compliant**\n📜 **ISO 27001**\n🏥 **HIPAA Ready**\n🔐 **End-to-end encryption**\n\nAll reports are processed securely and never shared.',
    default: 'I\'m not sure about that, but I can help with:\n\n💰 Pricing & Plans\n✨ Features & Capabilities\n📄 Report Generation\n📤 Export Formats\n🆓 Free Trial\n💬 Support Options\n\nWhat would you like to know?'
  };

  // Quick action buttons
  const quickActions = [
    { label: '💰 View Pricing', query: 'pricing' },
    { label: '✨ See Features', query: 'features' },
    { label: '🆓 Free Trial', query: 'trial' },
    { label: '📞 Contact Support', query: 'support' }
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Find best matching response
  const findResponse = (input) => {
    const lowerInput = input.toLowerCase();

    for (const [category, keywords] of Object.entries(faqData)) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        return responses[category];
      }
    }

    return responses.default;
  };

  const handleSend = (customQuery = null) => {
    const query = customQuery || inputValue.trim();
    if (!query) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: query,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: findResponse(query),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  const handleQuickAction = (query) => {
    handleSend(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="chatbot-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <path d="M8 10h8M8 14h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>
          )}
        </AnimatePresence>
        {!isOpen && <span className="chatbot-notification-dot" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-content">
                <div className="chatbot-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" fill="#000000"/>
                  </svg>
                </div>
                <div>
                  <h3>FlacronAI Assistant</h3>
                  <p className="chatbot-status">
                    <span className="status-dot"></span>
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.type === 'bot' && (
                    <div className="message-avatar">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" fill="#000000"/>
                      </svg>
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <motion.div
                className="quick-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action.query)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {action.label}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Input Area */}
            <div className="chatbot-input-area">
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder="Type your question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <motion.button
                className="chatbot-send-btn"
                onClick={() => handleSend()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!inputValue.trim()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .chatbot-toggle-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #FF7C08 0%, #FF9F40 100%);
          border: none;
          border-radius: 50%;
          color: #000000;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(255, 124, 8, 0.4);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .chatbot-toggle-btn:hover {
          box-shadow: 0 12px 48px rgba(255, 124, 8, 0.6);
        }

        .chatbot-notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 12px;
          height: 12px;
          background: #00FF00;
          border: 2px solid #000000;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        .chatbot-window {
          position: fixed;
          bottom: 6rem;
          right: 2rem;
          width: 420px;
          height: 600px;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 124, 8, 0.3);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
          z-index: 999;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chatbot-header {
          background: linear-gradient(135deg, #FF7C08 0%, #FF9F40 100%);
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 124, 8, 0.3);
        }

        .chatbot-header-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .chatbot-avatar {
          width: 48px;
          height: 48px;
          background: #000000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .chatbot-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
          color: #000000;
        }

        .chatbot-status {
          margin: 0.25rem 0 0 0;
          font-size: 0.85rem;
          color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #00FF00;
          border-radius: 50%;
          animation: pulse-status 2s infinite;
        }

        @keyframes pulse-status {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chatbot-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chatbot-messages::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .chatbot-messages::-webkit-scrollbar-thumb {
          background: rgba(255, 124, 8, 0.3);
          border-radius: 3px;
        }

        .message {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #FF7C08 0%, #FF9F40 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message-content {
          max-width: 75%;
        }

        .message-text {
          padding: 0.875rem 1.125rem;
          border-radius: 16px;
          font-size: 0.95rem;
          line-height: 1.6;
          white-space: pre-line;
        }

        .message.bot .message-text {
          background: rgba(255, 124, 8, 0.15);
          border: 1px solid rgba(255, 124, 8, 0.3);
          color: #FFFFFF;
          border-bottom-left-radius: 4px;
        }

        .message.user .message-text {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          border-bottom-right-radius: 4px;
          text-align: right;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          padding: 0 1.5rem 1rem;
        }

        .quick-action-btn {
          padding: 0.75rem 1rem;
          background: rgba(255, 124, 8, 0.1);
          border: 1px solid rgba(255, 124, 8, 0.3);
          border-radius: 12px;
          color: #FF7C08;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quick-action-btn:hover {
          background: rgba(255, 124, 8, 0.2);
          border-color: rgba(255, 124, 8, 0.5);
        }

        .chatbot-input-area {
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border-top: 1px solid rgba(255, 124, 8, 0.2);
          display: flex;
          gap: 0.75rem;
        }

        .chatbot-input {
          flex: 1;
          padding: 0.875rem 1.125rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: #FFFFFF;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .chatbot-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .chatbot-input:focus {
          border-color: rgba(255, 124, 8, 0.5);
          background: rgba(255, 255, 255, 0.12);
        }

        .chatbot-send-btn {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #FF7C08 0%, #FF9F40 100%);
          border: none;
          border-radius: 12px;
          color: #000000;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .chatbot-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .chatbot-send-btn:not(:disabled):hover {
          box-shadow: 0 4px 16px rgba(255, 124, 8, 0.4);
        }

        @media (max-width: 768px) {
          .chatbot-window {
            right: 1rem;
            left: 1rem;
            width: auto;
            bottom: 5.5rem;
            height: 500px;
          }

          .chatbot-toggle-btn {
            right: 1rem;
            bottom: 1.5rem;
          }

          .quick-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default ChatbotFAQ;
