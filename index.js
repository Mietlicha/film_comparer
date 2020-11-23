const fetchData = async (films) => {
  const config = {
    params: {
      apikey: '48102bd3',
      s: films,
    },
  };
  const response = await axios.get('http://www.omdbapi.com/', config);

  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `

<form>
  <label for="inputSearch">Search for movie</label>
  <input id="inputSearch" type="text" placeholder="type title" />
</form>
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results"></div>
  </div>
</div>
</div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = debounce(async (event) => {
  const movies = await fetchData(event.target.value);

  if (!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }

  resultsWrapper.innerHTML = '';
  dropdown.classList.add('is-active');

  movies.map(({ Poster, Title }) => {
    const option = document.createElement('a');
    const imgSrc = Poster === 'N/A' ? '' : Poster;
    option.classList.add('dropdown-item');
    option.innerHTML = `
    <img src="${imgSrc}" alt="movie poster"/>
    <h3>${Title}</h3>
    `;
    resultsWrapper.appendChild(option);
  });
}, 500);

input.addEventListener('input', onInput);

document.addEventListener('click', (e) => {
  if (!root.contains(e.target)) {
    dropdown.classList.remove('is-active');
  }
});
