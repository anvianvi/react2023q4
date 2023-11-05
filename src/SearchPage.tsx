import React, { useState, useEffect } from 'react';

interface SearchResult {
  name: string;
  birth_year: string;
}

interface SearchPageProps {
  someNextProp: string;
}

const SearchPage: React.FC<SearchPageProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (term: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${term}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');

    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm.trim());
      fetchData(savedSearchTerm);
    }
  }, []);

  const handleSearch = async () => {
    try {
      await fetchData(searchTerm);
      localStorage.setItem('searchTerm', searchTerm.trim());
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div>
      <p style={{ maxWidth: '500px' }}>
        Hi, it&apos;s my new styles solution. I have only 3 hours for this task,
        and there&apos;s nothing in the instructions about styles - so it&apos;s
        a perfect match. I use https://swapi.dev/api, and here you can search
        for characters from Star Wars.
      </p>

      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.trim())}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          searchResults.map((result, index) => (
            <div key={index}>
              <h3>{result.name}</h3>
              <p>{result.birth_year}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
