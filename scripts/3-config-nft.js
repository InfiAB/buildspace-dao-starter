import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0xFcB95C9AE4B2c42FB87a75017F23EB7fD4ed5E51"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Moshi Moshi YamamotoSan",
        description: "This NFT will give you access to znmdArjunDAO",
        image: readFileSync("scripts/assets/dao.jpg")
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()