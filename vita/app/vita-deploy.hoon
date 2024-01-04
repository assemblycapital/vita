
/-  sur=vita-deploy
/-  tt=treaty
/+  lib=vita-deploy, docket-lib=docket
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
    b     ~(. b:lib [our.bowl now.bowl])
::
++  on-fail   on-fail:def
++  on-leave  on-leave:def
++  on-arvo   on-arvo:def
++  on-save
  ^-  vase
  !>(state)
::
++  on-init
  ^-  (quip card _this)
  `this
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  :_  this(state old)
  ~[poke-get-desks:hc]
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  (on-watch:def path) 
      [%frontend ~]
    :_  this
    ~[give-desks:hc]
  ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path  (on-peek:def path)
    :: http://.../~/scry/vita-deploy/desks.json
    [%x %desks ~]
      ``vita-deploy-update+!>([%desks desks])
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
      %get-desks  `this(desks get-desks:hc)
      ::
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
        %delete-app
      =.  desks  (~(del in desks) desk-name.act)
      :_  this
      :: 
      :~
        (~(poke-our pass:io /) %vita vita-action+!>([%del desk-name.act]))
        (uninstall-desk:b desk-name.act)
        (unpublish-desk:b desk-name.act)
        give-desks:hc
      ==
      ::
        %set-docket
      =/  =nori:clay
        :-  %&  :_  ~
        :-  /desk/docket-0
        [%ins docket-0+!>(docket.act)]
      =/  =task:clay
        [%info desk-name.act nori]
      :_  this
      ~[[%pass /vita-deploy/set-docket %arvo %c task]]
    ==
  ==
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    -.wire  `this
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
          get-desks:hc
        :_  this
        [give-desks:hc ~]
      ==
    ==
  ==
--
::
|_  bowl=bowl:gall
+*  io    ~(. agentio bowl)
++  get-desks
  ^-  (set desk)
  %-  %~  gas  in  *(set desk)
  ^-  (list desk)
  =/  ally  scry-treaty-alliance
  ?.  ?=(%ini -.ally)  ~
  %+  turn  ~(tap in init.ally)
  |=  [=ship =desk]
  desk
++  give-desks
  ^-  card
  (fact:io vita-deploy-update+!>([%desks desks]) ~[/frontend])
++  poke-get-desks
  ^-  card
  (~(poke-self pass:io /self-poke/get-desks) vita-deploy-action+!>([%get-desks ~]))
++  scry-treaty-alliance
  .^(update:alliance:tt %gx /[(scot %p our.bowl)]/treaty/[(scot %da now.bowl)]/alliance/noun)
--