:: vita
:: keep track of your app distributions
::  
/-  store=vita, tt=treaty
/+  vita
/+  default-agent, verb, dbug, agentio
=,  format
:: :: ::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  $:
  %0
  period=(unit @dr)
  apps=app-metrics:store
  ==
+$  card     card:agent:gall
--
%+  verb  &
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
    hc    ~(. +> bowl)
    io    ~(. agentio bowl)
::
++  on-fail   on-fail:def
++  on-watch  on-watch:def
++  on-agent  on-agent:def
++  on-save
  ^-  vase
  !>(state)
++  on-leave
  |=  [=path]
  `this
++  on-init
  ^-  (quip card _this)
  =.  period  [~ ~s30]
  :_  this
  [get-all-card:hc ~]
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  ?+  -.sign-arvo  `this
      %behn
    %-  (slog leaf+"vita: running scheduled collection {<now.bowl>}" ~)
    :_  this
    [get-all-card:hc ~]
  ==
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  :_  this(state old)
  [get-all-card:hc ~]
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path  (on-peek:def path)
    :: .^(* %gx /=vita=/metrics/basket/noun)
    [%x %metrics @ ~]
      ~&  >  +>-.path
      ``json+!>(~)
    :: .^(* %gx /=vita=/downloads/noun)
    :: https://myship.com/~/scry/vita/downloads.csv
    [%x %downloads ~]
      ``csv+!>(make-downloads-csv:hc)
  ==
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %vita-action
    ?>  =(src.bowl our.bowl)
    =/  act  !<(action:store vase)
    ?-  -.act
        %set-interval
      =.  period  period.act
      :_  this
      manage-timers:hc
      :: ::
      :: ::
        %del
      =.  apps
        %-  ~(del by apps)
        desk.act
      `this
      :: ::
      :: ::
        %get
      ?>  =(src.bowl our.bowl)
      =.  apps
        (put-downloads:hc desk.act)
      `this
      :: ::
      :: ::
        %get-all
      ?>  =(src.bowl our.bowl)
      :: get each desk in state
      ::  and any extra from treaty allies
      =/  dex=(set desk)  ~(key by apps)
      =.  dex
        %-  %~  gas  in  dex
        ^-  (list desk)
        =/  ally
          scry-treaty-alliance:hc
        ?+  -.ally  ~
          %ini
          %+  turn  ~(tap in init.ally)
            |=  [=ship =desk]
            desk
        ==
      :: process each desk into state
      =/  lex=(list desk)  ~(tap in dex)
      =.  apps
        |-
        ?~  lex  apps
        =.  apps
          (put-downloads:hc i.lex)
        $(lex t.lex)
      :_  this
          :: set timers on every get-all
          manage-timers:hc
    ==
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
+*  io    ~(. agentio bowl)
++  manage-timers
  ^-  (list card)
  %+  weld
    kill-old-timers
    maybe-set-timer
++  maybe-set-timer
  ^-  (list card)
  :: set a new timer if nonnull period
  ?~  period  ~
  =/  =time  (add now.bowl u.period)
  :~
  [%pass /vita/downloads/(scot %da time) %arvo %b %wait time]
  ==
++  kill-old-timers
  ^-  (list card)
  :: scry behn, find any vita timers and destroy them
  =/  timers  .^((list [@da duct]) %bx (scot %p our.bowl) %$ (scot %da now.bowl) /debug/timers)
  =.  timers  %+  skim  timers
        |=  [time=@da =duct]
        ^-  ?
        ?.  ?=(^ duct)
            %.n 
        ?=([%gall %use %vita *] i.duct)
  %+  turn  timers
    |=  [time=@da =duct]
    ^-  card
    [%pass /vita/downloads/(scot %da time) %arvo %b %rest time]
::
++  get-all-card
  ^-  card
  %-  poke-self:pass:io
  :-  %vita-action  !>([%get-all ~])
++  scry-clay-subs
  |=  [desk=@tas]
  ^-  (set ship)
  =/  s  .^((set ship) %cs /[(scot %p our.bowl)]/[desk]/[(scot %da now.bowl)]/subs)
  %-  (slog leaf+"vita: our {<desk>} has {<(lent ~(tap in s))>} subs" ~)
  s
++  scry-treaty-alliance
  .^(update:alliance:tt %gx /[(scot %p our.bowl)]/treaty/[(scot %da now.bowl)]/alliance/noun)
++  put-downloads
  |=  [desk=@tas]
  ^-  _apps
  =/  scry-result  (scry-clay-subs desk)
  :: ingest desk subs data from clay
  %+  ~(put by apps)  desk
    =/  met=metrics:store
      ?~  (~(get by apps) desk)
        *metrics:store
      (~(got by apps) desk)
    =.  latest.downloads.met
        scry-result
    =.  cumulative.downloads.met
        %-  ~(uni in cumulative.downloads.met)
        scry-result
    =.  history.downloads.met
      :_  history.downloads.met
      [now.bowl (lent ~(tap in scry-result))]
    met
++  make-downloads-csv
  ^-  @t
  =/  dex=(list desk)
    ~(tap in ~(key by apps))
  =/  title-row=tape
    "TIME,"
  =.  title-row
    |-  ?~  dex  (weld title-row "\0a")
    =.  title-row
      (weld title-row (weld (trip i.dex) ","))
    $(dex t.dex)
  ::
  =/  data-rows=(list tape)
      make-data-rows
  ::
  =/  z-data-rows=tape
    (zing data-rows)
  ::
  %-  crip
  %+  weld
  title-row
  z-data-rows
:: ::
++  make-data-rows
  ^-  (list tape)
  :: get all unique times from full dataset
  =|  times=(set time)
  =/  lapps  ~(tap by apps)
  =.  times
    |-  ?~  lapps  times
    =/  met
      q.i.lapps
    =/  his
        history.downloads.met
    =.  times
      |-  ?~  his  times
      =.  times  (~(put in times) -.i.his)
      $(his t.his)
    $(lapps t.lapps)
  ::
  :: reduce times to all unique DAYS
  =/  limes  ~(tap in times)
  =|  days=(set date)
  =.  days
    |-  ?~  limes  days
      =/  myday  (normalize-date (yore i.limes))
      =.  days
        (~(put in days) myday)
      $(limes t.limes)
  ::
  :: sorted
  =/  days=(list date)
      %+  sort
      ~(tap in days)
      |=  [a=date b=date]
      (gth (year a) (year b))
  ~&  >  ['got days' days]
  ::
  =/  dex=(list desk)
    ~(tap in ~(key by apps))
  ::
  :: another option: remove [%get =desk]
  ::   and just do rows without reduction
  ::   BUT the naive solution is still just as time-complex
  ::       and the good solution is still just as code-complex
  :: 
  :: create one column at a time, get a value foreach day
  ::  TODO
  ::
  =|  cols=(map desk (list @ud))
  =.  cols
    |-  ?~  dex  cols
    =/  dek  i.dex
    =/  met  (~(got by apps) dek)
    =/  his  history.downloads.met
    =/  col=(list @ud)
      |-  :: lol
      ?~  days  ~
      ?~  his
        [0 $(days t.days)]
      ?:  =(i.days (normalize-date (yore -.i.his)))
        :-  +.i.his
        $(days t.days, his t.his)
      $(his t.his) 
    =.  cols
      (~(put by cols) dek col)
    $(dex t.dex)
  ::
  ~&  >>  ['got-cols' cols] 
  ::
  :: format columns as tape rows
  ::   e.g. "0,100,200,300\0a"
  |-  ?~  days  ~
  =/  day  i.days
  =/  row=tape  ""
  =.  row
    (weld row (trip (scot %da (year day))))
  =.  row  (weld row ",")
  ::
  :: for each desk, pop from col
  =/  kms
      :: pop values from cols, accumulate into row
      |-  ?~  dex
        [row cols]
      =/  col  (~(got by cols) i.dex)
      :: for each val, concat with ","
      ?~  col  !!
      =/  js  (numb:enjs:format i.col)
      ?.  ?=([%n *] js)  !!
      =/  val=tape  (trip p.js)
      =.  row  (weld row val)
      =.  row  (weld row ",")
      =.  cols  (~(put by cols) i.dex t.col)
      $(dex t.dex)
  ::
  =.  row   -.kms
  =.  cols  +.kms
  ::
  =.  row  (weld row "\0a")
  :-  row
  $(days t.days)
:: ::
++  downloads-at-date
  |=  [=desk =date]
  :: TODO probably remove, extremely time-complex
  ^-  @ud
  =/  met  (~(get by apps) desk)
  ?~  met  0
  =/  his  history.downloads.u.met
  |-  ?~  his  0
  =/  yo  (normalize-date (yore -.i.his))
  ?:  =(yo date)
    +.i.his
  $(his t.his)
++  normalize-date
  |=  [day=date]
  ^-  date
  :: =.  h.t.day  0
  =.  m.t.day  0
  =.  s.t.day  0
  =.  f.t.day  ~
  day
::
-- 
