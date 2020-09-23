import React from 'react';
import { useQuery } from 'react-apollo';
import * as Api from './Api';
export default function Details() {
  const { loading, error, data } = useQuery(Api.GET_REPO_LIST, {
    variables: { queryString: 'react' },
  });

  if (loading) return <p>Loading...</p>;
  console.log(error);
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <React.Fragment>
      {data &&
        data.search.edges.length > 0 &&
        data.search.edges.map((item, idx) => (
          <div key={idx} className='repo'>
            <a href={item.node.url}> {item.node.name}</a>
            <br />
            <span> {item.node.description}</span>
            <br />
          </div>
        ))}
    </React.Fragment>
  );
}
