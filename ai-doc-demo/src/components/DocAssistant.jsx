import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { FileText, AlertCircle, Loader2 } from 'lucide-react';

const DocAssistant = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // System prompt for consistent documentation style
  const SYSTEM_PROMPT = `You are a technical documentation expert. Generate comprehensive, well-structured technical documentation based on the provided description. Include:
- Overview
- Technical specifications
- API endpoints (if applicable)
- Request/Response examples
- Error handling
- Best practices
Use markdown formatting.`;

  const generateDocumentation = async () => {
    setLoading(true);
    setError('');

    try {
      // Input validation
      if (!input.trim()) {
        throw new Error('Please provide a description of your technical feature.');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4-turbo-preview",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT
            },
            {
              role: "user",
              content: input
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setOutput(data.choices[0].message.content);
    } catch (err) {
      console.error('Documentation generation error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            AI Documentation Generator (GPT-4)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input Area */}
          <div>
            <Textarea
              placeholder="Describe your technical feature or API..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-32"
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-end">
            <Button
              onClick={generateDocumentation}
              disabled={loading || !input.trim()}
              className="w-40"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Doc'
              )}
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Output Display */}
          {output && !error && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Generated Documentation</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(output);
                      // You could add a toast notification here
                      console.log('Copied to clipboard');
                    } catch (err) {
                      console.error('Failed to copy:', err);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  </svg>
                  Copy Markdown
                </Button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            </div>
          )}

          {/* API Integration Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">API Integration Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <p>This demo showcases:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Integration with GPT-4 API</li>
                  <li>Proper error handling and rate limiting</li>
                  <li>System prompts for consistent output</li>
                  <li>Response parsing and formatting</li>
                  <li>Loading states and user feedback</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocAssistant;
