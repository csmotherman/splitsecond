# SplitSecond Game Rules

## Tagline

**SplitSecond: Every Millisecond Matters.**

---

# Objective

Stop a hidden timer as close as possible to five daily target times.

Each player's score is determined by Total Error.

Lower scores rank higher.

---

# Daily Challenge

A new challenge is generated every day.

Every player receives the exact same five target times.

Example:

- 1.24
- 3.87
- 5.16
- 7.44
- 9.28

The challenge remains active until the next daily reset.

---

# Target Generation

Five target times are generated each day.

Rules:

- Minimum target time: 0.70 seconds
- Maximum target time: 10.00 seconds
- All targets are displayed to two decimal places
- At least two targets must be below 5.00 seconds
- No duplicate targets are allowed

Example:

- 0.91
- 2.74
- 4.63
- 6.81
- 9.15

---

# Gameplay

For each target:

1. The target time is displayed.
2. The player presses START.
3. The timer begins running.
4. The timer remains hidden while running.
5. The player presses STOP when they believe the target time has been reached.
6. The player's recorded time is saved.
7. Error is calculated.

This process repeats until all five targets have been completed.

---

# Hidden Timer

The timer is never visible while running.

Players must rely entirely on their internal sense of timing.

The hidden timer is a core mechanic of SplitSecond.

---

# Error Calculation

Error is calculated using the absolute difference between the target time and the recorded time.

Formula:

Error = |Target Time − Recorded Time|

Examples:

Target: 5.00

Recorded: 5.03

Error: 0.03

---

Target: 5.00

Recorded: 4.92

Error: 0.08

---

# Total Error

After all five targets are completed:

Total Error = Sum of All Five Errors

Example:

| Target | Recorded | Error |
| ------ | -------- | ----- |
| 1.24 | 1.22 | 0.02 |
| 3.87 | 3.91 | 0.04 |
| 5.16 | 5.12 | 0.04 |
| 7.44 | 7.41 | 0.03 |
| 9.28 | 9.35 | 0.07 |

Total Error = 0.20

Lower scores rank higher.

---

# Daily Participation

Each player may submit one completed challenge per day.

Once a challenge has been submitted:

- Scores cannot be edited
- The challenge is considered complete
- Additional submissions do not count toward leaderboards or statistics

---

# Leaderboards

## Daily Leaderboard

Ranks all submitted players for the current day's challenge.

Ranking Priority:

1. Lowest Total Error
2. Lowest best individual error
3. Earliest submission time

---

## Weekly Leaderboard

Ranks players using their average Total Error over the previous 7 days.

Minimum Participation Requirement:

3 completed daily challenges.

---

## Monthly Leaderboard

Ranks players using their average Total Error over the previous 30 days.

Minimum Participation Requirement:

10 completed daily challenges.

---

## All-Time Leaderboard

Ranks players by Career Average Error.

Minimum Participation Requirement:

30 completed daily challenges.

This should become the primary long-term leaderboard after enough users have played.

---

# MVP Profile Statistics

Each player profile should track:

## Core

- Career Average Error
- Days Played
- Current Streak
- Longest Streak
- Perfect Timers
- Best Daily Score
- Attempts

## Precision

- Perfect Timers
- Timers Within 0.05
- Timers Within 0.10
- Timers Within 0.25
- Precision Percentage

## Finishes

These should be tracked but may stay hidden until traffic is high enough:

- Top 10 Finishes
- Top 100 Finishes
- First Place Finishes

---

# Perfect Timer

A Perfect Timer is awarded when:

Error ≤ 0.01 seconds

Examples:

Target: 4.52

Recorded: 4.51

Perfect Timer

---

Target: 4.52

Recorded: 4.53

Perfect Timer

Perfect Timers are tracked permanently on player profiles.

---

# Future Competitive Systems

Ranks, MMR, grades, and percentiles should not be part of the MVP.

They should be designed after enough real player data exists to understand score distributions and player skill levels.

---

# Philosophy

SplitSecond rewards precision, consistency, and daily participation.

There are no levels, upgrades, or power-ups in the MVP.

Every player faces the exact same challenge.

The only thing that matters is timing.

Every millisecond matters.