import { isAddress } from "ethers";
import { initFhevm, createInstance, FhevmInstance } from "fhevmjs/bundle";
import {
  NEXT_PUBLIC_ACL_ADDRESS as ACL_ADDRESS,
  NEXT_PUBLIC_KMS_ADDRESS as KMSVERIFIER_ADDRESS,
  NEXT_PUBLIC_GATEWAY_URL as GATEWAY_URL,
} from "@/config/env";

if (!ACL_ADDRESS) {
  throw new Error("NEXT_PUBLIC_ACL_ADDRESS is not defined");
}
if (!KMSVERIFIER_ADDRESS) {
  throw new Error("NEXT_PUBLIC_KMS_ADDRESS is not defined");
}
if (!GATEWAY_URL) {
  throw new Error("NEXT_PUBLIC_GATEWAY_URL is not defined");
}

const ACL_ADDRESS_VERIFIED = ACL_ADDRESS;
const KMSVERIFIER_ADDRESS_VERIFIED = KMSVERIFIER_ADDRESS;
const GATEWAY_URL_VERIFIED = GATEWAY_URL;

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

export const init = initFhevm;

let instancePromise: Promise<FhevmInstance> | undefined;
let instance: FhevmInstance;

const keypairs: Keypairs = {};

// Add a status indicator
export type FhevmStatus = "uninitialized" | "creating" | "ready" | "error";
let instanceStatus: FhevmStatus = "uninitialized";

export const createFhevmInstance = async () => {
  if (instancePromise) return instancePromise;

  try {
    instanceStatus = "creating";
    instancePromise = createInstance({
      network: window.ethereum,
      aclContractAddress: ACL_ADDRESS_VERIFIED,
      kmsContractAddress: KMSVERIFIER_ADDRESS_VERIFIED,
      gatewayUrl: GATEWAY_URL_VERIFIED,
    });
    instance = await instancePromise;
    instanceStatus = "ready";
  } catch (error) {
    instanceStatus = "error";
    instancePromise = undefined;
    throw error;
  }
};

export const getFhevmStatus = (): FhevmStatus => instanceStatus;

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
