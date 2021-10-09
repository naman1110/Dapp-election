var election= artifacts.require("./election.sol");

module.exports = async function(deployer) {
await  deployer.deploy(election,3);
};
