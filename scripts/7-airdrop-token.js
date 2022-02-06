import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership nfT contract 
const bundleDropModule = sdk.getBundleDropModule(
    "0x14997B453d505144e7Ad11AC69544FA84c9ADcE2",
);

// This is the address to our EERC-o28 token contract.
const tokenModule = sdk.getTokenModule(
    "0x5EcD75268029D1427dBa5c8e853F37f4aAb23B9d",
);

(async () => {
    try {
        // Grab the address of people who own our membership NFT, which has a tokenId of 0.
        
        const walletAddress = await bundleDropModule.getAllClaimerAddresses("0");

        if(walletAddress.lenght === 0) {
            console.log(
                "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
            );
            process.exit(0);
        }

        // Loop through the array of addresses.
        const airdropTargets = walletAddress.map((address) => {
            // Pick a random # between 1000 and 100000.
            const randomAmount = Math.floor(Math.random() * (10000-1000+1)+1000);
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

            // Set up the target.
            const airdropTarget = {
                address,
                // Remembe, we need 18 decimal places!
                amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
        };
        return airdropTarget;
    });

    // Call transerBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...")
    await tokenModule.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    } catch (error) {
        console.log("Failed to airdrop tokens", error);
    }
})();