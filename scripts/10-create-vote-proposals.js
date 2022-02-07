import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js"

// Our voting contract.
const voteModule = sdk.getVoteModule(
    "0x674152B61eBD69792Dd41AD077D9367862103715",
);

// Our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
    "0x14997B453d505144e7Ad11AC69544FA84c9ADcE2",
);

(async () => {
    // try {
    //     const amount = 420_000;
    //     // Create proposal to mint 420_000 new token to the treasury.
    //     await voteModule.propose(
    //         "Should the DAO mint an additional " + amount + " token into the teasury?",
    //     [
    //         {            
    //             // Our nativeTokenn is ETH. naitveTokenValue is the amount of ETH we want 
    //             // to send in this proposal. In this case, we're sending 0 ETH
    //             // We're just minitng new tokens to the treasury. So, set to 0.
    //             nativeTokenValue: 0,
    //             transactionData: tokenModule.contract.interface.encodeFunctionData(
    //                 // We're doing a mint! And, we're minting to the voteModue, which is acting as our treasury.
    //                 "mint",
    //                 [
    //                     voteModule.address,
    //                     ethers.utils.parseUnits(amount.toString(), 18),
    //                 ]

    //             ),
    //             // Our token module that actually executes the mint.
    //             toAddress: tokenModule.address,
    //         },
    //     ]
    //     );

    //     console.log("✅ Successfully created proposal to mint tokens")
    // } catch (error) {
    //     console.error("Failed to create first proposal", error);
    //     process.exit(1);
    // }

    try {
        const amount = 6_900;
        // Create proosal to transfer ourselves 6,900 tokens for being awesome.
        await voteModule.propose(
            "Should the DAO transfer " + amount + " tokens from the treasaury to " + process.env.WALLET_ADDRESS + " for being awsome?",
            [
                {
                    // Again, we're sending oursleves 0 ETH. JUst sending our own token.
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        // We're doing a transfer from the treasury to our wallet.
                        "transfer",
                        [
                            process.env.WALLET_ADDRESS,
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ]
                    ),

                    toAddress: tokenModule.address,
                },
            ]
        );

        console.log("✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!");
    } catch (error) {
        console.error("failed to create second proposal", error);

    }
})();