'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Eye, EyeOff} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';

function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {toast} = useToast();

  useEffect(() => {
    // Load API key from localStorage on component mount
    const storedApiKey = localStorage.getItem('google_genai_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleSaveApiKey = async () => {
    setLoading(true);
    localStorage.setItem('google_genai_api_key', apiKey);
    toast({
      title: 'API 金鑰已儲存',
      description: '你的 API 金鑰已安全儲存於本地瀏覽器',
      status: 'success',
      duration: 2000,
    });
    setTimeout(() => {
      setLoading(false);
      router.push('/');
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-border bg-card/80 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center tracking-tight mb-2">設定</CardTitle>
          <CardDescription className="text-base text-center text-muted-foreground mb-2">
            輸入你的 <span className="font-semibold text-primary">Google Gemini API 金鑰</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="api-key">API 金鑰</Label>
            <div className="relative flex items-center">
              <Input
                id="api-key"
                placeholder="請輸入你的 API 金鑰"
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                className="pr-10"
                autoComplete="off"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none"
                onClick={() => setShowApiKey(v => !v)}
                tabIndex={-1}
                aria-label={showApiKey ? '隱藏金鑰' : '顯示金鑰'}
              >
                {showApiKey ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>
          <Button
            onClick={handleSaveApiKey}
            className="w-full bg-primary text-primary-foreground"
            disabled={loading || !apiKey}
          >
            {loading ? '儲存中…' : '儲存 API 金鑰'}
          </Button>
          <div className="pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              還沒有 API 金鑰嗎？
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-1"
              >
                點擊這裡
              </a>
              前往 Google AI Studio 取得。
            </p>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              金鑰僅儲存在你的瀏覽器 Local Storage，請妥善保管。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SettingsPage;
