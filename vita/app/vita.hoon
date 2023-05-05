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
/-  store=vita, tt=treaty
/+  vita, server, schooner
/+  default-agent, verb, dbug, agentio
:: /*  vita-ui  %html  /app/vita-ui/html
:: /*  sail-vita-ui  %hymn  /app/vita/hymn
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
++  on-agent  on-agent:def
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  (on-watch:def path) 
      [%http-response *]
    `this
  ==
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
  :-  get-all-card:hc
  :-  [%pass /eyre/connect %arvo %e %connect [~ /apps/[dap.bowl]] dap.bowl]
  ~
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
  :: anomoly: bad data for %vita when doing this from on-load
  :: must be some event timing, something about clay not resetting subs until after on-load completes???
  [get-all-card:hc ~]
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
    :: .^(* %gx /=vita=/metrics/basket/noun)
    :: https://myship.com/~/scry/vita/metrics/mydesk.json
    [%x %metrics @ ~]
      =/  dek=desk  +>-.path
      =/  mut=(unit metrics:store)  (~(get by apps) dek)
      ?~  mut
        ``noun+!>(~)
      ::TODO should this include the desk name?
      ``vita-metrics+!>(u.mut)
    ::
    :: .^(* %gx /=vita=/downloads/noun)
    :: https://myship.com/~/scry/vita/downloads.csv
    [%x %downloads ~]
      ``csv+!>((make-csv:hc %downloads))
    [%x %downloads %latest @ ~]
      :: return latest (set ship) for downloads
      =/  dek=@tas  +30.path
      =/  mut=(unit metrics:store)  (~(get by apps) dek)
      ?~  mut
        ``noun+!>(*(set ship))
      ``noun+!>(latest.downloads.u.mut)
    [%x %downloads %cumulative @ ~]
      :: return cumulative (set ship) for downloads
      =/  dek=@tas  +30.path
      =/  mut=(unit metrics:store)  (~(get by apps) dek)
      ?~  mut
        ``noun+!>(*(set ship))
      ``noun+!>(cumulative.downloads.u.mut)
    :: ::
    :: https://myship.com/~/scry/vita/activity.csv
    [%x %activity ~]
      ``csv+!>((make-csv:hc %activity))
    [%x %activity %latest @ ~]
      :: return latest (set ship) for activity
      =/  dek=@tas  +30.path
      =/  mut=(unit metrics:store)  (~(get by apps) dek)
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
        |=  [=desk =metrics:store]
        ^-  @ud
        ~(wyt in latest.downloads.metrics)
      ``noun+!>(sum)
    :: .^((map desk @ud) %gx /=vita=/cumulative-downloads/summary/noun)
    [%x %cumulative-downloads %summary ~]
      =/  sum=(map desk @ud)
        %-  ~(urn by apps)
        |=  [=desk =metrics:store]
        ^-  @ud
        ~(wyt in cumulative.downloads.metrics)
      ``noun+!>(sum)
    :: .^((map desk @ud) %gx /=vita=/activity/summary/noun)
    [%x %activity %summary ~]
      =/  sum=(map desk @ud)
        %-  ~(urn by apps)
        |=  [=desk =metrics:store]
        ^-  @ud
        ?.  ?=(^ history.activity.metrics)  0
        ?.  (is-today:hc -.i.history.activity.metrics)  0
        ~(wyt in latest.activity.metrics)
      ``noun+!>(sum)
  ==
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %handle-http-request
    =^  cards  state
      :: get latest data before making the frontend
      get-all-procedure:hc
    =^  cards  state
      (handle-http:hc !<([@ta =inbound-request:eyre] vase))
    [cards this]
      %vita-action
    =/  act  !<(action:store vase)
    ?-  -.act
        %activity
      %-  (slog leaf+"vita: {<src.bowl>} is using {<desk.act>}" ~)
      =.  apps  (put-activity:hc +.act)
      `this
        %set-interval
      ?>  =(src.bowl our.bowl)
      =.  period  period.act
      :_  this
      manage-timers:hc
      :: ::
      :: ::
        %del
      ?>  =(src.bowl our.bowl)
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
      (put-downloads i.lex)
    $(lex t.lex)
  :_  state
      :: set timers on every get-all
      manage-timers
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
  ^-  metrics:store
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
++  put-activity
  |=  [desk=@tas]
  ^-  _apps
  %+  ~(put by apps)  desk
  ^-  metrics:store
  =/  met=metrics:store
    ?~  (~(get by apps) desk)
      :: DoS protection,
      :: dont let just anyone create a new
      :: app metrics item
      !!
    (~(got by apps) desk)
  =/  his
    history.activity.met
  ?~  his
    :: base case, first item in history
      =.  latest.activity.met
        (~(put in latest.activity.met) src.bowl)
      =.  history.activity.met
        :-  [now.bowl 1]
        history.activity.met
      met
  ::
  :: if last history is today, put
  :: else, reset for current day
  ?.  (is-today -.i.his)
    :: start a fresh day
    =.  latest.activity.met  *(set ship)
    =.  latest.activity.met
      (~(put in latest.activity.met) src.bowl)
    =.  history.activity.met
      :-  [now.bowl 1]
      history.activity.met
    met
  :: add onto the current day
  =.  latest.activity.met
    (~(put in latest.activity.met) src.bowl)
  =/  new-his-item
    :-  now.bowl
      (lent ~(tap in latest.activity.met))
  =.  history.activity.met
    :-  new-his-item  t.his
  met
::
++  is-today
  |=  [=time]
  ^-  ?
  =/  today  (yore now.bowl)
  =/  =date  (yore time)
  ?&  =(y.-.today y.-.date)
      =(m.today m.date)
      =(d.t.today d.t.date)
  ==
++  handle-http
  |=  [eyre-id=@ta =inbound-request:eyre]
  ^-  (quip card _state)
  =/  ,request-line:server
    (parse-request-line:server url.request.inbound-request)
  =+  send=(cury response:schooner eyre-id)
  ?.  authenticated.inbound-request
    :_  state
    %-  send
    [302 ~ [%login-redirect './apps/vita']]
  ::           
  ?+    method.request.inbound-request 
    [(send [405 ~ [%stock ~]]) state]
    ::
      %'GET'
    ?+    site  
      :_  state 
      (send [404 ~ [%plain "404 - Not Found"]])
      ::
        [%apps %vita ~]
      :_  state
      ::(send [200 ~ [%csv make-downloads-csv]])
      =/  ht
          %-  crip
          %-  en-xml:html
          (page:webui:vita bowl apps)
      :: =.  ht
      ::   %-  crip
      ::   %-  weld
      ::   :-  "<!DOCTYPE html>\0a"
      ::   %-  trip  ht
      (send [200 ~ [%html ht]])
    ==
  ==
::
++  make-csv
  |=  [doa=?(%downloads %activity)]
  ^-  @t
  =/  dex=(list desk)
    ~(tap in ~(key by apps))
  =/  title-row=tape
    ","
  =.  title-row
    |-  ?~  dex  (weld title-row "\0a")
    =.  title-row
      ?~  t.dex  
        (weld title-row (trip i.dex))
      (weld title-row (weld (trip i.dex) ","))
    $(dex t.dex)
  ::
  =/  data-rows=(list tape)
      :: flop to put latest info at bottom
      (flop (make-data-rows doa))
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
  :: this arm is too complex
  :: extract and reduce data from this huge app-metrics:store noun into a csv file
  ::  reduce finer-detail info to normalized by day (or hour or whatever, depending on +normalize-date)
  ::
  :: sacrificed some code simplicity for the sake of a 'sound' algorithm:
  ::   1. collect all times from dataset
  ::   2. normalize, reduce, and sort set of times
  ::   3. create a column for each desk with values at each time
  ::       pop values instead of lookup foreach time index
  ::   4. transform columns into rows, 
  ::       just pop one at a time off of each, and format
  ::
  :: a naive way of doing this could have performance issues:
  ::   1. collect all times from dataset
  ::   2. normalize, reduce, and sort set of times
  ::   3. create rows, grabbing each value by a lookup into app-metrics
  ::        thats just a lot of lookups...
  ::
  :: worth it??? maybe some jet makes the naive way more efficient somehow.
  :: or maybe the difference is just negligable.
  :: naive would definitely be more readable.
  ::
  :: im starting to think vita may want to use the uqbar rdb (nectar?)
  :: isnt this why that exists? nectar-bros hmu
  ::
  :: some of this could probably be cleaned up / extracted / modularized but
  :: I think it would be kind of a LARP and just add indirection.
  ::
  :: the fact is, we are noun-wrangling here.
  :: anyone who wants to tidy this up, PR plz
  ::
  |=  [doa=?(%downloads %activity)]
  ^-  (list tape)
  :: get all unique times from full dataset
  =|  times=(set time)
  =/  lapps  ~(tap by apps)
  =.  times
    |-  ?~  lapps  times
    =/  met
      q.i.lapps
    =/  his
        ?:  =(doa %downloads)
          history.downloads.met
        history.activity.met
    =.  times
      |-  ?~  his  times
      =.  times  (~(put in times) -.i.his)
      $(his t.his)
    $(lapps t.lapps)
  ::
  :: reduce times to normalized
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
  :: ~&  >  ['got days' days]
  ::
  =/  dex=(list desk)
    ~(tap in ~(key by apps))
  ::
  :: 
  :: create one column at a time, get a value foreach day
  :: run thru each history once, comparing against top of 'day'stack,
  :: ignoring bad values, defaulting to 0
  ::
  =|  cols=(map desk (list @ud))
  =.  cols
    |-  ?~  dex  cols
    =/  dek  i.dex
    =/  met  (~(got by apps) dek)
    =/  his
        ?:  =(doa %downloads)
          history.downloads.met
        history.activity.met
    =/  col=(list @ud)
      |-  :: lol
      :: the following recursive logic is popping down two stacks:
      ::    days : our csv row index, unique days in the full dataset
      ::           (list date) sorted by latest
      ::    his  : our values
      ::           (list [@da @ud]) sortest by latest @da
      ::  we are creating a (list @ud), a column with a value for each day
      ?~  days  ~
      :: if we have no more history
      ::
      ?~  his
        :: we're out of values, fill with 0
        [0 $(days t.days)]
      ::
      =*  index-day  (year i.days)
      =*  value-day  (year (normalize-date (yore -.i.his)))
      :: if our index is newer than our value
      ::
      ?:  (gth index-day value-day)
        :: pop the index, fill 0
        [0 $(days t.days)]
      :: if we have the correct day
      ::
      ?:  =(index-day value-day)
        :: set the value
        :: goto next index
        :: goto next value
        :-  +.i.his
        $(days t.days, his t.his)
      :: if our value is newer than index
      :: 
      :: goto next value
      $(his t.his) 
    :: ::
    :: ::
    =.  cols
      (~(put by cols) dek col)
    $(dex t.dex)
  ::
  :: ~&  >>  ['got-cols' cols] 
  ::
  :: format columns as tape rows
  :: iter over days
  :: create a row=tape foreach day
  :: null terminated
  :: fill with values
  ^-  (list tape)
  |-  ?~  days  ~
    =/  day=date  i.days
    =/  row=tape  ""
    ::
    =.  row  (weld row (date-to-tape day))
    =.  row  (weld row ",")
    ::
    :: for each desk, pop from col
    =^  newrow   cols
        :: pop values from cols, accumulate into row
        |-  ?~  dex
          [row cols]
        :: pop
        =/  col  (~(got by cols) i.dex)
        ?~  col  !!
        =.  cols  (~(put by cols) i.dex t.col)
        :: put in row
        =/  val=tape  (atom-to-tape i.col)
        =.  row  (weld row val)
        =.  row
          ?~  t.dex  row
          (weld row ",")
        $(dex t.dex)
    ::
    =.  row  newrow
    =.  row  (weld row "\0a")
    :-  row
    $(days t.days)
:: :: ::
++  downloads-at-date
  |=  [=desk =date]
  :: TODO probably remove, poorly optimized
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
  =.  h.t.day  0
  =.  m.t.day  0
  =.  s.t.day  0
  =.  f.t.day  ~
  day
++  atom-to-tape
  :: format without dots
  |=  a=@
  ^-  tape
  =/  js  (numb:enjs:format a)
  ?.  ?=([%n *] js)  !!
  (trip p.js)
++  date-to-tape
  |=  [day=date]
  ^-  tape
  =/  yyyy=tape  (atom-to-tape y.-.day)
  :: "{<m.day>}/{<d.t.day>}/{yyyy} {<h.t.day>}:{<m.t.day>}:{<s.t.day>}"
  "{<m.day>}/{<d.t.day>}/{yyyy}"
::
-- 
