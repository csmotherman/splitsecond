
create or replace function public.start_duel(
    p_duel_id uuid
)
returns void
language plpgsql
security definer
as $$
declare
    v_target integer;
begin

    v_target :=
        floor(
            (1000 + random() * 9000)
        );

    insert into public.duel_rounds (
        duel_id,
        round_number,
        target_ms,
        status
    )
    values (
        p_duel_id,
        1,
        v_target,
        'countdown'
    );

    update public.duels
    set
        status = 'countdown',
        current_round = 1,
        started_at = now()
    where id = p_duel_id;

end;
$$;

create or replace function public.submit_duel_time(
    p_round_id uuid,
    p_elapsed_ms integer
)
returns void
language plpgsql
security definer
as $$
declare
    v_target integer;
begin

    select target_ms
    into v_target
    from public.duel_rounds
    where id = p_round_id;

    insert into public.duel_round_submissions (
        round_id,
        user_id,
        elapsed_ms,
        error_ms
    )
    values (
        p_round_id,
        auth.uid(),
        p_elapsed_ms,
        abs(
            p_elapsed_ms - v_target
        )
    );

end;
$$;

create or replace function public.complete_round(
    p_round_id uuid
)
returns void
language plpgsql
security definer
as $$
declare
    p1 record;
    p2 record;
    v_winner uuid;
begin

    select *
    into p1
    from public.duel_round_submissions
    where round_id = p_round_id
    order by error_ms
    limit 1;

    select *
    into p2
    from public.duel_round_submissions
    where round_id = p_round_id
    order by error_ms
    offset 1
    limit 1;

    if p1.error_ms = p2.error_ms then

        update public.duel_rounds
        set
            is_tie = true,
            status = 'completed',
            completed_at = now()
        where id = p_round_id;

        return;

    end if;

    v_winner := p1.user_id;

    update public.duel_rounds
    set
        winner_user_id = v_winner,
        status = 'completed',
        completed_at = now()
    where id = p_round_id;

end;
$$;