import React from 'react'
import { Link } from 'react-router'

export default () => {
  return (
    <div id="header">
      <div id="top-logo">
          <a href="https://daohub.org/index.html"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAABG2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+Gkqr6gAAAYVpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZG/L0NRFMc/WkJoGTRhMHRoDJRQ0rDRRvyISFMkiqV9/SVpeXmvImI0WDsY/IhFIxYzm/gHJBIJJpFYxUBikeY5t5W0ET03997P/d5zzr33XLAtZbSsWT8A2fWcEZ4MuJciy+7GF+ppxUkvHVHN1MdDoVlq2tcDdWq+71O5avv9ay3xhKlBXZPwmKYbOeEp4bmtnK74QNilpaNx4QthryEXFH5SeqzMb4pTJbapnC5jIRwUdgm7U1Ucq2ItbWSFh4U92cym9nsf9RJHYn1xXunSuzAJM0kAN9NMEMTPIKMy+unDR7+sqBHvK8XPsSGxmow62xiskSJNDq+om5I9IXNS9IS0jHiIqT/4W1szOeQrn+CYgYZXy/rsgcZjKO5Z1vepZRULYJe63OxX4jf2YeRd9HxF85xA2y5cXle02Blc5aHzWY8a0ZJkl25LJuHjHJwRaL+D5pVy3X73KTzCwg7M3sLhEXSLf9vqDwgLZzsCXx7eAAAACXBIWXMAAAsTAAALEwEAmpwYAAACCUlEQVRIie2WvUvzUBSHH4sfrRRrKdYUUZCCIgiOKg4iuLqJIMV2Cbi5iYM4+g84iIMILlWJ4OKkLu4iVtRNQQSlpUOjLUiRXIf3vjaJMaU23TzT75yT++Rwcu+5aRITEzTGfA3iNhbd7BBbXiYed4gbBm9vvL6i6zw/c3xMuVwjOh5neLh6VakUR0fs7/P+7pivoyGRCKqKpjEy4ph3qvrLtrc5PKy4fj+KgqIQjTI1xdAQQDjM+jpLSzw81IIulykWK26xSD7PzQ3A3h5zc6gqgQCdnayuoqoIYV7924YIwcEBu7vSHRxketr2SH2bL53m/l7q2VlP0YbBzo7UAwO0t3uHBm5vpWhpYWzMU3Q+T6kkdV+fOWPaIX4/kQhA8/9gMEhPjwX08UE2a6fncvT3A4RCP6AnJ1lbs6xJJkkmLZGnJ+bn7ehsVqI7OsxhL8ZTICCFdaSYqj454fQUYHNTzpCtLdLp6uhoVIpC4Qe0ELbjhGFgGFW4Ph9dXY7ouhvS21v57NYxUjd6dFSKQoGLC+/QwSALC1JfXXk0nv7Z4iLhMIAQaJot6TpUXay1lVSKmRnpnp+TydSCDoUsl2RbG7EYikJ3N+PjxGIy/vLCxsb31a7oRIJEokr5j4+srJDL1Yh2t7s7NI2zM/tpcENnMui6M65UQtfRda6vubx0f3XT34+Z1T4BtSqYFUnBlBQAAAAASUVORK5CYII%3D" />
           &nbsp; The DAO
          </a>
      </div>
      <div id="top-navbar">
      <nav id="bar">
          <ul>
              <li><a href="https://daohub.org/about.html" className="nav-link">About</a></li>&nbsp;
              <li><a href="https://daohub.org/manifesto.html" className="nav-link">Manifesto</a></li>&nbsp;
              <li><a href="https://daohub.org/curator.html" className="nav-link">Curator</a></li>&nbsp;
              <li><a href="https://daohub.org/voting.html" className="nav-link">Voting</a></li>&nbsp;
              <li><a href="https://daohub.org/explainer.html" className="nav-link">Terms</a></li>&nbsp;
      		<li><a href="https://forum.daohub.org" className="nav-link">Forums </a></li>&nbsp;
              <li><a href="http://dao.consider.it" className="nav-link">Polling </a></li>&nbsp;
              <li><a href="https://blog.daohub.org/" className="nav-link" target="_new">Blog </a></li>&nbsp;
      		<li><a href="https://daowiki.atlassian.net/wiki/" className="nav-link">Wiki </a></li>&nbsp;
              <li><a href="http://thedailydao.io/" className="nav-link">DAO news</a></li>&nbsp;
              <li><a href="https://forum.daohub.org/c/theDAO/support" className="nav-link">Support </a></li>
          </ul>
      </nav>
      </div>
      </div>
  )
}
