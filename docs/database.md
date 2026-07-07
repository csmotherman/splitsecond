# Database Design

## Users

* id
* username
* created_at

## Daily Challenges

* id
* challenge_date
* target_1
* target_2
* target_3
* target_4
* target_5

## Attempts

* id
* user_id
* challenge_id
* target_time
* actual_time
* error

## Scores

* id
* user_id
* challenge_id
* total_error
* rank
* created_at
