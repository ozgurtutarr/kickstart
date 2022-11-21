import Link from 'next/link';
import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import Layout from '../../../../components/Layout';
import { useRouter } from 'next/router';
import Campaign from '../../../../ethereum/campaign';
import RequestRow from '../../../../components/RequestRow';

const RequestIndex = ({ request, approversCount, requestCount }) => {
  console.log(request);
  const router = useRouter();
  const { campaignAddress } = router.query;

  const { Header, Row, HeaderCell, Body } = Table;

  const renderRow = () => {
    return request.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={campaignAddress}
          approversCount={approversCount}
        />
      );
    });
  };

  return (
    <Layout>
      <h3>Request</h3>
      <Link href={`/campaigns/${campaignAddress}/requests/new`}>
        <a>
          {' '}
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>

        <Body>{renderRow()}</Body>
      </Table>
      <div>Found {requestCount} requests</div>
    </Layout>
  );
};

RequestIndex.getInitialProps = async (props) => {
  const campaignAddress = props.query.campaignAddress;
  const campaign = Campaign(campaignAddress);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const request = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );
  console.log(request);

  return {
    campaignAddress,
    request,
    approversCount,
    requestCount,
  };
};

export default RequestIndex;
