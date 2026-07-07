# Database Schema

This schema matches the MVP Supabase setup.

The core principle is:

Store the raw data now so ranks, MMR, profiles, and deeper stats can be created later.

---

# profiles

One row per player.

## Columns

- id
- display_name
- created_at

## Notes

The `id` should match the authenticated Supabase user id when authentication is enabled.

For anonymous MVP play, the app may also use a local device/player id before full auth is finalized.

---

# daily_challenges

One row per daily challenge.

## Columns

- challenge_date
- target_1
- target_2
- target_3
- target_4
- target_5

## Rules

- One challenge per date
- Same five targets for all players
- Targets range from 0.70 to 10.00 seconds
- At least two targets must be under 5.00 seconds
- Targets are displayed to two decimal places

---

# daily_submissions

One row per completed player challenge.

## Columns

- id
- user_id
- challenge_date
- total_error
- submitted_at

## Rules

- One submission per user per challenge_date
- Total Error is the sum of the five individual attempt errors
- Lower Total Error ranks higher on leaderboards

## Required Constraint

unique(user_id, challenge_date)

---

# attempts

One row per individual timer attempt.

Each completed daily challenge creates five attempt rows.

## Columns

- id
- user_id
- challenge_date
- target_number
- target_time
- recorded_time
- error
- perfect_timer

## Rules

- Five attempts per completed challenge
- target_number should be 1 through 5
- error = absolute difference between target_time and recorded_time
- perfect_timer = true when error <= 0.01

---

# Data To Avoid Storing For MVP

Do not store these as primary fields yet:

- ranks
- MMR
- percentile
- achievements
- weekly averages
- monthly averages

These should be calculated later from submissions and attempts once enough data exists.

---

# Future Additions

Possible future columns or tables:

- device_id
- auth_provider
- share_cards
- milestones
- head_to_head_matches
- mmr_history
- rank_history
- seasons

These should not block the MVP.