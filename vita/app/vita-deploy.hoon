
/-  sur=vita-deploy
/-  tt=treaty
/+  lib=vita-deploy
/+  default-agent, verb, dbug, agentio, strandio
:: :: ::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  $:
  %0
    desks=(set desk)
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
    [(fact:io vita-deploy-update+!>([%desks desks]) ~[/frontend]) ~]
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
        %create-app
      :: =/  has  (has-desk:b desk-name.act)
      :: TODO use has?
      =/  tid  `@ta`(cat 3 'thread_' (scot %uv (sham eny.bowl)))
      =/  ta-now  `@ta`(scot %da now.bowl)
      =/  start-args  [~ `tid byk.bowl(r da+now.bowl) %vita-deploy !>(desk-name.act)]
      :_  this
      :~
        [%pass /thread/[ta-now] %agent [our.bowl %spider] %watch /thread-result/[tid]]
        [%pass /thread/[ta-now] %agent [our.bowl %spider] %poke %spider-start !>(start-args)]
      ==
      ::
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
        =.  desks
          %-  %~  gas  in  desks
          ^-  (list desk)
          =/  ally
            scry-treaty-alliance:hc
          ?+  -.ally  ~
            %ini
            %+  turn  ~(tap in init.ally)
              |=  [=ship =desk]
              desk
          ==
        :_  this
        [give-desks:hc ~]
      ==
    ==
  ==
--
::
|_  bowl=bowl:gall
+*  io    ~(. agentio bowl)
++  nil  ~
++  give-desks
  ^-  card
  (fact:io vita-deploy-update+!>([%desks desks]) ~[/frontend])
++  scry-treaty-alliance
  .^(update:alliance:tt %gx /[(scot %p our.bowl)]/treaty/[(scot %da now.bowl)]/alliance/noun)
--