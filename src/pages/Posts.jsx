import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import useFetch from '../hooks/useFetch';
import Fallback from '../Fallback';

const Posts = () => {
  const { data, loading, error } = useFetch(`${process.env.REACT_APP_API_URL}/posts`, []);
  if (loading) {
    return <Fallback />;
  }

  if (error) {
    return <h1>There was a error </h1>;
  }

  return (
    <Container fluid>
      {' '}
      <Row>
        {data?.data?.posts.map(post => (
          <Col sm={12} md={6} lg={4}>
            {' '}
            <Card style={{ width: '20rem' }} className="m-2">
              <Card.Img variant="top" src={post.image} />
              <Card.Body>
                <Card.Title>{post.writeup}</Card.Title>
                <img src={post.avatar} alt="avatar" />
                <Card.Text>firstname :{post.firstName}</Card.Text>
                <Card.Text>lastname :{post.lastName}</Card.Text>
              </Card.Body>
            </Card>{' '}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Posts;
