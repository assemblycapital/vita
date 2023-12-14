/-  sur=vita
=<  [sur .]
=,  sur
|%
::
++  enjs
  =,  enjs:format
  |%
  ++  action
    |=  act=^action
    ^-  json
    ~
  ++  desks
    |=  dex=(list desk)
    ^-  json
    :-  %a
    ^-  (list json)
    %+  turn  dex
    |=  =desk
    [%s desk]
  ++  metrics
    |=  met=^metrics
    ^-  json
    %-  pairs
    :-
      ['downloads' (ships-by-time downloads.met)]
    :-
      ['activity' (ships-by-time activity.met)]
    ~
  ++  ships-by-time
    |=  sip=^ships-by-time
    ^-  json
    %-  pairs
    :-
      :-  'cumulative'
      (set-ship cumulative.sip)
    :-
      ['latest' (set-ship latest.sip)]
    :-
      ['history' (history history.sip)]
    ~
  ++  history
    |=  his=(map @da moment)
    ^-  json
    :-  %a
    %+  turn  ~(tap by his)
    |=  [t=@da mom=moment]
    :: ^-  json
    %-  pairs
    :-
      ['time' (sect t)]
    :-
      ['size' (numb size.mom)]
    :-
      :-  'set'
      ?~  set.mom  ~
      (set-ship u.set.mom)
    ~
  ++  set-ship
    |=  ships=(set @p)
    ^-  json
    :-  %a
    %+  turn
      ~(tap in ships)
      |=  her=@p
      [%s (scot %p her)]
  ++  desk-by-metrics
    |=  val=(map desk [@ud @ud])
    ^-  json
    :-  %a
    %+  turn  ~(tap by val)
    |=  [=desk [dow=@ud act=@ud]]
    %-  pairs
    :~
      [%desk %s desk]
      [%downloads [%n (scot %ud dow)]]
      [%activity [%n (scot %ud act)]]
    ==
  --
::
++  dejs
  =,  dejs:format
  |%
  ++  action
    |=  jon=json
    ^-  ^action
    =<  (decode jon)
    |%
    ++  decode
      %-  of
      :~
        [%get-all ul]
      ==
    --
  ++  metrics
    |=  jon=json
    ^-  ^metrics
    *^metrics
  --
--