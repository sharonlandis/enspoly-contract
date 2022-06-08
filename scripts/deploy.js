const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("angel");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // value is domain price to be taken out of wallet. Deploy with .0005 (3 chars), .0003 (4 chars), or .0001 (5+ chars)
  // Use exact amount, contract doesn't give change
  let txn = await domainContract.register("azrael", {
    value: hre.ethers.utils.parseEther("0.0001"),
  });
  await txn.wait();
  console.log("Minted domain azrael.angel");

  txn = await domainContract.setRecord("azrael", "Celestial immortality");
  await txn.wait();
  console.log("Set record for azrael.angel");

  const address = await domainContract.getAddress("gabriel");
  console.log("Owner of domain gabriel:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
