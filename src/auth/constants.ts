export interface JwtPayload {
  sub?: number;
  jti?: string;
  aud?: number;
  exp?: number;
  username?: string;
}

export function isNumber(val) {
  return val === +val;
}
