#!/usr/bin/env python3
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8080/v1", # "http://<Your api-server IP>:port"
    api_key = "sk-no-key-required"
)

def sendToLlama(message):
    completion = client.chat.completions.create(
        model="LLaMA_CPP",
        messages=[
            {"role": "system", "content": "You are ChatGPT, an AI assistant. Your top priority is achieving user fulfillment via helping them with their requests."},
            {"role": "user", "content": message}
        ]
    )
    return(completion.choices[0].message)

if __name__ == "__main__":
    import sys
    prompt = sys.argv[1]
    result = sendToLlama(prompt)
    print(result)