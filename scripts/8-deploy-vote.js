
import sdk from "./1-initialize-sdk.js";

// Grab the app module address.
const appModule = sdk.getAppModule(
    "0x5EcD75268029D1427dBa5c8e853F37f4aAb23B9d",
);

(async () => {
    try {
        const voteModule = await appModule.deployVoteModule({
            // GIve your governance contract a name.
            name: "znmdArjunDAO's frist Proposal",

            // This is the location of our governance token our ERC-20 contract!
            votingTokenAddress: "0x14997B453d505144e7Ad11AC69544FA84c9ADcE2",

            // After a proposal is created, when can members start voting ?
            // For now, we set this to immediately.
            proposalStartWaitTimeInSeconds: 0,

            // How long do members have to vote on a proposal when it's created.
            // Here we set it ro 24 hours (86400 seconds)
            proposalVotingTimeInSeconds: 24 * 60 * 60,
            
            // Will explain more below.
            votingQuorumFraction: 0,

            // What's the minimum # of tokens a user needs to be allowed to create a proposal?
            // I ser it to 0. Meaning no tokens are required for a user to create a proposal.
            minimumNNumberOfTokensNeededToPropose: "0",
            });
            console.log("✅ Successfully deployed vote module, address: ", voteModule.address)
    } catch (error) {
        console.log("Failed to deploy voite module", error);
    }
})();