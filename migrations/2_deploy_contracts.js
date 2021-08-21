const Color = artifacts.require("Color");
const PolyGonGame = artifacts.require("PolygonGame")
const PolyToken = artifacts.require("PolyToken")

module.exports = function(deployer) {
  deployer.deploy(Color);
  deployer.deploy(PolyGonGame);
  deployer.deploy(PolyToken)
};
