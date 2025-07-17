export const GET_CONTRIBUTION_CALENDAR = `
  query($login: String!, $from: DateTime, $to: DateTime) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export const GET_USER_BASIC = `
  query($login: String!) {
    user(login: $login) {
      login
      avatarUrl
    }
  }
`;
