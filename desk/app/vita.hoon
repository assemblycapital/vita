:: vita
:: keep track of your app distributions
::  
/-  store=vita, tt=treaty
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
++  on-watch  on-watch:def
++  on-agent  on-agent:def
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
  ~&  >  ['on-arvo' wire]
  `this
++  on-save
  ^-  vase
  !>(state)
++  on-leave
  |=  [=path]
  `this
++  on-init
  ^-  (quip card _this)
  :_  this
  :~
    %-  poke-self:pass:io
    :-  %vita-action  !>([%get-all ~])
  ==
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
      %vita-action
    =/  act  !<(action:store vase)
    ?+  -.act  `this
        %del
      ?>  =(src.bowl our.bowl)
      =.  apps
        %-  ~(del by apps)
        desk.act
      `this
        %get
      ?>  =(src.bowl our.bowl)
      =/  scry-result  (scry-clay:hc desk.act)
      =.  apps
        (put-downloads:hc desk.act scry-result)
      `this
      %get-all
      ?>  =(src.bowl our.bowl)
      :: self-poke %get foreach desk in state and any extra from treaty allies
      =/  ally
        .^(update:alliance:tt %gx /[(scot %p our.bowl)]/treaty/[(scot %da now.bowl)]/alliance/noun)
      =/  deks=(set desk)  ~(key by apps)
      =.  deks
        %-  %~  gas  in  deks
          ^-  (list desk)
          ?+  -.ally  ~
            %ini
            %+  turn  ~(tap in init.ally)
              |=  [=ship =desk]
              desk
          ==
      :_  this
      %+  turn  ~(tap in deks)
        |=  =desk
        ^-  card
        %-  poke-self:pass:io
        :-  %vita-action  !>([%get desk])
    ==
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  period  ~d1
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
  %-  (slog leaf+"vita: our {<desk>} has {<(lent ~(tap in s))>} subs" ~)
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
      =.  cumulative.downloads.met
          %-  ~(uni in cumulative.downloads.met)
          scry-result
      =.  history.downloads.met
        :_  history.downloads.met
        [now.bowl (lent ~(tap in scry-result))]
      met
-- 
