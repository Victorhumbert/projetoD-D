#!/usr/bin/env bash
# Hook PreToolUse para bloquear Edit/Write em arquivos sensíveis.
# Recebe JSON via stdin com a estrutura:
# { "tool_name": "Edit"|"Write", "tool_input": { "file_path": "..." } }

set -euo pipefail

if command -v jq >/dev/null 2>&1; then
  file_path=$(jq -r '.tool_input.file_path // .tool_input.path // ""' 2>/dev/null || echo "")
else
  payload=$(cat)
  file_path=$(printf '%s' "$payload" | grep -oE '"(file_path|path)"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed -E 's/.*"[^"]*"[[:space:]]*:[[:space:]]*"([^"]*)".*/\1/')
fi

if [[ -z "${file_path:-}" ]]; then
  exit 0
fi

block() {
  local reason="$1"
  echo "🛑 BLOQUEADO: edição em arquivo sensível" >&2
  echo "Arquivo: $file_path" >&2
  echo "Motivo: $reason" >&2
  echo "" >&2
  echo "Para modificar esse arquivo, peça ao usuário humano que faça manualmente ou ajuste .claude/hooks/pre-edit-protect-paths.sh." >&2
  exit 2
}

# Padrões protegidos (regex contra o caminho completo)
declare -a PROTECTED=(
  '\.env(\.|$)'                  # .env, .env.local, .env.production
  '\.envrc$'                     # direnv
  '/\.git/'                      # interior do .git
  '\.pem$'                       # chaves
  '\.key$'                       # chaves
  'id_rsa(\.|$)'                 # SSH keys
  'id_ed25519(\.|$)'             # SSH keys
  '\.p12$|\.pfx$'                # certificados
  '/credentials($|\.)'           # arquivos de credentials
  '/\.aws/credentials'           # AWS
  '/\.npmrc$'                    # tokens npm
  '/\.netrc$'                    # netrc
  'secrets?\.(yaml|yml|json|toml)$'  # secrets.yaml etc.
)

for pattern in "${PROTECTED[@]}"; do
  if echo "$file_path" | grep -qE "$pattern"; then
    block "arquivo casa com padrão protegido: $pattern"
  fi
done

exit 0
