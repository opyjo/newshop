import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../slices/ProductsApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  // A function to handle rendering based on the state
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      );
    }
    return (
      <>
        <h1>Latest Products</h1>
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </>
    );
  };

  return <>{renderContent()}</>;
};

export default HomeScreen;
