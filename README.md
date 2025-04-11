# DonateNow ✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**DonateNow is a curated directory designed to help users discover and connect directly with verified humanitarian organizations. Our goal is to foster confident and transparent giving by providing clear information and easy access to trustworthy causes.**

**Status:** 🚧 Currently in Active Development & Conceptual Phase 🚧

---


## ✨ Live Demo

Experience **DonateNow** live on Netlify:

**[https://peppy-tartufo-3709f8.netlify.app/](https://peppy-tartufo-3709f8.netlify.app/)**

---


## 🚀 Core Features

*   **Curated Directory:** Browse a list of humanitarian organizations.
*   **(Conceptual) Verification:** Organizations are intended to be vetted based on transparency and impact (currently illustrative, marked with verification status and date).
*   **Direct Links:** Provides direct website links for users to visit and donate via the organizations' official platforms. **DonateNow** does not handle payments.
*   **Search Functionality:** Search organizations by name, focus keyword, or region.
*   **Dynamic Filtering:** Filter the list by specific Categories (e.g., Medical Aid, Children) and Regions (e.g., Global, Africa, Palestine). Multiple filters can be applied.
*   **Sorting Options:** Sort organizations alphabetically (A-Z, Z-A), by recently verified date, or show favorites first.
*   **Favorites System:** Mark organizations as favorites using a simple heart icon. Favorites are saved locally in the user's browser via `localStorage`.
*   **Responsive Design:** Aims for usability across different screen sizes.
*   **Static Site:** Built entirely with frontend technologies, making it fast and easy to host.

---

## 🔧 Tech Stack

*   **HTML5:** Semantic structure for content.
*   **CSS3:** Basic styling and custom rules (in `css/style.css`).
*   **Tailwind CSS (v3 via CDN):** Utility-first CSS framework for rapid UI development.
*   **Vanilla JavaScript (ES6+):** For all dynamic functionality including:
    *   DOM manipulation
    *   Filtering, searching, and sorting logic
    *   Event handling
    *   Managing favorites using `localStorage`
    *   Loading data from `data/organizations.js`

---

## 💻 Running Locally

No complex build process is required!

1.  Clone this repository:
    ```bash
    git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
    cd YOUR_REPOSITORY_NAME
    ```
    *(Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME`)*
2.  Open the `index.html` file directly in your web browser.

---

## ☁️ Deployment

This site is deployed as a static website using **Netlify**.

*   **Platform:** [Netlify](https://www.netlify.com/)
*   **Live URL:** [https://peppy-tartufo-3709f8.netlify.app/](https://peppy-tartufo-3709f8.netlify.app/)
*   **Deployment Trigger:** Automatic deployment on push to the `main` branch (if connected via Git).
*   **Build Command:** None required (it's a static site).
*   **Publish Directory:** `/` (Root directory).

---

## 🤝 Contributing & Forking

Contributions, suggestions, and bug reports are welcome!

**Contributing:**

1.  **Fork** the repository on GitHub.
2.  **Clone** your fork locally (`git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git`). *(Replace placeholders)*
3.  Create a new **branch** for your feature or fix (`git checkout -b feature/your-feature-name`).
4.  Make your changes and **commit** them (`git commit -m "Add your commit message"`).
5.  **Push** your changes to your fork on GitHub (`git push origin feature/your-feature-name`).
6.  Open a **Pull Request** from your fork's branch to the main repository's `main` branch. Please provide a clear description of your changes.

**Forking for Personal Use:**

Feel free to fork this repository if you find the structure useful for your own projects, respecting the MIT License.

---

## 🌱 Future Development

**DonateNow** is currently a conceptual demonstration. Future enhancements could include:

*   **Implementing a Robust Verification System:** Moving beyond the conceptual stage to a reliable method for vetting organizations.
*   **Backend Integration:** Introducing a backend (e.g., using serverless functions or a simple API) to:
    *   Manage organization data more effectively (e.g., in a database).
    *   Allow for easier updates without changing frontend code.
    *   Potentially implement user accounts (if desired for features like persistent favorites across devices).
*   **Expanding the Directory:** Adding significantly more verified organizations.
*   **Refined UI/UX:** Further improvements to user interface elements and overall user experience based on feedback.
*   **Accessibility Audit:** Ensuring the site meets high accessibility standards (WCAG).
*   **Localization/i18n:** Adding support for multiple languages.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgements

* Gratitude to the open-source community and the creators of Tailwind CSS.
* Thanks to Netlify for providing excellent free hosting for static sites.
