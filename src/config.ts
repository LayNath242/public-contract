import 'dotenv/config';

export const mnemonic: string = process.env.MNEMONIC ? process.env.MNEMONIC : '';
export const nodeProvider: string = process.env.NODE_PROVIDE ? process.env.NODE_PROVIDE : 'ws://127.0.0.1:9944';
