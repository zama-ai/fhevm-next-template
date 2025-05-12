import { isAddress } from "ethers";
import { initFhevm, createInstance, FhevmInstance } from "fhevmjs/bundle";

const ACL_ADDRESS: string | undefined = process.env.NEXT_PUBLIC_ACL_ADDRESS;
const KMSVERIFIER_ADDRESS: string | undefined =
  process.env.NEXT_PUBLIC_KMS_ADDRESS;
const GATEWAY_URL: string | undefined = process.env.NEXT_PUBLIC_GATEWAY_URL;

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

// export const createFhevmInstance = async () => {
//   if (instancePromise) return instancePromise;

//   // Check if we're in a browser environment
//   if (typeof window === "undefined" || !window.indexedDB) {
//     instanceStatus = "error";
//     throw new Error("IndexedDB is not available in this environment");
//   }

//   try {
//     instanceStatus = "creating";
//     const storedPublicKey = await getPublicKey(ACL_ADDRESS);
//     const publicKey = storedPublicKey?.publicKey;
//     const publicKeyId = storedPublicKey?.publicKeyId;
//     const storedPublicParams = await getPublicParams(ACL_ADDRESS);
//     const publicParams = storedPublicParams
//       ? {
//           "2048": storedPublicParams,
//         }
//       : null;

//     instancePromise = createInstance({
//       network: window.ethereum,
//       aclContractAddress: ACL_ADDRESS,
//       kmsContractAddress: process.env.NEXT_PUBLIC_KMS_ADDRESS,
//       gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL,
//       publicKey,
//       publicKeyId,
//       publicParams,
//     });

//     instance = await instancePromise;

//     // Add null checks before accessing instance methods
//     if (instance) {
//       const pp = instance.getPublicParams(2048);
//       if (pp) {
//         await storePublicParams(ACL_ADDRESS, pp);
//       }
//       const pk = instance.getPublicKey();
//       if (pk) {
//         await storePublicKey(ACL_ADDRESS, pk);
//       }
//     }
//     instanceStatus = "ready";
//   } catch (error) {
//     instanceStatus = "error";
//     instancePromise = undefined;
//     throw error;
//   }
// };

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
