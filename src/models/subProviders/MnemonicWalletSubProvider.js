import {SubProvider} from './SubProvider';
import { MnemonicWalletSubprovider } from '@0x/subproviders';

export class MnemonicWalletSubProvider extends SubProvider{

    constructor() {
        super();
        const BASE_DERIVATION_PATH = `44'/60'/0'/0`;
        const MNEMONIC = 'concert load couple harbor equip island argue ramp clarify fence smart topic';

        this.mnemonicWalletSubProvider = new MnemonicWalletSubprovider({
            mnemonic: MNEMONIC,
            baseDerivationPath: BASE_DERIVATION_PATH,
        });
    }

    handleRequest = (payload, next, end) => {
        this.mnemonicWalletSubProvider.handleRequest(payload, next, end);
    }

    setEngine = (engine) => {
        this.mnemonicWalletSubProvider.setEngine(engine);
    }

}
