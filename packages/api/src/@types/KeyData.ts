import type KeyDataSecrets from './KeyDataSecrets';

type KeyData = {
  fingerprint: number;
  publicKey: string;
  label: string | null;
  secrets: KeyDataSecrets | null;
};

export default KeyData;
