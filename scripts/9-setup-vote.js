import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const voteModule = sdk.getVoteModule(
    "0x674152B61eBD69792Dd41AD077D9367862103715",
);

// This is our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
    "0x14997B453d505144e7Ad11AC69544FA84c9ADcE2",
);

(async () => {
    try {
        // Give our treasury the power to mint additonal token if needed
        await tokenModule.grantRole("minter", voteModule.address);

        console.log(
            "Successfully gave vote module permissions on act on token module"

        );
    } catch (error) {
        console.log(
            "failed to grant vote module permissions on token module",
            error
        );
        proccess.exit(1);
    }

    try {
        // Grab our wallet's tooken balance, remeber -- we hold basically the entire supply right now!
        const ownedTokenBalance = await tokenModule.balanceOf(
            // The wallet address stored in your env file or Secrets section of Repl
            process.env.WALLET_ADDRESS
        );
        // console.log(ownedTokenBalance)
        // Grab 90% of the supply that we hold.
        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);

        // Tranfer 90% of the supply to our voting contract.
        await tokenModule.transfer(
            voteModule.address,
            percent90
        );

        console.log("✅ Successfully transferred tokens to vote module");
    } catch (error) {
        console.error("failed to tranfer tokens to vote module"), error
    };
})();