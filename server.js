// server.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';

// Expressアプリを作成
const app = express();

// ミドルウェア
app.use(cors());
app.use(bodyParser.json());

// OpenAIの設定（APIキーは環境変数から読み込む）
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// POSTエンドポイントの作成
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'あなたは恋愛LINEの返信を考えるAIです。相手の気持ちを考えて、柔らかく、親しみやすい返信を1つ提案してください。',
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'APIリクエスト失敗' });
  }
});

// サーバー起動
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
