
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
    ?>  =(src.bowl our.bowl)
    =/  act  !<(action:sur vase)
    ?-  -.act
        %new-desk
      =.  desks
        (~(put by desks) desk-name.act *desk-metadata:sur)
      :: =/  has  (has-desk:b desk-name.act)
      :: TODO use has?
      =/  o  (new-desk:b desk-name.act)
      :_  this
      [o ~]
      ::
        %fetch-desk-metadata
      =*  dek  desk-name.act
      ?~  mut=(~(get by desks) dek)
        `this
      =*  met  u.mut
      =.  exists-in-clay.met
        (has-desk:b dek)
      =.  desks  (~(put by desks) dek met)
      `this
    ==
  ==
--
::
|_  bowl=bowl:gall
+*  io    ~(. agentio bowl)
++  nil  ~
--