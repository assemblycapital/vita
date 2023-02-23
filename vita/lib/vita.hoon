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
      ['downloads' (downloads downloads.met)]
    :-
      ['activity' (activity activity.met)]
      ~
  ++  downloads
    |=  don=^downloads
    ^-  json
    %-  pairs
    :-
      ['cumulative' (set-ship cumulative.don)]
    :-
      ['latest' (set-ship latest.don)]
    :-
      ['history' (history history.don)]
      ~
  ++  activity
    |=  act=^activity
    ^-  json
    %-  pairs
    :-
      ['latest' (set-ship latest.act)]
    :-
      ['history' (history history.act)]
      ~
  ++  history
    |=  his=(list [@da @ud])
    ^-  json
    :-  %a
    %+  turn  his
      |=  it=[@da @ud]
      %-  pairs
      :-
        ['time' (sect -.it)]
      :-
        ['size' (numb +.it)]
        ~
  ++  set-ship
    |=  ships=(set @p)
    ^-  json
    :-  %a
    %+  turn
      ~(tap in ships)
      |=  her=@p
      [%s (scot %p her)]
  --
::
++  dejs
  =,  dejs:format
  |%
  ++  action
    |=  jon=json
    ^-  ^action
    *^action
  ++  metrics
    |=  jon=json
    ^-  ^metrics
    *^metrics
  --
--