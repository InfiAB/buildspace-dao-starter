import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0x5EcD75268029D1427dBa5c8e853F37f4aAb23B9d");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      // The collection's name, ex. CryptoPunks
      name: "znmdArjunDAO Membership",
      // A description for the collection.
      description: "A DAO for the fans of Arjun from  looking to connect with each other and make friends.",
      // The image for the collection that will show up on OpenSea.
      image: readFileSync("scripts/assets/dao.jpg"),
      // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your own wallet address if you want to charge for the drop.
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });
    
    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})()



// import { ethers } from "ethers";
// import sdk from "./1-initialize-sdk.js";

// const app = sdk.getAppModule("0x5EcD75268029D1427dBa5c8e853F37f4aAb23B9d");

// (async () => {
//   try {
//      const bundleDropModule = await app.deployBundleDropModule({
//        name: "znmdArjunDAO Membership",
//        description: "A DAO for the fans of Arjun from  looking to connect with each other and make friends.",
//        // The image for the collection that woll show up on OpenSea.

//        image: readFileSync("./assets/dao.jpg"),
//        // We need to pass in the address of the person who will be recieving the proceeds from the sales of the nfts in the module.
//        // We're planning on not charing people for the drop, so we'll pass in the 0x0 address
//        // you can set this to your own wallet address if you want to change for the drop.

//        primarySaleRecipientAddress: ethers.constants.AddressZero,
//      });

//      console.log(
//        "✅ Successfully deployed bundleDrop module, address:",
//        bundleDropModule.address,
//      )
//      console.log(
//       "✅ bundleDrop metadata:",
//       await bundleDropModule.getMetadata(),
//     );
//   } catch (error) {
//     console.log("failed to deploy bundleDrop module", error);
//   }
// })()