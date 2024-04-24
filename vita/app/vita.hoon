:: 🛸
:: /app/vita/hoon
:: :: keep track of your app distributions
:: downloads
::  periodically scry clay for %cs /subs for each desk
::  cache results, export to csv
:: activity
::  :: empty unless you use /lib/vita-client/hoon with your app
::  accept foreign pokes attesting to activity on a desk
::  count unique active users each day
::  export to csv
::
/-  sur=vita, tt=treaty
/+  vita
/+  default-agent, verb, dbug, agentio
=,  format
:: :: ::
|%
+$  versioned-state
  $%  state-0
      state-1
  ==
+$  state-0  $:
  %0
  period=(unit @dr)
  apps=app-metrics-0:sur
  ==
+$  state-1  $:
  %1
  period=(unit @dr)
  collect-full-moments=_|
  apps=app-metrics:sur
  ==
+$  card     card:agent:gall
--
%+  verb  |
%-  agent:dbug
=|  state-1
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
++  on-agent  on-agent:def
++  on-watch
  |=  =path
  ^-  (quip card _this)
  `this
++  on-save
  ^-  vase
  !>(state)
++  on-leave
  |=  [=path]
  `this
++  on-init
  ^-  (quip card _this)
  =.  period  [~ ~h8]
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
::
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
      %1
    :_  this(state old)
    ~[get-all-card:hc]
    ::
      %0
    =/  new  (load-old-state:hc old)
    :_  this(state new)
    :~
      get-all-card:hc
      [%pass /eyre/connect %arvo %e %disconnect [~ /apps/[dap.bowl]]]
    ==
  ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path  (on-peek:def path)
    [%x %desks ~]
      =/  dex=(list desk)
        %-  limo
        ~(tap in ~(key by apps))
      ``vita-desks+!>(dex)
    ::
    [%x %metrics ~]
      ``vita-metrics+!>(apps)
    ::
    :: .^(* %gx /=vita=/downloads/noun)
    :: https://myship.com/~/scry/vita/downloads.csv
    [%x %downloads ~]
      ``noun+!>(~)
      :: ``csv+!>((make-csv:hc %downloads))
    [%x %downloads %latest @ ~]
      :: return latest (set ship) for downloads
      =/  dek=@tas  +30.path
      =/  mut=(unit metrics:sur)  (~(get by apps) dek)
      ?~  mut
        ``noun+!>(*(set ship))
      ``noun+!>(latest.downloads.u.mut)
    [%x %json %downloads %latest @ ~]
      :: return latest (set ship) for downloads
      =/  dek=@tas  +62.path
      =/  mut=(unit metrics:sur)  (~(get by apps) dek)
      =;  res=(set ship)
        ``json+!>((set-ship:enjs:vita res))
      ?~  mut  *(set ship)
      latest.downloads.u.mut
    [%x %downloads %cumulative @ ~]
      :: return cumulative (set ship) for downloads
      =/  dek=@tas  +30.path
      =/  mut=(unit metrics:sur)  (~(get by apps) dek)
      ?~  mut
        ``noun+!>(*(set ship))
      ``noun+!>(cumulative.downloads.u.mut)
    :: ::
    :: https://myship.com/~/scry/vita/activity.csv
    [%x %activity ~]
      ``noun+!>(~)
      :: ``csv+!>((make-csv:hc %activity))
    [%x %activity %latest @ ~]
      :: return latest (set ship) for activity
      =/  dek=@tas  +30.path
      =/  mut=(unit metrics:sur)  (~(get by apps) dek)
      ?~  mut
        ``noun+!>(*(set ship))
      ``noun+!>(latest.activity.u.mut)
    ::
    :: summaries as noun marks
    :: .^((map desk @ud) %gx /=vita=/downloads/summary/noun)
    [%x %downloads %summary ~]
      :: return a summary of downloads as (map desk @ud)
      =/  sum=(map desk @ud)
        %-  ~(urn by apps)
        |=  [=desk =metrics:sur]
        ^-  @ud
        ~(wyt in latest.downloads.metrics)
      ``noun+!>(sum)
    [%x %json %metrics %summary ~]
      :: return a summary of downloads as (map desk @ud)
      =/  sum=(map desk [dow=@ud act=@ud])
        %-  ~(urn by apps)
        |=  [=desk =metrics:sur]
        :-  ~(wyt in latest.downloads.metrics)
        ~(wyt in latest.activity.metrics)
      ``json+!>((desk-by-metrics:enjs:vita sum))
    :: .^((map desk @ud) %gx /=vita=/cumulative-downloads/summary/noun)
    [%x %cumulative-downloads %summary ~]
      =/  sum=(map desk @ud)
        %-  ~(urn by apps)
        |=  [=desk =metrics:sur]
        ^-  @ud
        ~(wyt in cumulative.downloads.metrics)
      ``noun+!>(sum)
    :: .^((map desk @ud) %gx /=vita=/activity/summary/noun)
    :: [%x %activity %summary ~]
    ::   =/  sum=(map desk @ud)
    ::     %-  ~(urn by apps)
    ::     |=  [=desk =metrics:sur]
    ::     ^-  @ud
    ::     ?.  ?=(^ history.activity.metrics)  0
    ::     ?.  (is-today:hc -.i.history.activity.metrics)  0
    ::     ~(wyt in latest.activity.metrics)
    ::   ``noun+!>(sum)
  ==
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %vita-action
    =/  act  !<(action:sur vase)
    ?-  -.act
        %activity
      %-  (slog leaf+"vita: {<src.bowl>} is using {<desk.act>}" ~)
      =.  apps  (put-activity:hc +.act)
      `this
      ::
        %set-collect-full-moments
      ?>  =(src.bowl our.bowl)
      `this(collect-full-moments boo.act)
      ::
        %set-interval
      ?>  =(src.bowl our.bowl)
      =.  period  period.act
      :_  this
      manage-timers:hc
      ::
        %del
      ?>  =(src.bowl our.bowl)
      =.  apps
        %-  ~(del by apps)
        desk.act
      `this
      ::
        %get
      ?>  =(src.bowl our.bowl)
      =.  apps
        (put-downloads:hc desk.act)
      `this
      ::
        %get-all
      ?>  =(src.bowl our.bowl)
      =^  cards  state
        get-all-procedure:hc
      [cards this]
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
::
++  maybe-set-timer
  ^-  (list card)
  :: set a new timer if nonnull period
  ?~  period  ~
  =/  =time  (add now.bowl u.period)
  ~[[%pass /vita/downloads/(scot %da time) %arvo %b %wait time]]
::
++  kill-old-timers
  ^-  (list card)
  :: scry behn, find any vita timers and destroy them
  =/  timers  .^((list [@da duct]) %bx (scot %p our.bowl) %$ (scot %da now.bowl) /debug/timers)
  =.  timers
    %+  skim  timers
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
::
++  get-all-procedure
  ^-  (quip card _state)
  :: get each desk in state
  ::  and any extra from treaty allies
  =/  dex=(set desk)  ~(key by apps)
  =.  dex
    %-  %~  gas  in  dex
    ^-  (list desk)
    =/  ally
      scry-treaty-alliance
    ?.  ?=(%ini -.ally)  ~
    %+  turn  ~(tap in init.ally)
    |=  [=ship =desk]
    desk
  :: process each desk into state
  =/  lex=(list desk)  ~(tap in dex)
  =.  apps  |-
    ?~  lex  apps
    =.  apps
      (put-downloads i.lex)
    $(lex t.lex)
  :_  state
    :: set timers on every get-all
    manage-timers
::
++  scry-clay-subs
  |=  [desk=@tas]
  ^-  (set ship)
  =-  ((slog leaf+"vita: our {<desk>} has {<(lent ~(tap in -))>} subs" ~) -)
  =+  [our=(scot %p our.bowl) now=(scot %da now.bowl)]
  =+  car=ud:.^(cass:clay %cw /[our]/[desk]/[now])
  %-  sy
  %-  turn  :_  head
  %+  skim  ~(tap in .^((set [@p rave:clay]) %cx /[our]//[now]/cult/[desk]))
  |=  [@p rav=rave:clay]
  ?&  ?=([%sing %w [%ud @] ~] rav)
      .=(+(car) +>->.rav))
  ==
::
++  scry-treaty-alliance
  .^(update:alliance:tt %gx /[(scot %p our.bowl)]/treaty/[(scot %da now.bowl)]/alliance/noun)
::
++  put-downloads
  |=  [desk=@tas]
  ^-  app-metrics:sur
  =/  scry-result=(set ship)
    (scry-clay-subs desk)
  :: ingest desk subs data from clay
  %+  ~(put by apps)  desk
  ^-  metrics:sur
  =/  met=metrics:sur
    =/  m=(unit metrics:sur)  (~(get by apps) desk)
    ?~  m  *metrics:sur
    u.m
  =.  latest.downloads.met
    scry-result
  =.  cumulative.downloads.met
    %-  ~(uni in cumulative.downloads.met)
    scry-result
  =.  history.downloads.met
    %+  ~(put by history.downloads.met)
      today
    :-  ~(wyt in scry-result)
    ?.  collect-full-moments  ~
    `latest.downloads.met
  met
::
++  put-activity
  |=  [desk=@tas]
  ^-  app-metrics:sur
  %+  ~(put by apps)  desk
  ^-  metrics:sur
  =/  met=metrics:sur
    ?~  (~(get by apps) desk)
      :: DoS protection,
      :: dont let just anyone create a new
      :: app metrics item
      !!
    (~(got by apps) desk)
  =.  latest.activity.met
    ?:  (~(has by history.activity.met) today)
      latest.activity.met
    :: restart for a fresh day
    *(set ship)
  =.  latest.activity.met
    (~(put in latest.activity.met) src.bowl)
  =.  history.activity.met
    %+  ~(put by history.activity.met)
      today
    :-  ~(wyt in latest.activity.met)
    ?.  collect-full-moments  ~
    `latest.activity.met
  met
::
++  today
  :: modulo h24
  ^-  time
  =/  =date  (yore now.bowl)
  =.  t.date  [d.t.date 0 0 0 ~]
  (year date)
++  is-today
  |=  [=time]
  ^-  ?
  =/  today  (yore now.bowl)
  =/  =date  (yore time)
  ?&  =(y.-.today y.-.date)
      =(m.today m.date)
      =(d.t.today d.t.date)
  ==
:: ::
++  load-old-state
  |=  old=versioned-state
  ^-  state-1
  =|  new=state-1
  ?+  -.old  old
      %0
    =.  period.new  period.old
    =.  apps.new
      %-  ~(run by apps.old)
      |=  old-met=metrics-0:sur
      ^-  metrics:sur
      =|  new-met=metrics:sur
      =.  cumulative.downloads.new-met
          cumulative.downloads.old-met
      =.  latest.downloads.new-met
          latest.downloads.old-met
      =.  history.downloads.new-met
        %-  ~(uni by *(map @da moment:sur))
        %-  malt
        %+  turn  history.downloads.old-met
        |=  [t=@da n=@ud]
        [t n `(unit (set ship))`~]
      ::
      =.  latest.activity.new-met
          latest.activity.old-met
      =.  history.activity.new-met
        %-  ~(uni by *(map @da moment:sur))
        %-  malt
        %+  turn  history.activity.old-met
        |=  [t=@da n=@ud]
        [t n `(unit (set ship))`~]
      new-met
    new
  ==
--
