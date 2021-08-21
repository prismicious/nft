const { assert } = require('chai')

const PolygonGame = artifacts.require('./PolygonGame.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('PolygonGame', (accounts) => {
    let contract

    before(async () => { 
        contract = await PolygonGame.deployed()
    })

    describe('deployment', async() => {
        it('deploys succesfully', async() => {
            const address = contract.address 
            console.log(address)
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)            		
        })
        
        it('has a name', async () => {
            const name = await contract.name()
            assert.equal(name, 'Polygon Character')
        })

        it('has a symbol', async () => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'PGC')
        })


        
    })
    
    describe('minting', async() => { 

        it('creates a new token', async () => {
            const result = await contract.mint()
            const totalSupply = await contract.totalSupply()
            // SUCCESS
            assert.equal(totalSupply, 1)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 0, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is correct')


        })
    })

    describe('indexing', async() => {
        it('lists tokens', async() => {
            // Mint 3 more tokens
            await contract.mint()
            await contract.mint()
            await contract.mint()
            const totalSupply = await contract.totalSupply()
            console.log("Total supply => " + totalSupply)

            let color 
            let result =  []


        })
        
    })

})
