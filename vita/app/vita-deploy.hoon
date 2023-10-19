
/-  sur=vita-deploy
/+  lib=vita-deploy
/+  default-agent, verb, dbug, agentio
:: :: ::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  $:
  %0
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
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-save
  ^-  vase
  !>(state)
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  (on-watch:def path) 
      [%http-response *]
    `this
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %vita-deploy-action
    =/  act  !<(action:sur vase)
    ?-  -.act
        %deploy
      ~&  >  act
      :: =/  has  (has-desk:b desk-name.act)
      :: TODO use has?
      =/  o  (new-desk:b desk-name.act)
      :_  this
      [o ~]
    ==
  ==
--
::
|_  bowl=bowl:gall
+*  io    ~(. agentio bowl)
++  nil  ~
--