import { Component } from 'react';

class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      query: '',
      loading: false,
      error: null,
    };
  }

  // Fetch when component loads
  componentDidMount() {
    this.fetchData();
  }

  // Detect search change
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    this.setState({ loading: true });

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Fetch failed');

      const result = await res.json();

      const filtered = result.filter((user) =>
        user.name.toLowerCase().includes(this.state.query.toLowerCase())
      );

      this.setState({
        data: filtered,
        error: null,
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: err.message,
        loading: false,
      });
    }
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  render() {
    const { data, loading, error, query } = this.state;

    return (
      <div className="data-fetcher">
        <h1>User Data</h1>

        {error && <div className="error">Error: {error}</div>}

        <input
          value={query}
          onChange={this.handleChange}
          placeholder="Search..."
        />

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map(({ id, name, email, address }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{address.city}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No results</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <button onClick={this.fetchData}>Refresh</button>
      </div>
    );
  }
}

export default DataFetcher;