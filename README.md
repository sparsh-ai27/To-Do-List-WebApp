# ☑️ TODO-List Web App

A simple, client-side To-Do List application built with **HTML5**, **CSS3**, and **JavaScript (ES6)**. No server or framework required — just open `index.html` in your browser.

---

## 📸 Features

- **Add Tasks** — Create new tasks with a priority level (Low / Medium / High)
- **Edit Tasks** — Update task name and priority via a modal dialog
- **Delete Tasks** — Remove tasks you no longer need
- **Mark as Done** — Toggle tasks between completed and pending
- **Filter Tasks** — View All, Pending, or Completed tasks
- **Task Counter** — Live count of total, completed, and pending tasks
- **Persistent Storage** — All data is saved in `localStorage` (survives browser refresh)

---

## 🛠️ Technologies Used

| Technology | Purpose                         |
|------------|---------------------------------|
| HTML5      | Structure & semantic elements   |
| CSS3       | Styling, layout & responsive    |
| JavaScript | Interactivity & data management |

---

## 📂 Project Structure

```
TODO-List/
├── index.html      # Main HTML page (semantic HTML5)
├── style.css       # All styles (responsive, modern design)
├── script.js       # Application logic (CRUD, filters, localStorage)
└── README.md       # Project documentation
```

---

## 🚀 How to Run

1. **Clone or download** this project.
2. Open `index.html` directly in any modern web browser (Chrome, Firefox, Edge, etc.).
3. That's it — no server, no build step, no dependencies!

```bash
# Or serve locally with Python (optional)
python3 -m http.server 8000 --directory TODO-List
# Then visit http://localhost:8000
```

---

## 📚 HTML Concepts Demonstrated

This project showcases fundamental HTML concepts commonly taught in college courses:

- **Semantic Elements** — `<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`, `<details>`, `<summary>`
- **Forms** — `<form>`, `<fieldset>`, `<legend>`, `<label>`, `<input>`, `<select>`, `<button>`
- **Tables** — `<table>`, `<thead>`, `<tbody>`, `<caption>`, `<th>`, `<td>`, `scope` attribute
- **Text Formatting** — `<strong>`, `<em>`, `<mark>`, `<code>`, `<abbr>`, `<blockquote>`, `<cite>`
- **Lists** — `<ul>`, `<ol>`, `<li>`
- **Links & Navigation** — `<a>` with anchor links (`#section-id`)
- **Meta Tags** — `charset`, `viewport`, `description`, `author`
- **HTML Entities** — `&copy;`, `&bull;`, `&#10004;`, `&mdash;`, etc.
- **Accessibility** — proper `<label for="">` associations, `scope="col"` on table headers
- **Comments** — HTML comments for code organization

---

## 🎨 CSS Highlights

- CSS Reset (`* { box-sizing: border-box }`)
- Flexbox layout
- CSS Gradient (`linear-gradient`) for header
- Sticky navigation bar
- Hover & active transitions on buttons
- Responsive design with `@media` queries
- Alternating table row colors (`:nth-child(even)`)
- Badge-style priority and status indicators

---

## ⚙️ JavaScript Highlights

- `localStorage` for data persistence
- DOM manipulation (`createElement`, `innerHTML`, `addEventListener`)
- Array methods (`filter`, `find`, `forEach`)
- Event handling (form submit, click, modal overlay)
- Dynamic HTML generation (table rows)
- Filter system with active state management

---

## 👤 Author

**Sparsh Varshney**

---

## 📄 License

This project is open source and available for educational purposes.
