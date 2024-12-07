import { createPublicClient, http, parseAbi } from "viem";
import { arbitrumSepolia } from "viem/chains";
// import { privateKeyToAccount } from "viem/accounts";
import "dotenv/config";

export const ABI = parseAbi(["function hello_world() public returns (string)"]);

export const initClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http()
});

export const CONTRACT_ADDRESS = "0xe782eb0c139b05a6d7c2b98387920c81fe464999";

export const client = async (args: { function: "hello_world" }) =>
  await initClient.readContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: args.function
  });
