import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before
const tokenModule = sdk.getTokenModule(
  "0x14997B453d505144e7Ad11AC69544FA84c9ADcE2",
);

(async () => {
  try {
    // What's the maz supply you want to set? 1,000,000 is a nice number?
    const amount = 1_000_000;
    // We use the util function from "ethers" to convert the amount
    // to have 18 decimals (which is standard for ERC-20 tokens).
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
      // Interact with your deployed ERC-20 contract and mint the tokens!
      await tokenModule.mint(amountWith18Decimals);
      const totalSupply = await tokenModule.totalSupply();

      // Print out how many of our token's are out there now!
      console.log(
        "✅ There now is",
        ethers.utils.formatUnits(totalSupply, 18),
        "$PAISA in circulation",
      );
  } catch (error) {
    console.log("Failed to print money", error);
  }
})();