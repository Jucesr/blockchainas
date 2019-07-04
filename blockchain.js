const sha256 = require('sha256');

class Blockchain {

  constructor(proof, previous_hash) {
    this.chain = [];
    this.create_block(1, '0');
  }

  create_block(proof, previous_hash) {
    let block = {
      index: this.chain.length + 1,
      timestamp: new Date(),
      proof: proof,
      previous_hash: previous_hash
    }

    this.chain.push(block);

    return block;
  }

  get_previous_block() {
    return this.chain.slice(-1)[0];
  }

  proof_of_work(previous_proof) {
    let new_proof = 1;
    let check_proof = false;
    let hash_operation;
    while (!check_proof) {
      let v = (Math.pow(new_proof, 2) - Math.pow(previous_proof, 2)).toString()
      hash_operation = sha256( v )
      if (hash_operation.substr(0, 4) == '0000') {
        check_proof = true;
      } else {
        new_proof++;
      }
    }
    return new_proof
  }

  hash(block) {
    let encoded_block = JSON.stringify(block, Object.keys(block).sort())
    return sha256(encoded_block);
  }

  is_chain_valid(chain) {
    let previous_block = chain[0];
    let block_index = 1;
    let block, previous_proof, proof;
    while (block_index < chain.length) {
      block = chain[block_index];
      if (block.previous_hash != this.hash(previous_block))
        return false
      previous_proof = previous_block.proof;
      proof = block.proof;
      hash_operation = sha256( (Math.pow(proof, 2) - Math.pow(previous_proof, 2).toString()))
      if (hash_operation.substr(0, 4) != '0000') 
        return false
      previous_block = block
      block_index++;
    }
  }
}

module.exports = Blockchain;