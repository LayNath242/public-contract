import { options } from "@selendra/api";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { mnemonic, nodeProvider } from './config';
import logger from './utils';

async function publicContract(contractAddress: string) {
  const provider = new WsProvider(nodeProvider);
  const api = new ApiPromise(options({ provider }));
  await api.isReadyOrError;

  const keyring = new Keyring({ 
    type: 'sr25519',
    ss58Format: 204
  });

  const sudoPair = keyring.addFromMnemonic(mnemonic);

  const hash = await api.tx.sudo
    .sudo(
        api.tx.evm.publishFree(contractAddress)
    )
    .signAndSend(sudoPair)

  return hash.toHex()
}

Promise.resolve()
  .then(async () => {
    const result = await publicContract('0x3e88d2d5AaBC9DC54d5d84636De87874a6B5FfD5');
    logger.info(result);
  })
  .then(async () => {
    process.exit();
  })
  .catch(async (error) => {
    logger.error(error);
  });
