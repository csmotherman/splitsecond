# Database Schema

## players

- id
- username
- created_at
- days_played
- current_streak
- longest_streak
- perfect_timers

## daily_challenges

- challenge_date
- target_1
- target_2
- target_3
- target_4
- target_5

## daily_scores

- player_id
- challenge_date
- total_error
- percentile
- submitted_at

## attempts

- player_id
- challenge_date
- target_number
- target_time
- recorded_time
- error
- perfect_timer

Rules:

- One score per player per day
- Five attempts per challenge
- Same targets for all players each day