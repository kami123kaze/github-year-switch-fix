# 🗕 GitHub Contribution Calendar — Fixed Version

This is a refined version of the GitHub-style contribution calendar built using React and the GitHub GraphQL API. It corrects a key UX issue found in the original version and improves the onboarding experience for users.

---

## What Was Wrong in the Original?

In the original implementation:

- Switching years (e.g. 2023 to 2024) added new entries to the browser history.
- This meant clicking the back button didn’t immediately take you back — you'd have to press it multiple times just to leave the page.
- The calendar triggered a full page reload on each year switch, breaking the smooth single-page experience.
- The month labels above the contribution calendar were misaligned, especially when months didn’t start at the beginning of a week.


## What’s Fixed Here

- **Browser History Clean-up & no unnecessary re-renders**: Year selection now updates the calendar without altering browser history or triggering unnecessary page navigations.

## How It’s Fixed

- **URL Decoupling**: Instead of changing the browser’s address bar (which adds to history), I used internal state to track the selected year. This prevents unnecessary history entries and page reloads.
- **Internal State Navigation**: Instead of relying on URL-based navigation (which causes extra browser history entries like GitHub’s version), I used internal state to switch years without altering the URL or triggering full page reloads.


##  Stack

* React
* GitHub GraphQL API
* Tailwind CSS
* Axios

---

##  Local Setup

1. Clone the repo
2. Create a `.env` file and add your GitHub personal access token:

   ```env
   VITE_GITHUB_TOKEN=your_github_token
   ```
3. Run the development server:

   ```bash
   npm install
   npm run dev
   ```

---

##  Why This Matters

Small UX bugs like broken back button behavior can significantly disrupt user experience and trust. This project shows how thoughtful, detail-oriented fixes can make a huge difference.

Feel free to fork, extend, or contribute (or get me a job ;)!

---

Made by [Divyansh Chauhan](https://github.com/kami123kaze)
