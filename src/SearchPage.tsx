import { Component } from 'react';

interface SearchResult {
  name: string;
  birth_year: string;
}

interface SearchPageState {
  searchTerm: string;
  searchResults: SearchResult[];
  loading: boolean;
}

interface SearchPageProps {
  someeNextProp: string;
}

class SearchPage extends Component<
  SearchPageProps | NonNullable<unknown>,
  SearchPageState
> {
  constructor(props: SearchPageProps) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      loading: true,
    };
  }

  fetchData = async (term: string) => {
    try {
      this.setState({ loading: true });
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${term}`
      );
      const data = await response.json();
      this.setState({ searchResults: data.results });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');

    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm.trim() });
      this.fetchData(savedSearchTerm);
    }
  }

  handleSearch = async () => {
    try {
      await this.fetchData(this.state.searchTerm);
      localStorage.setItem('searchTerm', this.state.searchTerm.trim());
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  render() {
    return (
      <div>
        <p style={{ maxWidth: '500px' }}>
          Hi, it&apos;s my new styles solution. I have only 3 hours for this
          task, and there&apos;s nothing in the instructions about styles - so
          it&apos;s a perfect match. I use https://swapi.dev/api, and here you
          can search for characters from Star Wars.
        </p>

        <div>
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={(e) =>
              this.setState({ searchTerm: e.target.value.trim() })
            }
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <div>
          {this.state.loading ? (
            <p>Loading...</p>
          ) : (
            this.state.searchResults.map((result, index) => (
              <div key={index}>
                <h3>{result.name}</h3>
                <p>{result.birth_year}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default SearchPage;
