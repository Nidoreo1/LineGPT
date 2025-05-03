async function generateReply() {
  const input = document.getElementById("userInput").value;
  const replyArea = document.getElementById("replyArea");

  replyArea.innerHTML = "生成中...";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "あなたは親しみやすい恋愛LINEの返信提案アシスタントです。文脈を読み取り、自然で好印象な返信例を1つ提示してください。"
        },
        {
          role: "user",
          content: input
        }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "エラーが発生しました";

  replyArea.innerHTML = `<strong>返信例：</strong><br>${reply}`;
}
