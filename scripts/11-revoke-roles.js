import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
    "0x14997B453d505144e7Ad11AC69544FA84c9ADcE2",
);

(async () => {
    try {
        console.log(
            "👀 Roles that exist right now: ",
            await tokenModule.getAllRoleMembers()
        );

        // Revoke all the superpowers your wallet had over the ERC-20 contract.
        await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
        console.log(
            "🎉 Roles after revoking ourselves.",
            await tokenModule.getAllRoleMembers()
        );
        console.log(" Successfully revoked our superpowers from the ERC-20 contract.");

    } catch (error) {
        console.error("Failed to revoke overselves from the DAO treasury", error);
    }
})();