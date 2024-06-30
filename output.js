let output = [
  {
    id: "4610ff38bd97445595ad0462403f4cf6",
    object: "chat.completion",
    created: 1719773444,
    model: "mistral-large-latest",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "",
          tool_calls: [
            {
              id: "HVOhLAdom",
              function: {
                name: "getPaymentStatus",
                arguments: '{"transactionId": "T1001"}'
              }
            }
          ]
        },
        finish_reason: "tool_calls",
        logprobs: null
      }
    ],
    usage: {
      prompt_tokens: 84,
      total_tokens: 110,
      completion_tokens: 26
    }
  },
  {
    id: "31f91199232e4769bb35d492cd4a7b04",
    object: "chat.completion",
    created: 1719773802,
    model: "mistral-large-latest",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "",
          tool_calls: [
            {
              id: "sk06MX8Pq",
              function: {
                name: "getPaymentDate",
                arguments: '{"transactionId": "T1001"}'
              }
            }
          ]
        },
        finish_reason: "tool_calls",
        logprobs: null
      }
    ],
    usage: {
      prompt_tokens: 85,
      total_tokens: 111,
      completion_tokens: 26
    }
  }
];
