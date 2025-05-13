# Fhevm Next.js Template

A modern Next.js template for building decentralized applications (dApps) with Fully Homomorphic Encryption (FHE) capabilities using `fhevmjs`.

## Features

- **fhevmjs**: Fully Homomorphic Encryption for Ethereum Virtual Machine
- **React**: Modern UI framework for building interactive interfaces
- **Next.js**: Frontend build tool
- **Wagmi**: React hooks for Ethereum
- **Tailwind**: Utility-first CSS framework for rapid UI development
- **@reown/appkit**: Comprehensive toolkit for Web3 authentication including social logins and multi-wallet support
- **@radix-ui**: Unstyled, accessible UI components for building high-quality design systems and web apps

## Prerequisites

- Node.js (v20 or higher)
- npm, yarn, or pnpm package manager
- MetaMask or another Ethereum wallet

## Getting Started

1. Fork the following repository:
   [https://github.com/zama-ai/fhevm-next-template](https://github.com/zama-ai/fhevm-next-template)

2. Clone your repository:

```bash
git clone https://github.com/your-username/fhevm-next-template
cd fhevm-next-template
```

1. Install dependencies:

```bash
npm install
# or
yarn install
pnpm install
```

1. Configure environment variables:

```bash
cp .env.example .env
```

Update `.env` with your specific configuration:

- `NEXT_PUBLIC_ACL_ADDRESS`: fhevm specific
- `NEXT_PUBLIC_KMS_ADDRESS`: fhevm specific
- `NEXT_PUBLIC_GATEWAY_URL`: fhevm specific
- `NEXT_PUBLIC_PROJECT_ID`: Obtain your project ID by signing up at [reown.com](https://reown.com/). This enables social login and multi-wallet support.
- `NEXT_PUBLIC_CONF_TOKEN_ADDRESS`: The address of your deployed confidential ERC20 token contract on Sepolia testnet. You'll get this after deploying the smart contract.

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
pnpm dev
```

Visit [http://localhost:3000/](http://localhost:3000/) to view your application.

## Production Build

Create a production-ready build:

```bash
npm run build
# or
yarn build
pnpm build
```

## Development Options

### Using Sepolia Testnet

For testing with real network conditions, deploy your dApp to Sepolia testnet:

1. Ensure you have Sepolia testnet ETH
2. Configure your `.env` with Sepolia network details
3. Deploy and test your contracts

## Learn More

- [fhevm Documentation](https://docs.zama.ai/fhevm)
- [Next.js Documentation](https://nextjs.org/)
- [Wagmi Documentation](https://wagmi.sh/)

## Support

For questions and support:

- [fhevm Discord Community](https://discord.gg/zamaai)
- [GitHub Issues](https://github.com/zama-ai/fhevm-next-template/issues)

## License

This project is licensed under the BSD 3-Clause License - see the LICENSE file for details.
