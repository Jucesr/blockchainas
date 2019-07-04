const bodyParser = require('body-parser');
const express = require('express');

const Blockchain = require('./blockchain');

const app = express();  

const blockchain = new Blockchain();

// This is required to convert Request Body to JSON format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({
      name: 'BlockchainAZ',
      version: '1.0',
      message: 'Hello there. I am ready to response to your requests'
  })
})

//  Mining a new block
app.get('/mine_block', function(req, res){
  let previous_block = blockchain.get_previous_block();
  let previous_proof = previous_block.proof;
  let proof = blockchain.proof_of_work(previous_proof);
  let previous_hash = blockchain.hash(previous_block);
  let block = blockchain.create_block(proof, previous_hash);
  res.send({
    message: 'Congratulations, you just mined a block!',
    block: block
  });
})

//  Getting the full Blockchain
app.get('/get_chain', function(req, res){
  
  res.send({
    chain: blockchain.chain,
    length: blockchain.chain.length
  });
})

//  Running the App
const PORT = 5000;
app.listen(PORT,
  function(){
    console.log(`Running on port ${PORT}`)
  }
)