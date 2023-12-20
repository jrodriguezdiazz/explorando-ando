import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Button, Container, Pagination, Spinner, Table as BootstrapTable} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const Table = ({columns, rows, title, link, actions: Actions}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (!rows.length) {
    return <Spinner animation="border" />;
  }

  const handleChangePage = (number) => {
    setPage(number);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <div className="d-flex justify-content-between mb-4">
        <h4>{title}</h4>
        {!!link && (
          <Button variant="primary">
            <Link to={link} style={{color: '#ffffff'}}>
              AGREGAR {title.toUpperCase()}
            </Link>
          </Button>
        )}
      </div>

      <BootstrapTable striped bordered hover>
        <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>{column.label}</th>
          ))}
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
          <tr key={`row-${rowIndex}`}>
            {columns.map((column) => (
              <td key={`cell-${column.id}`}>{row[column.id]}</td>
            ))}
            <td>{<Actions id={row.id} />}</td>
          </tr>
        ))}
        </tbody>
      </BootstrapTable>

      <Pagination>
        <Pagination.Prev onClick={() => handleChangePage(page - 1)} disabled={page === 0} />
        {Array.from({length: Math.ceil(rows.length / rowsPerPage)}, (_, i) => (
          <Pagination.Item key={i} active={i === page} onClick={() => handleChangePage(i)}>
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handleChangePage(page + 1)} disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1} />
      </Pagination>
    </Container>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  actions: PropTypes.func.isRequired,
};
