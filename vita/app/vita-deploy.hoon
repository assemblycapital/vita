
/-  sur=vita-deploy
/+  lib=vita-deploy
/+  default-agent, verb, dbug, agentio, strandio
:: :: ::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  $:
  %0
    desks=(map desk desk-metadata:sur)
  ==
+$  card  card:agent:gall
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
    b     ~(. b:lib bowl)
::
++  on-init   on-init:def
++  on-load   on-load:def
++  on-fail   on-fail:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-arvo   on-arvo:def
++  on-save
  ^-  vase
  !>(state)
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  (on-watch:def path) 
      [%frontend ~]
    :_  this
    [(fact:io vita-deploy-update+!>([%all-metadata desks]) ~[/frontend]) ~]
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %vita-deploy-action
    ?>  =(src.bowl our.bowl)
    =/  act  !<(action:sur vase)
    ?-  -.act
        %new-desk
      :: =.  desks
      ::   (~(put by desks) desk-name.act *desk-metadata:sur)
      :: =/  has  (has-desk:b desk-name.act)
      :: TODO use has?
      :: =/  o  (new-desk:b desk-name.act)
      :: :_  this
      :: [o ~]
      =/  tid  `@ta`(cat 3 'thread_' (scot %uv (sham eny.bowl)))
      =/  ta-now  `@ta`(scot %da now.bowl)
      =/  start-args  [~ `tid byk.bowl(r da+now.bowl) %vita-deploy !>(%foo)]
      :_  this
      :~
        [%pass /thread/[ta-now] %agent [our.bowl %spider] %watch /thread-result/[tid]]
        [%pass /thread/[ta-now] %agent [our.bowl %spider] %poke %spider-start !>(start-args)]
      ==
      ::
        %install
      :: TODO
      `this
        %publish
      :: TODO
      `this
        %unpublish
      :: TODO
      `this
      ::
        %fetch-desk-metadata
      =*  dek  desk-name.act
      ~&  [act]
      ?~  mut=(~(get by desks) dek)
        `this
      =*  met  u.mut
      =.  exists-in-clay.met
        (has-desk:b dek)
      :: TODO fetch isinstalled
      :: TODO fetch ispublished
      :: TODO fetch docket
      =.  desks  (~(put by desks) dek met)
      :_  this
      [(fact:io vita-deploy-update+!>([%all-metadata desks]) ~[/frontend]) ~]
    ==
  ==
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ~&  [wire sign]
  ?+    -.wire  (on-agent:def wire sign)
      %thread
    ?+    -.sign  (on-agent:def wire sign)
        %poke-ack
      ?~  p.sign
        %-  (slog leaf+"Thread started successfully" ~)
        `this
      %-  (slog leaf+"Thread failed to start" u.p.sign)
      `this
      ::
        %fact
      ?+    p.cage.sign  (on-agent:def wire sign)
          %thread-fail
        =/  err  !<  (pair term tang)  q.cage.sign
        %-  (slog leaf+"Thread failed: {(trip p.err)}" q.err)
        `this
          %thread-done
        =/  res  !<([@p @da] q.cage.sign)
        ~&  >  res
        `this
      ==
    ==
  ==
--
::
|_  bowl=bowl:gall
+*  io    ~(. agentio bowl)
++  nil  ~
--