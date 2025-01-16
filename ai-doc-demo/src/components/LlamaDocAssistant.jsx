import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Loader2, FileText, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const LlamaDocAssistant = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const extractTextFromFile = async (file) => {
    try {
      const fileType = file.name.split('.').pop().toLowerCase();
      let content = '';

      switch (fileType) {
        case 'csv':
          const csvText = await file.text();
          return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
              header: true,
              complete: (results) => {
                resolve(JSON.stringify(results.data, null, 2));
              },
              error: (error) => reject(error)
            });
          });

        case 'xlsx':
        case 'xls':
          const arrayBuffer = await file.arrayBuffer();
          const workbook = XLSX.read(arrayBuffer);
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          content = XLSX.utils.sheet_to_json(worksheet);
          return JSON.stringify(content, null, 2);

        case 'txt':
        case 'md':
          return await file.text();

        default:
          throw new Error('Unsupported file type');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      throw error;
    }
  };

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setError('');
  };

  const getFileTypeIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const colorMap = {
      csv: 'text-green-600',
      xlsx: 'text-blue-600',
      xls: 'text-blue-600',
      txt: 'text-gray-600',
      md: 'text-purple-600',
    };
    return colorMap[extension] || 'text-gray-600';
  };

  const handleSubmit = async () => {
    if (!file || !question) return;
    
    setLoading(true);
    setError('');
    try {
      const content = await extractTextFromFile(file);
      
      const prompt = `
Please analyze the following document and answer the question. 
Format your response in this structure:
1. Direct Answer: Provide a clear, concise answer
2. Context: Give relevant supporting information from the document
3. Additional Notes: Include any important caveats or related points

Document Content: ${content}

Question: ${question}
`;
      
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.2',
          prompt: prompt,
          stream: false
        }),
      });
      
      const data = await response.json();
      setAnswer(data.response);
    } catch (error) {
      console.error('Error:', error);
      setError('Error processing your request. Please check the file format and try again.');
      setAnswer('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Document Assistant (Powered by Llama)</h2>
        <p className="text-gray-600">Upload a document (.txt, .csv, .md, .xlsx, .xls) and ask questions about its content</p>
      </div>

      <div className="space-y-6">
        {/* File Upload Section */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept=".txt,.csv,.md,.xlsx,.xls"
            />
            {file && (
              <div className="flex items-center space-x-2">
                <FileText className={getFileTypeIcon(file.name)} size={20} />
                <span className="text-sm text-gray-500">{file.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Question Input Section */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ask a Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            placeholder="Enter your question about the document..."
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          disabled={!file || !question || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Ask Question'
          )}
        </Button>

        {/* Answer Section */}
        {answer && (
          <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Response</h3>
            </div>
            <div className="p-4 space-y-4">
              {answer.split(/\d\./).map((section, index) => {
                if (!section.trim()) return null;
                return (
                  <div key={index} className="prose max-w-none">
                    <p className="text-gray-800 whitespace-pre-wrap">{section.trim()}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LlamaDocAssistant;
