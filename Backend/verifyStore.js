const codeMap = new Map();

export function saveCode(email, code) {
  codeMap.set(email, {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  });
}

export function verifyCode(email, inputCode) {
  const entry = codeMap.get(email);
  if (!entry) return false;
  const isValid = entry.code === inputCode && Date.now() < entry.expiresAt;
  if (isValid) codeMap.delete(email);
  return isValid;
}

