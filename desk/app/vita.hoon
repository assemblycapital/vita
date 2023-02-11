:: vita
::  
/-  store=vita
/+  vita
/+  default-agent, verb, dbug, agentio
=,  format
:: ::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  $:
  %0
  apps=(map desk =metrics:store)
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
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  ?:  =(-:old-state -:!>(state))
    :: if type matches, remember
    =/  old  !<(versioned-state old-state)
    `this(state old)
  :: else, forget
  `this 
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  `this
++  on-save
  ^-  vase
  !>(state)
++  on-init
  ^-  (quip card _this)
  `this
++  on-leave
  |=  [=path]
  `this
++  on-agent  on-agent:def
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path  (on-peek:def path)
    [%x %downloads ~]
      ``json+!>(~)
  ==
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
    ::
      %vita-action
    ?>  =(src.bowl our.bowl)
    =/  act  !<(action:store vase)
    ?+  -.act  `this
        %del
      =.  apps
        %-  ~(del by apps)
        desk.act
      `this
        %get
      =/  scry-result  (scry-clay:hc desk.act)
      =.  apps
        (put-downloads:hc desk.act scry-result)
      `this
    ==
  ==
++  on-watch  on-watch:def
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  has-desk
  |=  [desk=@tas]
  =/  h  (~(has in ~(key by apps)) desk)
  ?:  h
    %-  (slog leaf+"vita: {<desk>} is registered" ~)
    h
  %-  (slog leaf+"vita: {<desk>} is not registered" ~)
  h
++  scry-clay
  |=  [desk=@tas]
  ^-  (set ship)
  =/  s  .^((set ship) %cs /[(scot %p our.bowl)]/[desk]/[(scot %da now.bowl)]/subs)
  %-  (slog leaf+"got {<(lent ~(tap in s))>} subscribers to [our {<desk>}]" ~)
  s
++  put-downloads
  |=  [desk=@tas scry-result=(set ship)]
  ^-  _apps
  %+  ~(put by apps)  desk
      =/  met=metrics:store
        ?~  (~(get by apps) desk)
          *metrics:store
        (~(got by apps) desk)
      =.  latest.downloads.met
          scry-result
      =.  history.downloads.met
        :_  history.downloads.met
        [now.bowl (lent ~(tap in scry-result))]
      met
-- 
