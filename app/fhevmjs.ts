import { isAddress } from "ethers";
import { initFhevm, createInstance, FhevmInstance } from "fhevmjs/bundle";

const ACL_ADDRESS: string = "0xFee8407e2f5e3Ee68ad77cAE98c434e637f516e5";
const KMSVERIFIER_ADDRESS: string =
  "0x9D6891A6240D6130c54ae243d8005063D05fE14b";

export type Keypair = {
  publicKey: string;
  privateKey: string;
  signature: string;
};

type Keypairs = {
  [key: string]: {
    [key: string]: Keypair;
  };
};

export const init = async () => {
  await initFhevm({ thread: navigator.hardwareConcurrency });
};

let instancePromise: Promise<FhevmInstance>;
let instance: FhevmInstance;

const keypairs: Keypairs = {};

export const createFhevmInstance = async () => {
  if (instancePromise) return instancePromise;

  instancePromise = createInstance({
    network: window.ethereum,
    aclContractAddress: ACL_ADDRESS,
    kmsContractAddress: KMSVERIFIER_ADDRESS,
    gatewayUrl: "https://gateway.sepolia.zama.ai/",
  });
  instance = await instancePromise;
};

export const setKeypair = (
  contractAddress: string,
  userAddress: string,
  keypair: Keypair,
) => {
  if (!isAddress(contractAddress) || !isAddress(userAddress)) return;
  keypairs[userAddress][contractAddress] = keypair;
};

export const getKeypair = (
  contractAddress: string,
  userAddress: string,
): Keypair | null => {
  if (!isAddress(contractAddress) || !isAddress(userAddress)) return null;
  return keypairs[userAddress]
    ? keypairs[userAddress][contractAddress] || null
    : null;
};

export const getInstance = (): FhevmInstance => {
  return instance;
};
