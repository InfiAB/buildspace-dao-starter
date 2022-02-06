import sdk from "./1-initialize-sdk.js";

// In order to deploy the new contract we need out old friend the app moudle again.
const app = sdk.getAppModule("0x5EcD75268029D1427dBa5c8e853F37f4aAb23B9d");

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      name: "znmdArjunDAO Governance Token",
      symbol: "PAISA",
    });
    console.log("✅ Successfully deployed token module, address:", tokenModule.address,);
  } catch (error) {
    console.log("failed to deploy token module", error);
  }
})();