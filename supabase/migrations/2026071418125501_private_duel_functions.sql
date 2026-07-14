create or replace function public.create_private_duel()
returns uuid
language plpgsql
security definer
as $$
declare
    v_duel_id uuid;
    v_code text;
begin

    v_code :=
        upper(
            substring(
                md5(random()::text)
                from 1 for 6
            )
        );

    insert into public.duels (
        match_type,
        match_code,
        status
    )
    values (
        'private',
        v_code,
        'waiting'
    )
    returning id
    into v_duel_id;

    insert into public.duel_players (
        duel_id,
        user_id,
        slot
    )
    values (
        v_duel_id,
        auth.uid(),
        1
    );

    return v_duel_id;

end;
$$;

create or replace function public.join_private_duel(
    p_match_code text
)
returns uuid
language plpgsql
security definer
as $$
declare
    v_duel_id uuid;
begin

    select id
    into v_duel_id
    from public.duels
    where match_code = upper(p_match_code)
    limit 1;

    if v_duel_id is null then
        raise exception 'Match not found';
    end if;

    if (
        select count(*)
        from public.duel_players
        where duel_id = v_duel_id
    ) >= 2 then
        raise exception 'Match already full';
    end if;

    insert into public.duel_players (
        duel_id,
        user_id,
        slot
    )
    values (
        v_duel_id,
        auth.uid(),
        2
    );

    update public.duels
    set status = 'matched'
    where id = v_duel_id;

    return v_duel_id;

end;
$$;

create or replace function public.set_duel_ready(
    p_duel_id uuid,
    p_ready boolean
)
returns void
language plpgsql
security definer
as $$
begin

    update public.duel_players
    set ready = p_ready
    where duel_id = p_duel_id
    and user_id = auth.uid();

end;
$$;