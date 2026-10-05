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
        <a href="#">Home</a>
        <a href="#">Discover</a>
        <a href="#">Genres</a>
        <a href="#">My Library</a>
      </div>

      <button class="get-started">
        Get Started
      </button>

    </nav>


    <!-- HERO SECTION -->
    <section class="hero">

      <div class="badge">
        ✨ AI-powered book discovery
      </div>

      <h1>
        Find your next
        <span>favorite book.</span>
      </h1>

      <p class="hero-text">
        Tell BookMind AI what you love to read and discover
        books perfectly matched to your taste.
      </p>


      <!-- SEARCH BOX -->
      <div class="search-box">

        <span class="search-icon">🔍</span>

        <input
          type="text"
          id="searchInput"
          placeholder="What are you in the mood to read?"
        />

        <button id="recommendBtn">
          ✨ Recommend
        </button>

      </div>

      <p id="searchMessage" class="search-message"></p>

    </section>


    <!-- BOOK SECTION -->
    <section class="books-section">

      <div class="section-heading">

        <div>
          <p class="small-title">DISCOVER</p>
          <h2>Popular reads</h2>
        </div>

        <button class="view-all">
          View all →
        </button>

      </div>


      <div class="book-grid">

        <!-- BOOK 1 -->
        <div class="book-card">

          <div class="book-cover cover-one">
            <span>📕</span>
          </div>

          <div class="book-info">
            <h3>The Midnight Library</h3>
            <p>Matt Haig</p>
            <div class="rating">⭐ 4.5</div>
          </div>

        </div>


        <!-- BOOK 2 -->
        <div class="book-card">

          <div class="book-cover cover-two">
            <span>📗</span>
          </div>

          <div class="book-info">
            <h3>The Alchemist</h3>
            <p>Paulo Coelho</p>
            <div class="rating">⭐ 4.6</div>
          </div>

        </div>


        <!-- BOOK 3 -->
        <div class="book-card">

          <div class="book-cover cover-three">
            <span>📘</span>
          </div>

          <div class="book-info">
            <h3>Six of Crows</h3>
            <p>Leigh Bardugo</p>
            <div class="rating">⭐ 4.7</div>
          </div>

        </div>


        <!-- BOOK 4 -->
        <div class="book-card">

          <div class="book-cover cover-four">
            <span>📙</span>
          </div>

          <div class="book-info">
            <h3>The Inheritance Games</h3>
            <p>Jennifer Lynn Barnes</p>
            <div class="rating">⭐ 4.5</div>
          </div>

        </div>

      </div>

    </section>


    <!-- AI FEATURE SECTION -->
    <section class="ai-section">

      <div class="ai-content">

        <div class="ai-icon">
          ✨
        </div>

        <p class="small-title">MEET YOUR AI READING ASSISTANT</p>

        <h2>
          Not sure what to read?
          <span>Just ask.</span>
        </h2>

        <p>
          Tell BookMind about your favorite books, your mood,
          or exactly what you're looking for. Our AI will help
          you discover your next great read.
        </p>

        <button class="ai-button">
          🤖 Ask BookMind AI
        </button>

      </div>

    </section>


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


// SEARCH BUTTON
const recommendButton = document.querySelector('#recommendBtn')
const searchInput = document.querySelector('#searchInput')
const searchMessage = document.querySelector('#searchMessage')

recommendButton.addEventListener('click', () => {

  const searchText = searchInput.value.trim()

  if (searchText === '') {

    searchMessage.textContent =
      'Please tell us what you would like to read 📚'

    return
  }

  searchMessage.textContent =
    `✨ Finding books for "${searchText}"...`

})
