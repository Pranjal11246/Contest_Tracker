// src/services/contestService.js
import api from './api';

export const contestService = {
  /**
   * GET /contests/allcontests
   * Returns Contest[]
   */
  getAll: async () => {
    try {
      const { data } = await api.get('/contests/allcontests');
      return data;
    } catch {
      // Return mock data if backend unreachable
      return getMockContests();
    }
  },

  /**
   * POST /contests/savecontest
   */
  save: async (contest) => {
    const { data } = await api.post('/contests/savecontest', contest);
    return data;
  },
};

// ── Mock data for demo / offline ──
function getMockContests() {
  const now = new Date();
  const add = (h) => new Date(now.getTime() + h * 3600000).toISOString();
  const sub = (h) => new Date(now.getTime() - h * 3600000).toISOString();

  return [
    {
      id: 'mock-1',
      title: 'Codeforces Round #945 (Div. 2)',
      platform: 'Codeforces',
      url: 'https://codeforces.com/contests',
      start: add(2),
      end: add(4),
      duration: 120,
      status: 'UPCOMING',
    },
    {
      id: 'mock-2',
      title: 'LeetCode Weekly Contest 402',
      platform: 'LeetCode',
      url: 'https://leetcode.com/contest/',
      start: add(26),
      end: add(27.5),
      duration: 90,
      status: 'UPCOMING',
    },
    {
      id: 'mock-3',
      title: 'CodeChef Starters 138',
      platform: 'CodeChef',
      url: 'https://www.codechef.com/contests',
      start: add(50),
      end: add(53),
      duration: 180,
      status: 'UPCOMING',
    },
    {
      id: 'mock-4',
      title: 'AtCoder Beginner Contest 361',
      platform: 'AtCoder',
      url: 'https://atcoder.jp/contests/',
      start: add(100),
      end: add(102),
      duration: 100,
      status: 'UPCOMING',
    },
    {
      id: 'mock-5',
      title: 'Codeforces Round #944 (Div. 1+2)',
      platform: 'Codeforces',
      url: 'https://codeforces.com/contests',
      start: sub(5),
      end: sub(2.5),
      duration: 150,
      status: 'PAST',
    },
    {
      id: 'mock-6',
      title: 'HackerRank Week of Code 44',
      platform: 'HackerRank',
      url: 'https://www.hackerrank.com/contests',
      start: sub(48),
      end: sub(41),
      duration: 420,
      status: 'PAST',
    },
    {
      id: 'mock-7',
      title: 'TopCoder SRM 851',
      platform: 'TopCoder',
      url: 'https://www.topcoder.com/challenges',
      start: add(1),
      end: add(2.5),
      duration: 90,
      status: 'ONGOING',
    },
    {
      id: 'mock-8',
      title: 'LeetCode Biweekly Contest 132',
      platform: 'LeetCode',
      url: 'https://leetcode.com/contest/',
      start: add(75),
      end: add(76.5),
      duration: 90,
      status: 'UPCOMING',
    },
  ];
}
