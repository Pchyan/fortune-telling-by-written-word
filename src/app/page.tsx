'use client';

import React, {useState} from 'react';
import {AnalyzeTextStructureOutput} from '@/ai/flows/analyze-text-structure';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {analyzeTextStructure} from '@/ai/flows/analyze-text-structure';
import {generateEncouragingStatements} from '@/ai/flows/generate-encouraging-statements';
import Link from 'next/link';

export default function Home() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<AnalyzeTextStructureOutput | null>(null);
  const [encouragingStatements, setEncouragingStatements] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const analysisResult = await analyzeTextStructure({text});
      setAnalysis(analysisResult);

      const encouragingStatementsResult = await generateEncouragingStatements({
        analysisResults: analysisResult.analysis + ' ' + analysisResult.interpretations.join(' '),
      });
      setEncouragingStatements(encouragingStatementsResult.encouragingStatements);
    } catch (error) {
      console.error('Error analyzing text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-4">
      <Card className="w-full max-w-md space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center">字裡乾坤</CardTitle>
          <CardDescription className="text-sm text-center text-muted-foreground">
            輸入一個字，讓 AI 為你分析文字的奧秘
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="請輸入文字"
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={handleAnalyze} className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
            {isLoading ? '開始分析' : '分析中...'}
          </Button>
          <Link href="/settings" className="text-sm text-muted-foreground text-center block">
            前往設定頁面
          </Link>
        </CardContent>
      </Card>

      {analysis && (
        <Card className="w-full max-w-md mt-8 space-y-4">
          <CardHeader>
            <CardTitle>分析結果</CardTitle>
            <CardDescription>AI 測字分析結果如下：</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <h3 className="text-lg font-semibold">文字結構分析:</h3>
              <p>{analysis.analysis}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">可能的解釋:</h3>
              <ul>
                {analysis.interpretations.map((interpretation, index) => (
                  <li key={index}>{interpretation}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">建議:</h3>
              <p>{analysis.advice}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {encouragingStatements.length > 0 && (
        <Card className="w-full max-w-md mt-8 space-y-4">
          <CardHeader>
            <CardTitle>鼓勵語句</CardTitle>
            <CardDescription>AI 產生的鼓勵語句：</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul>
              {encouragingStatements.map((statement, index) => (
                <li key={index} className="mb-2">
                  {statement}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
