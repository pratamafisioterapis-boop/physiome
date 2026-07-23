// Gamification: badge definitions + evaluation.
//
// Everything here is derived from the patient-stats the backend already
// returns (current streak, average adherence, active programs), so it works
// with the deployed API and lights up as the patient logs sessions.

import { Flame, Sparkles, Trophy, Target, HeartPulse, Award, Rocket, CalendarCheck } from 'lucide-react';

// Each badge: id, title, description, icon, tone, and an `earned(stats)` test.
// `progress(stats)` returns 0..1 for locked badges so we can show a bar.
export const BADGES = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first guided session.',
    icon: Sparkles,
    tone: 'teal',
    earned: (s) => (s.totalSessions ?? 0) >= 1 || (s.streak ?? 0) >= 1 || (s.adherence ?? 0) > 0,
    progress: (s) => Math.min(1, (s.totalSessions ?? ((s.streak ?? 0) > 0 ? 1 : 0))),
  },
  {
    id: 'committed',
    title: 'Committed',
    description: 'Have an active recovery program.',
    icon: CalendarCheck,
    tone: 'blue',
    earned: (s) => (s.activePrograms ?? 0) >= 1,
    progress: (s) => Math.min(1, s.activePrograms ?? 0),
  },
  {
    id: 'on-fire',
    title: 'On Fire',
    description: 'Reach a 3-day streak.',
    icon: Flame,
    tone: 'orange',
    earned: (s) => (s.streak ?? 0) >= 3,
    progress: (s) => Math.min(1, (s.streak ?? 0) / 3),
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Keep a 7-day streak going.',
    icon: Rocket,
    tone: 'orange',
    earned: (s) => (s.streak ?? 0) >= 7,
    progress: (s) => Math.min(1, (s.streak ?? 0) / 7),
  },
  {
    id: 'unstoppable',
    title: 'Unstoppable',
    description: 'Hit a 14-day streak.',
    icon: Trophy,
    tone: 'purple',
    earned: (s) => (s.streak ?? 0) >= 14,
    progress: (s) => Math.min(1, (s.streak ?? 0) / 14),
  },
  {
    id: 'monthly-master',
    title: 'Monthly Master',
    description: 'Achieve a 30-day streak.',
    icon: Award,
    tone: 'gold',
    earned: (s) => (s.streak ?? 0) >= 30,
    progress: (s) => Math.min(1, (s.streak ?? 0) / 30),
  },
  {
    id: 'consistent',
    title: 'Consistent',
    description: 'Maintain 80%+ session completion.',
    icon: Target,
    tone: 'green',
    earned: (s) => (s.adherence ?? 0) >= 80,
    progress: (s) => Math.min(1, (s.adherence ?? 0) / 80),
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Reach 95%+ completion.',
    icon: HeartPulse,
    tone: 'green',
    earned: (s) => (s.adherence ?? 0) >= 95,
    progress: (s) => Math.min(1, (s.adherence ?? 0) / 95),
  },
];

// Streak milestones for "next goal" messaging.
export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100];

export function nextStreakMilestone(streak = 0) {
  return STREAK_MILESTONES.find((m) => m > streak) ?? null;
}

export function evaluateBadges(stats = {}) {
  const earned = [];
  const locked = [];
  for (const badge of BADGES) {
    (badge.earned(stats) ? earned : locked).push(badge);
  }
  return { earned, locked };
}

export const TONE_CLASSES = {
  teal: 'bg-teal-100 text-teal-600 dark:bg-teal-950/40 dark:text-teal-300',
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-300',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300',
  gold: 'bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300',
  green: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300',
};
