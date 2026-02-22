#!/bin/bash
# Update MiniMax Balance for Dashboard
# Run this periodically to keep balance fresh

cd /data/.openclaw/workspace/skills/mission-control

# Check if MiniMax API key is available (from environment variable)
API_KEY="${MINIMAX_API_KEY:-}"

if [ -z "$API_KEY" ]; then
    # Try to get from env file or config
    API_KEY=""
fi

if [ -n "$API_KEY" ] && [ "$API_KEY" != "${API_KEY%%sk-cp-*}" ]; then
    # API key found, try to get balance
    RESULT=$(curl -s -X POST "https://api.minimax.io/account/get_balance" \
        -H "Content-Type: application/json" \
        -d "{\"api_key\": \"$API_KEY\"}" 2>/dev/null)
    
    BALANCE=$(echo $RESULT | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('balance', 'N/A'))" 2>/dev/null || echo "N/A")
else
    BALANCE="Configure API key"
fi

# Save balance
echo "{\"balance\": \"$BALANCE\", \"updated\": \"$(date)\"}" > minimax-balance.json

echo "MiniMax Balance: $BALANCE"
