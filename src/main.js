import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="app">

    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="logo">
        <span class="logo-icon">📚</span>
        <span>BookMind<span class="logo-ai"> AI</span></span>
      </div>

      <div class="nav-links">
        <a href="#home">Home</a>
        <a href="#discover">Discover</a>
        <a href="#popular">Popular</a>
        <a href="#ai">AI Assistant</a>
      </div>

      <button class="get-started" id="getStartedBtn">
        Get Started
      </button>
    </nav>


    <!-- HERO -->
    <section class="hero" id="home">

      <div class="badge">
        ✨ Personalized book discovery
      </div>

      <h1>
        Find your next
        <span>favorite book.</span>
      </h1>

      <p class="hero-text">
        Search by genre, mood, author, title, or describe exactly
        what you want to read.
      </p>

      <div class="search-box">

        <span class="search-icon">🔍</span>

        <input
          type="text"
          id="searchInput"
          placeholder="Try: fantasy romance, mystery thriller..."
        />

        <button id="recommendBtn">
          ✨ Recommend
        </button>

      </div>

      <p id="searchMessage" class="search-message"></p>

      <div id="recommendations" class="recommendations"></div>

    </section>


    <!-- POPULAR -->
    <section class="books-section" id="popular">

      <div class="section-heading">

        <div>
          <p class="small-title">TRENDING NOW</p>

          <h2>Popular Reads</h2>

          <p class="section-description">
            Highly rated and widely read books from Open Library.
          </p>
        </div>

      </div>

      <div id="popularBooks" class="book-grid">

        <div class="popular-loading">
          📚 Loading popular books...
        </div>

      </div>

    </section>


    <!-- AI -->
    <section class="ai-section" id="ai">

      <div class="ai-content">

        <div class="ai-icon">
          ✨
        </div>

        <p class="small-title">
          PERSONAL READING ASSISTANT
        </p>

        <h2>
          Not sure what to read?
          <span>Just describe it.</span>
        </h2>

        <p>
          Try things like "dark fantasy with romance",
          "mystery books for beginners", or "books like Harry Potter".
        </p>

        <button class="ai-button" id="aiButton">
          🤖 Try BookMind
        </button>

      </div>

    </section>


    <!-- BOOK DETAILS MODAL -->
    <div class="book-modal hidden" id="bookModal">

      <div class="modal-backdrop" id="modalBackdrop"></div>

      <div class="modal-window">

        <button class="modal-close" id="modalClose">
          ×
        </button>

        <div id="modalBody">

          <div class="modal-loading">
            <div class="spinner"></div>
            <p>Loading book details...</p>
          </div>

        </div>

      </div>

    </div>


    <!-- FOOTER -->
    <footer>

      <div class="footer-logo">
        📚 BookMind AI
      </div>

      <p>
        Discover books you'll love.
      </p>

      <p class="copyright">
        © 2026 BookMind AI
      </p>

    </footer>

  </div>
`


// ========================================
// ELEMENTS
// ========================================

const recommendButton =
  document.querySelector('#recommendBtn')

const searchInput =
  document.querySelector('#searchInput')

const searchMessage =
  document.querySelector('#searchMessage')

const recommendations =
  document.querySelector('#recommendations')

const popularBooks =
  document.querySelector('#popularBooks')

const getStartedBtn =
  document.querySelector('#getStartedBtn')

const aiButton =
  document.querySelector('#aiButton')

const bookModal =
  document.querySelector('#bookModal')

const modalBody =
  document.querySelector('#modalBody')

const modalClose =
  document.querySelector('#modalClose')

const modalBackdrop =
  document.querySelector('#modalBackdrop')


// ========================================
// GENRE PROFILES
// ========================================

const GENRE_PROFILES = {

  anime: {
    aliases: ['anime'],
    required: ['manga']
  },

  manga: {
    aliases: ['manga', 'japanese comics'],
    required: ['manga']
  },

  romance: {
    aliases: ['romance', 'romantic'],
    required: ['romance']
  },

  fantasy: {
    aliases: ['fantasy'],
    required: ['fantasy']
  },

  mystery: {
    aliases: ['mystery', 'detective'],
    required: ['mystery', 'detective', 'crime']
  },

  thriller: {
    aliases: ['thriller'],
    required: ['thriller']
  },

  horror: {
    aliases: ['horror'],
    required: ['horror']
  },

  scienceFiction: {
    aliases: [
      'science fiction',
      'sci fi',
      'sci-fi'
    ],
    required: [
      'science fiction',
      'science',
      'fiction'
    ]
  },

  historical: {
    aliases: [
      'historical',
      'historical fiction'
    ],
    required: [
      'historical'
    ]
  },

  biography: {
    aliases: [
      'biography',
      'biographies',
      'autobiography',
      'memoir'
    ],
    required: [
      'biography',
      'memoir',
      'autobiography'
    ]
  },

  selfHelp: {
    aliases: [
      'self help',
      'self-help',
      'personal development'
    ],
    required: [
      'self help',
      'self-help',
      'personal development'
    ]
  },

  philosophy: {
    aliases: ['philosophy', 'philosophical'],
    required: ['philosophy']
  },

  poetry: {
    aliases: ['poetry', 'poems', 'poem'],
    required: ['poetry']
  },

  adventure: {
    aliases: ['adventure'],
    required: ['adventure']
  },

  crime: {
    aliases: ['crime', 'criminal'],
    required: ['crime', 'criminal']
  },

  business: {
    aliases: [
      'business',
      'entrepreneurship',
      'management'
    ],
    required: [
      'business',
      'entrepreneurship',
      'management'
    ]
  },

  psychology: {
    aliases: ['psychology', 'psychological'],
    required: ['psychology']
  },

  youngAdult: {
    aliases: [
      'young adult',
      'ya'
    ],
    required: [
      'young adult'
    ]
  },

  children: {
    aliases: [
      'children',
      "children's",
      'childrens'
    ],
    required: [
      'children',
      "children's"
    ]
  }

}


// ========================================
// HELPERS
// ========================================

function normalizeText(value = '') {

  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}


function escapeHTML(value = '') {

  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}


function number(value) {

  const n = Number(value)

  return Number.isFinite(n) ? n : 0
}


function getCover(book, size = 'L') {

  if (book.cover_i) {

    return `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`

  }

  return 'https://placehold.co/300x450/f0ebff/7657e8?text=No+Cover'
}


function getAuthors(book) {

  return book.author_name?.join(', ')
    || 'Unknown author'
}


function getSubjects(book) {

  return Array.isArray(book.subject)
    ? book.subject
    : []
}


function getWorkId(key) {

  return String(key || '')
    .replace('/works/', '')
    .replace('works/', '')
    .trim()
}


// ========================================
// DETECT GENRES
// ========================================

function detectGenres(query) {

  const normalized = normalizeText(query)

  const detected = []


  for (const [key, profile] of Object.entries(GENRE_PROFILES)) {

    const matched = profile.aliases.some(alias => {

      return normalized.includes(
        normalizeText(alias)
      )

    })

    if (matched) {
      detected.push(key)
    }

  }

  return detected
}


// ========================================
// GET MATCHABLE GENRE WORDS
// ========================================

function getRequiredWords(genres) {

  const words = []

  for (const genre of genres) {

    for (const word of GENRE_PROFILES[genre].required) {

      words.push(normalizeText(word))

    }

  }

  return words
}


// ========================================
// SUBJECT MATCH
// ========================================

function matchesGenre(book, genres) {

  if (genres.length === 0) {
    return true
  }


  const subjects = normalizeText(
    getSubjects(book).join(' ')
  )


  const title = normalizeText(
    book.title || ''
  )


  for (const genre of genres) {

    const required =
      GENRE_PROFILES[genre].required


    const genreMatches =
      required.some(word => {

        return (
          subjects.includes(
            normalizeText(word)
          )
          ||
          title.includes(
            normalizeText(word)
          )
        )

      })


    if (!genreMatches) {
      return false
    }

  }


  return true
}


// ========================================
// SCORE RECOMMENDATION
// ========================================

function scoreBook(book, query, genres) {

  const q = normalizeText(query)

  const title =
    normalizeText(book.title || '')

  const author =
    normalizeText(
      getAuthors(book)
    )

  const subjects =
    normalizeText(
      getSubjects(book).join(' ')
    )


  const words =
    q.split(' ')
      .filter(word => word.length > 2)


  let score = 0


  // Exact title match
  if (title === q) {
    score += 100
  }


  // Title phrase
  if (title.includes(q)) {
    score += 55
  }


  // Individual query words
  for (const word of words) {

    if (title.includes(word)) {
      score += 20
    }

    if (author.includes(word)) {
      score += 12
    }

    if (subjects.includes(word)) {
      score += 15
    }

  }


  // Strong genre matching
  for (const genre of genres) {

    const profile =
      GENRE_PROFILES[genre]

    for (const word of profile.required) {

      if (
        subjects.includes(
          normalizeText(word)
        )
      ) {

        score += 45

      }

    }

  }


  // Rating
  const rating =
    number(book.ratings_average)

  score += rating * 4


  // Rating count
  score += Math.min(
    Math.log10(
      number(book.ratings_count) + 1
    ) * 5,
    25
  )


  // Reading activity
  score += Math.min(
    Math.log10(
      number(book.readinglog_count) + 1
    ) * 3,
    15
  )


  // Number of editions
  score += Math.min(
    Math.log10(
      number(book.edition_count) + 1
    ) * 2,
    10
  )


  // Require genre match
  if (
    genres.length > 0 &&
    !matchesGenre(book, genres)
  ) {

    return -10000

  }


  return score
}


// ========================================
// API FIELDS
// ========================================

const SEARCH_FIELDS = [
  'key',
  'title',
  'author_name',
  'cover_i',
  'first_publish_year',
  'subject',
  'ratings_average',
  'ratings_count',
  'readinglog_count',
  'edition_count',
  'first_sentence',
  'language'
].join(',')


// ========================================
// SEARCH BOOKS
// ========================================

async function searchBooks(query) {

  const genres =
    detectGenres(query)


  let searchQueries = []


  // Genre request
  if (genres.length > 0) {

    for (const genre of genres) {

      const profile =
        GENRE_PROFILES[genre]

      for (const alias of profile.aliases) {

        searchQueries.push(
          `subject:"${alias}"`
        )

      }

    }

    // Also perform normal search
    searchQueries.push(query)

  } else {

    // Specific title/author/general search
    searchQueries.push(query)

  }


  const requests =
    [...new Set(searchQueries)]
      .slice(0, 7)
      .map(searchQuery => {

        const url =
          `https://openlibrary.org/search.json` +
          `?q=${encodeURIComponent(searchQuery)}` +
          `&fields=${encodeURIComponent(SEARCH_FIELDS)}` +
          `&limit=30`

        return fetch(url)
      })


  const responses =
    await Promise.all(requests)


  const datasets = []


  for (const response of responses) {

    if (response.ok) {

      datasets.push(
        await response.json()
      )

    }

  }


  const unique =
    new Map()


  for (const data of datasets) {

    for (const book of data.docs || []) {

      if (!book.key) continue

      if (!unique.has(book.key)) {
        unique.set(book.key, book)
      }

    }

  }


  const ranked =
    [...unique.values()]
      .map(book => {

        return {
          ...book,
          score:
            scoreBook(
              book,
              query,
              genres
            )
        }

      })
      .filter(book => book.score > -10000)
      .sort(
        (a, b) => b.score - a.score
      )


  return {
    books: ranked.slice(0, 12),
    genres
  }

}


// ========================================
// CREATE BOOK CARD
// ========================================

function createBookCard(book, rank = null) {

  const title =
    escapeHTML(
      book.title || 'Unknown title'
    )

  const author =
    escapeHTML(
      getAuthors(book)
    )

  const cover =
    getCover(book, 'L')


  const rating =
    number(book.ratings_average)


  const ratingCount =
    number(book.ratings_count)


  const year =
    book.first_publish_year
      || 'Unknown'


  const subjects =
    getSubjects(book)
      .slice(0, 3)
      .map(subject =>
        escapeHTML(subject)
      )
      .join(' • ')


  return `

    <article
      class="recommendation-card"
      data-work-key="${escapeHTML(book.key)}"
    >

      ${
        rank
          ? `<div class="rank-badge">#${rank}</div>`
          : ''
      }

      <div class="recommendation-cover-wrap">

        <img
          src="${cover}"
          alt="${title}"
          class="recommendation-cover"
          loading="lazy"
        >

      </div>


      <div class="recommendation-info">

        <h3>${title}</h3>

        <p class="book-author">
          ${author}
        </p>


        <div class="book-rating">

          ${
            rating > 0
              ? `⭐ ${rating.toFixed(1)}`
              : 'No rating'
          }

          ${
            ratingCount > 0
              ? `<span> · ${ratingCount.toLocaleString()} ratings</span>`
              : ''
          }

        </div>


        ${
          subjects
            ? `
              <div class="book-subjects">
                ${subjects}
              </div>
            `
            : ''
        }


        <div class="book-year">
          📅 ${year}
        </div>


        <button
          class="view-book"
          data-work-key="${escapeHTML(book.key)}"
        >
          View Book →
        </button>

      </div>

    </article>

  `
}


// ========================================
// RECOMMENDATION BUTTON
// ========================================

recommendButton.addEventListener(
  'click',
  async () => {

    const query =
      searchInput.value.trim()


    if (!query) {

      searchMessage.textContent =
        '📚 Tell me what you want to read.'

      recommendations.innerHTML = ''

      return

    }


    recommendButton.disabled = true

    recommendButton.textContent =
      '✨ Finding...'


    searchMessage.textContent =
      `🔎 Understanding "${query}"...`


    recommendations.innerHTML = `

      <div class="recommendation-loading">

        <div class="spinner"></div>

        <p>
          Matching genres, subjects, ratings,
          and reader activity...
        </p>

      </div>

    `


    try {

      const result =
        await searchBooks(query)


      if (result.books.length === 0) {

        searchMessage.textContent =
          `😕 No strong matches found for "${query}".`

        recommendations.innerHTML = ''

        return

      }


      if (result.genres.length > 0) {

        searchMessage.textContent =
          `✨ ${result.books.length} strong matches found`

      } else {

        searchMessage.textContent =
          `✨ Best matches for "${query}"`

      }


      recommendations.innerHTML =
        result.books
          .map((book, index) =>
            createBookCard(
              book,
              index + 1
            )
          )
          .join('')


    } catch (error) {

      console.error(error)

      searchMessage.textContent =
        '❌ Could not load recommendations.'

      recommendations.innerHTML = `

        <div class="error-message">
          Please try again.
        </div>

      `

    } finally {

      recommendButton.disabled = false

      recommendButton.textContent =
        '✨ Recommend'

    }

  }
)


// ========================================
// POPULAR BOOKS
// ========================================

async function loadPopularBooks() {

  try {

    const url =
      `https://openlibrary.org/search.json` +
      `?q=ratings_count:[500%20TO%20*]` +
      `&fields=${encodeURIComponent(SEARCH_FIELDS)}` +
      `&limit=60`


    const response =
      await fetch(url)


    if (!response.ok) {
      throw new Error(
        'Popular request failed'
      )
    }


    const data =
      await response.json()


    const unique =
      new Map()


    for (const book of data.docs || []) {

      if (!book.key) continue

      if (!book.cover_i) continue

      if (!unique.has(book.key)) {
        unique.set(book.key, book)
      }

    }


    const books =
      [...unique.values()]
        .sort((a, b) => {

          const scoreA =
            Math.log10(
              number(a.ratings_count) + 1
            ) * 0.5
            +
            Math.log10(
              number(a.readinglog_count) + 1
            ) * 0.3
            +
            Math.log10(
              number(a.edition_count) + 1
            ) * 0.15
            +
            number(a.ratings_average) * 0.05


          const scoreB =
            Math.log10(
              number(b.ratings_count) + 1
            ) * 0.5
            +
            Math.log10(
              number(b.readinglog_count) + 1
            ) * 0.3
            +
            Math.log10(
              number(b.edition_count) + 1
            ) * 0.15
            +
            number(b.ratings_average) * 0.05


          return scoreB - scoreA

        })
        .slice(0, 8)


    popularBooks.innerHTML =
      books
        .map((book, index) =>
          createBookCard(
            book,
            index + 1
          )
        )
        .join('')


  } catch (error) {

    console.error(error)

    popularBooks.innerHTML = `

      <div class="error-message">
        Unable to load popular books.
      </div>

    `

  }

}


// ========================================
// OPEN BOOK DETAILS
// ========================================

async function openBookDetails(workKey) {

  bookModal.classList.remove(
    'hidden'
  )


  document.body.style.overflow =
    'hidden'


  modalBody.innerHTML = `

    <div class="modal-loading">

      <div class="spinner"></div>

      <p>
        Loading book details...
      </p>

    </div>

  `


  const workId =
    getWorkId(workKey)


  try {

    const workURL =
      `https://openlibrary.org/works/${workId}.json`


    const ratingsURL =
      `https://openlibrary.org/works/${workId}/ratings.json`


    const [workResponse, ratingsResponse] =
      await Promise.all([
        fetch(workURL),
        fetch(ratingsURL)
      ])


    if (!workResponse.ok) {
      throw new Error(
        'Work details failed'
      )
    }


    const work =
      await workResponse.json()


    const ratings =
      ratingsResponse.ok
        ? await ratingsResponse.json()
        : null


    const title =
      escapeHTML(
        work.title || 'Unknown title'
      )


    const authors =
      Array.isArray(work.authors)
        ? work.authors
            .map(author =>
              author.author?.key || author.name
            )
            .filter(Boolean)
            .join(', ')
        : 'Unknown author'


    let description = ''


    if (
      typeof work.description ===
      'string'
    ) {

      description =
        work.description

    } else if (
      work.description?.value
    ) {

      description =
        work.description.value

    }


    if (!description) {

      description =
        'A detailed summary is not available for this book in the catalog.'

    }


    description =
      escapeHTML(description)


    const average =
      number(
        ratings?.summary?.average
      )


    const count =
      number(
        ratings?.summary?.count
      )


    const ratingAverage =
      average ||
      number(work.rating_average)


    const ratingCount =
      count ||
      number(work.ratings_count)


    const coverId =
      work.covers?.[0]


    const cover =
      coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : 'https://placehold.co/320x480/f0ebff/7657e8?text=No+Cover'


    const subjects =
      Array.isArray(work.subjects)
        ? work.subjects
            .slice(0, 12)
            .map(subject =>
              `<span>${escapeHTML(subject)}</span>`
            )
            .join('')
        : ''


    const openLibraryURL =
      `https://openlibrary.org/works/${workId}`


    modalBody.innerHTML = `

      <div class="book-detail">

        <div class="detail-cover">

          <img
            src="${cover}"
            alt="${title}"
          >

        </div>


        <div class="detail-content">

          <p class="detail-label">
            BOOK DETAILS
          </p>

          <h2>
            ${title}
          </h2>


          <p class="detail-author">
            ${escapeHTML(authors)}
          </p>


          <div class="detail-rating">

            <strong>
              ${
                ratingAverage
                  ? `⭐ ${ratingAverage.toFixed(1)}`
                  : 'No rating'
              }
            </strong>

            ${
              ratingCount
                ? `
                  <span>
                    ${ratingCount.toLocaleString()} ratings
                  </span>
                `
                : ''
            }

          </div>


          ${
            subjects
              ? `
                <div class="detail-subjects">
                  ${subjects}
                </div>
              `
              : ''
          }


          <div class="summary-section">

            <h3>
              📖 Book Summary
            </h3>

            <p>
              ${description}
            </p>

          </div>


          <div class="detail-actions">

            <button
              class="save-detail"
              data-title="${title}"
            >
              ♡ Save to Library
            </button>

            <a
              href="${openLibraryURL}"
              target="_blank"
              rel="noopener noreferrer"
              class="open-library"
            >
              Open Library ↗
            </a>

          </div>

        </div>

      </div>

    `

  } catch (error) {

    console.error(error)

    modalBody.innerHTML = `

      <div class="error-message">

        ❌ Unable to load the book details.

      </div>

    `

  }

}


// ========================================
// CARD CLICK
// ========================================

document.addEventListener(
  'click',
  event => {

    const card =
      event.target.closest(
        '.recommendation-card'
      )


    const viewButton =
      event.target.closest(
        '.view-book'
      )


    if (viewButton) {

      event.stopPropagation()

      openBookDetails(
        viewButton.dataset.workKey
      )

      return

    }


    if (card) {

      openBookDetails(
        card.dataset.workKey
      )

    }

  }
)


// ========================================
// SAVE BOOK
// ========================================

document.addEventListener(
  'click',
  event => {

    const button =
      event.target.closest(
        '.save-detail'
      )


    if (!button) return


    const title =
      button.dataset.title


    let saved =
      JSON.parse(
        localStorage.getItem(
          'bookmind-library'
        ) || '[]'
      )


    if (!saved.includes(title)) {

      saved.push(title)

      localStorage.setItem(
        'bookmind-library',
        JSON.stringify(saved)
      )

      button.textContent =
        '♥ Saved!'

    } else {

      button.textContent =
        '♥ Already Saved'

    }

  }
)


// ========================================
// CLOSE MODAL
// ========================================

function closeModal() {

  bookModal.classList.add(
    'hidden'
  )

  document.body.style.overflow =
    ''

}


modalClose.addEventListener(
  'click',
  closeModal
)


modalBackdrop.addEventListener(
  'click',
  closeModal
)


document.addEventListener(
  'keydown',
  event => {

    if (
      event.key === 'Escape'
    ) {

      closeModal()

    }

  }
)


// ========================================
// BUTTONS
// ========================================

getStartedBtn.addEventListener(
  'click',
  () => {

    searchInput.focus()

    searchInput.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })

  }
)


aiButton.addEventListener(
  'click',
  () => {

    searchInput.focus()

    searchInput.placeholder =
      'Try: books like The Inheritance Games...'

    searchInput.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })

  }
)


// ========================================
// ENTER KEY
// ========================================

searchInput.addEventListener(
  'keydown',
  event => {

    if (event.key === 'Enter') {
      recommendButton.click()
    }

  }
)


// ========================================
// START
// ========================================

loadPopularBooks()