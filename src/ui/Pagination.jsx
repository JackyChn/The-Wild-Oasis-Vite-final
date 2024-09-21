import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currPage = Number(searchParams.get("page")) || 1;
  const pageNum = Math.ceil(count / PAGE_SIZE); // total page number
  const prevPage = () => {
    const prev = currPage === 1 ? currPage : currPage - 1; // check if the page has reach the first page, if so then stay at current page
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };
  const nextPage = () => {
    const next = currPage === pageNum ? currPage : currPage + 1; // check if the page has reach the last page, if so then stay at current page
    searchParams.set("page", next);
    setSearchParams(searchParams);
  };
  return (
    <StyledPagination>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <P>
          Page <span>{currPage}</span> out of <span>{pageNum}</span>
        </P>
        <PaginationButton onClick={nextPage} disabled={currPage === pageNum}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
      <span>Find {count} results</span>
    </StyledPagination>
  );
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Pagination;
