import { useUser } from "../hooks/useQuery hooks/useUserQuery";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../ui/Spinner";
import PropTypes from "prop-types";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  // 2. if there's no authenticated user, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 3. while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if there's a user, render the app
  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
