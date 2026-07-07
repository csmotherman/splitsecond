# SplitSecond Statistics

This document defines the statistics used throughout SplitSecond.

The goal is to keep profiles visually clean and focused on meaningful long-term achievement.

Profiles should emphasize a small number of important metrics rather than overwhelming players with random numbers.

---

# Core Profile Statistics

These are the primary statistics displayed on every player profile.

## Career Average Error

Average Total Error across all completed daily challenges.

Formula:

Total Career Error ÷ Days Played

Lower is better.

This is the primary skill metric in SplitSecond until enough player data exists to create ranks or MMR.

---

## Days Played

Number of unique daily challenges completed.

---

## Current Streak

Number of consecutive days with a completed daily challenge.

Missing a day resets the streak.

---

## Longest Streak

Highest streak ever achieved.

---

## Perfect Timers

Total number of timer attempts with:

Error ≤ 0.01 seconds

This is the primary precision metric in SplitSecond.

---

# Performance Statistics

## Best Daily Score

Lowest Total Error ever achieved in a completed daily challenge.

---

## Best Week

Lowest average Total Error across any rolling 7-day period.

Minimum Requirement:

7 completed days.

---

## Best Month

Lowest average Total Error across any rolling 30-day period.

Minimum Requirement:

30 completed days.

---

# Participation Statistics

## Attempts

Total individual timer attempts completed.

Each completed daily challenge contains 5 attempts.

Formula:

Attempts = Days Played × 5

---

# Precision Statistics

## Perfect Timers

Timer attempts with:

Error ≤ 0.01

---

## Timers Within 0.05

Timer attempts with:

Error ≤ 0.05

---

## Timers Within 0.10

Timer attempts with:

Error ≤ 0.10

---

## Timers Within 0.25

Timer attempts with:

Error ≤ 0.25

---

## Precision Percentage

Percentage of all attempts that qualify as Perfect Timers.

Formula:

Perfect Timers ÷ Attempts

---

# Finish Statistics

These statistics become available once daily player volume is large enough to make them meaningful.

## Top 10 Finishes

Number of daily challenges completed with a final position inside the Top 10.

This should only be emphasized once daily traffic is high enough for Top 10 to mean something.

---

## Top 100 Finishes

Number of daily challenges completed with a final position inside the Top 100.

This should only be emphasized once daily traffic is high enough for Top 100 to mean something.

---

## First Place Finishes

Number of daily challenges completed with the best score of the day.

This may be tracked but should not be emphasized in the MVP profile.

---

# Future Competitive Statistics

Ranks, grades, MMR, and percentiles should not be part of the MVP.

They should be designed after SplitSecond has enough real player data to understand score distributions.

Future competitive systems may include:

- MMR
- Skill ranks
- Head-to-head rating
- Seasonal rating
- Daily percentile after leaderboard finalization

---

# Profile Layout

## Hero Section

- Username
- Career Average Error
- Days Played
- Current Streak

## Core Statistics

- Perfect Timers
- Longest Streak
- Best Daily Score
- Attempts

## Expanded Statistics

### Performance

- Career Average Error
- Best Daily Score
- Best Week
- Best Month

### Participation

- Days Played
- Attempts
- Current Streak
- Longest Streak

### Precision

- Perfect Timers
- Timers Within 0.05
- Timers Within 0.10
- Timers Within 0.25
- Precision Percentage

### Finishes

- Top 10 Finishes
- Top 100 Finishes
- First Place Finishes

---

# Statistics Philosophy

A SplitSecond profile should answer three questions immediately:

How good is this player?

- Career Average Error
- Best Daily Score

How active is this player?

- Days Played
- Current Streak
- Longest Streak

How precise is this player?

- Perfect Timers

Everything else is supporting information.

The best profiles should be understandable in less than five seconds.