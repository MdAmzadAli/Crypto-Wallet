import { mnemonicToSeed } from 'bip39';
import { HDKey } from '@scure/bip32';
import * as btc from '@scure/btc-signer';
import * as bip39 from 'bip39';

const network = btc.TEST_NETWORK; 
// mnemonic: string
export async function deriveAddress(mnemonic:string) {
  const seed = await mnemonicToSeed(mnemonic);
  const root = HDKey.fromMasterSeed(seed);
  const child = root.derive("m/44'/1'/0'/0/0");

  if (!child.publicKey) {
    throw new Error('No public key found');
  }


  const p2pkh = btc.p2pkh(child.publicKey, network);
  return p2pkh.address;
}

export function generateMnemonic(){
  const mnemonic = bip39.generateMnemonic();
  // console.log('Generated mnemonic:', mnemonic);
  return mnemonic;
}
// const mn=generateMnemonic();
// const address= await deriveAddress(mn);
// console.log('Derived address:', address);