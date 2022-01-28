drop table IF EXISTS umpire_match;
drop table IF EXISTS  player_match;
drop table IF EXISTS ball_by_ball;
drop table IF EXISTS match;
drop table IF EXISTS umpire;
drop table IF EXISTS player;
drop table IF EXISTS venue;
drop table IF EXISTS owner;
drop table IF EXISTS team;
drop FUNCTION IF EXISTS my_trigger();
drop FUNCTION IF EXISTS my_trigger2();
drop FUNCTION IF EXISTS my_trigger3();

create table team (
	team_id		int,
	team_name		text,
	primary key (team_id)
);
	
create table venue(
	venue_id		int,
	venue_name		text,
	city_name		text,
	country_name		text,
	capacity int,
	primary key (venue_id)
);
	
create table player(
	player_id		int,
	player_name		text,
	dob			date,
	batting_hand		text,
	bowling_skill		text,
	country_name		text,
	primary key (player_id)
);		 	
	
create table match(
	match_id		int,
	season_year		int,
	team1			int	not null,
	team2			int	not null,
	venue_id		int	not null,
	toss_winner		int	not null,
	match_winner		int	not null,
	toss_name		text,
	win_type		text,
	man_of_match		int	not null,
	win_margin		int,
	attendance int ,
	primary key (match_id),
	foreign key (team1) references team (team_id),
	foreign key (team2) references team (team_id),
	foreign key (venue_id) references venue (venue_id),
	foreign key (toss_winner) references team (team_id),
	foreign key (match_winner) references team (team_id),
	foreign key (man_of_match) references player (player_id),
	CONSTRAINT incorrect_toss_type CHECK(toss_name in ('field','bat')),
	CONSTRAINT incorrect_win_type CHECK(win_type is NULL or win_type in ('runs','wickets'))
);	
	
create table player_match(
	playermatch_key	bigint,
	match_id		int	not null,
	player_id		int	not null,
	role_desc		text,
	team_id		int	not null,
	primary key (playermatch_key),
	foreign key (match_id) references match (match_id),
	foreign key (player_id) references player (player_id),
	foreign key (team_id) references team (team_id),
	CONSTRAINT incorrect_role_description CHECK(role_desc in ('Player', 'Keeper', 'CaptainKeeper' , 'Captain'))
);	

create table owner (
	owner_id int not null,
	owner_name text,
	owner_type text,
	team_id int not null,
	stake int,
	primary key (owner_id),
	foreign key (team_id) references team (team_id),
	CONSTRAINT incorrect_stake_value CHECK(stake BETWEEN 1 AND 100)
);

create table umpire(
	umpire_id int not null,
	umpire_name text,
	country_name text,
	primary key (umpire_id)
);

create table umpire_match(
	umpirematch_key bigint not null,
	match_id int not null,
	umpire_id int not null,
	role_desc text,
	primary key (umpirematch_key),
	foreign key (match_id) references match(match_id),
	foreign key (umpire_id) references umpire(umpire_id),
	CONSTRAINT incorrect_umpire_role_desc CHECK(role_desc in ('Field','Third'))
);

create table ball_by_ball(
	match_id		int	not null,
	innings_no		int check (innings_no > 0),
	over_id		int check (over_id > 0),
	ball_id		int check (ball_id > 0),
	runs_scored		int,
	extra_runs		int,
	out_type		text CHECK (out_type is NULL or out_type in ('caught', 'caught and bowled' , 'bowled' , 'stumped' , 'retired hurt', 'keeper catch', 'lbw', 'run out', 'hit wicket') ),
	striker		int	not null,
	non_striker		int	not null,
	bowler		int	not null,
	primary key (match_id, innings_no, over_id, ball_id),
	foreign key (match_id) references match (match_id),
	foreign key (striker) references player (player_id),
	foreign key (non_striker) references player (player_id),
	foreign key (bowler) references player (player_id),
	CONSTRAINT incorrect_number_of_runs CHECK(runs_scored BETWEEN 0 AND 6),
	CONSTRAINT incorrect_innings_number CHECK(innings_no BETWEEN 1 and 2)
);

CREATE FUNCTION my_trigger() RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF (SELECT EXISTS(SELECT * from match,venue where match.venue_id=venue.venue_id AND match.venue_id=NEW.venue_id AND match.attendance>venue.capacity)) THEN
        RAISE EXCEPTION 'Attendance greater than Capacity';
    END IF;
    RETURN NEW;
END;
$$;

CREATE FUNCTION my_trigger2() RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF (
		(SELECT count(umpire_id) as X from match,umpire_match where match.match_id=umpire_match.match_id and umpire_match.match_id=NEW.match_id and umpire_match.role_desc='Field' group by match.match_id order by X desc limit 1)>2
		OR
		(SELECT count(umpire_id) as X from match,umpire_match where match.match_id=umpire_match.match_id and umpire_match.role_desc='Third' group by match.match_id order by X desc limit 1)>1
	)THEN
        RAISE EXCEPTION 'Too many Umpires';
    END IF;
    RETURN NEW;
END;
$$;

CREATE FUNCTION my_trigger3() RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF (
		( SELECT sum(stake) as X from owner where team_id=NEW.team_id  group by team_id order by X desc limit 1)>100
		OR
		( SELECT sum(stake) as X from owner where team_id=NEW.team_id  group by team_id order by X asc limit 1)<1
	)THEN
        RAISE EXCEPTION 'Stakes either too high or too less';
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER triger AFTER INSERT OR UPDATE ON match
    FOR EACH ROW EXECUTE PROCEDURE my_trigger();

CREATE TRIGGER triger AFTER INSERT OR UPDATE ON umpire_match
    FOR EACH ROW EXECUTE PROCEDURE my_trigger2();

CREATE TRIGGER triger AFTER INSERT OR UPDATE ON owner
    FOR EACH ROW EXECUTE PROCEDURE my_trigger3();