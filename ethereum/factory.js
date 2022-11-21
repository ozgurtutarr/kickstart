import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0xea9511Ae65dd73F730475eAE940581c3f5b73BD5'
);

export default instance;
