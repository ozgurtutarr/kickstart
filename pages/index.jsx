import { Card, Button } from 'semantic-ui-react';
import React, { useEffect } from 'react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';
import Link from 'next/link';

const CampaignIndex = ({ campaigns }) => {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: (
        <Link href={`/campaigns/${address}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true,
    };
  });

  return (
    <Layout>
      <div>
        <h3>Open Campaign</h3>
        <Link href="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              secondary
            />
          </a>
        </Link>

        <Card.Group items={items} />
      </div>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { campaigns: campaigns };
};

export default CampaignIndex;
