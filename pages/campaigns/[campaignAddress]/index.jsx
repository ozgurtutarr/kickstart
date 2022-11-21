import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Card, Grid, Button } from 'semantic-ui-react';
import ContributeForm from '../../../components/ContributeForm';
import Link from 'next/link';

const CampaignShow = ({
  summary,
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  const items = [
    {
      header: 'Manager Address',
      meta: manager,
      description:
        'The manager created this campaign and can create requests to withdraw this money',
      style: { overflowWrap: 'break-word' },
    },
    {
      header: 'Minimum Contribution',
      meta: `${minimumContribution} wei`,
      description:
        'The minimum amount to contribute to this campaign in wei to become an approver',
      style: { overflowWrap: 'break-word' },
    },
    {
      header: 'Camapaign Balance',
      meta: `${balance} wei = ${web3.utils.fromWei(balance, 'ether')} eth`,
      description: 'How much money this campaign has left to spend',
      style: { overflowWrap: 'break-word' },
    },
    {
      header: 'Number of requests',
      meta: requestsCount,
      description:
        'A request tries to withdraw money from the account. Requests must be approved by a minimum 50% of approvers',
      style: { overflowWrap: 'break-word' },
    },
    {
      header: 'Number of Approvers',
      meta: approversCount,
      description:
        'The number of approvers that have already contributed to this campaign',
      style: { overflowWrap: 'break-word' },
    },
  ];
  const router = useRouter();
  const { campaignAddress } = router.query;
  // console.log(summary);

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <div>Campaign id {campaignAddress}</div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items}></Card.Group>
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={campaignAddress} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${campaignAddress}/requests`}>
              <a>
                <Button primary>View Request</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

CampaignShow.getInitialProps = async (props) => {
  const campaignAddress = props.query.campaignAddress;
  const campaign = Campaign(campaignAddress);
  const summary = await campaign.methods.getSummary().call();

  return {
    address: props.query.campaignAddress,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};
export default CampaignShow;
