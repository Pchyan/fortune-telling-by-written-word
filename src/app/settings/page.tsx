'use client';

import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

function SettingsPage() {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    // Load API key from localStorage on component mount
    const storedApiKey = localStorage.getItem('google_genai_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    // Save API key to localStorage
    localStorage.setItem('google_genai_api_key', apiKey);
    alert('API 金鑰已儲存！'); // Consider using a more elegant notification
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-4">
      <Card className="w-full max-w-md space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center">設定</CardTitle>
          <CardDescription className="text-sm text-center text-muted-foreground">
            輸入你的 Google Gemini API 金鑰
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API 金鑰</Label>
            <Input
              id="api-key"
              placeholder="請輸入你的 API 金鑰"
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveApiKey} className="w-full bg-primary text-primary-foreground">
            儲存 API 金鑰
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">
              還沒有 API 金鑰嗎？
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                點擊這裡
              </a>
              前往 Google AI Studio 取得。
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              請注意，API 金鑰會儲存在你的瀏覽器的 Local Storage 中。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SettingsPage;
