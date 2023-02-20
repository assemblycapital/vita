::  share daily activity with central :vita
::
|%
++  active
  |=  [=bowl:gall]
  ^-  card:agent:gall
  :*  %pass
      /
      %agent
      [our.bowl dap.bowl]
      %poke
      %vita-client
      !>([%log-activity ~])
  ==
++  active-to-parent
  |=  [parent=ship =bowl:gall]
  ^-  card:agent:gall
  :*  %pass
      /
      %agent
      [parent %vita]
      %poke
      %vita-action
      !>([%activity q.byk.bowl])
  ==
::
+$  action
  $%
  [%config cfg=[enabled=? parent=@p]]
  [%log-activity ~]
  ==
+$  config
  $:  enabled=_|
      vita-parent=ship
  ==
::
++  agent
  |=  [init=config]
  ^-  $-(agent:gall agent:gall)
  |^  agent
  ::
  +$  state-0
    $:  %0
        =config
        last=time
    ==
  +$  card  card:agent:gall
  ++  agent
    |=  inner=agent:gall
    =|  state-0
    =*  state  -
    ^-  agent:gall
    |_  =bowl:gall
    +*  this  .
        ag    ~(. inner bowl)
    ::
    ++  on-init
      ^-  (quip card _this)
      =.  config  init
      =^  cards  inner  on-init:ag
      [cards this]
    ::
    ++  on-save
      on-save:ag
    ::
    ++  on-load
      |=  old-state=vase
      ^-  (quip card _this)
      =.  config  init
      =^  cards  inner  (on-load:ag old-state)
      [cards this]
    ::
    ++  on-poke
      |=  [=mark =vase]
      ^-  (quip card _this)
      ?:  ?=(%vita-client mark)
        =/  pok  !<(action vase)
        ?-  -.pok
            %config
          =.  config  cfg.pok
          `this
            %log-activity
          ?.  (gth now.bowl (add last ~h1)) ::TODO ~d1 constant?
            `this
          ?.  enabled.config
            `this
          =.  last  now.bowl
          :_  this
          :~
            (active-to-parent vita-parent.config bowl)
          ==
        ==
      ::
      =^  cards  inner  (on-poke:ag mark vase)
      [cards this]
    ::
    ++  on-watch
      |=  =path
      ^-  (quip card _this)
      =^  cards  inner  (on-watch:ag path)
      [cards this]
    ::
    ++  on-leave
      |=  =path
      ^-  (quip card _this)
      =^  cards  inner  (on-leave:ag path)
      [cards this]
    ::
    ++  on-peek
      |=  =path
      ^-  (unit (unit cage))
      (on-peek:ag path)
    ::
    ++  on-agent
      |=  [=wire =sign:agent:gall]
      ^-  (quip card _this)
      =^  cards  inner  (on-agent:ag wire sign)
      [cards this]
    ::
    ++  on-arvo
      |=  [=wire =sign-arvo]
      ^-  (quip card _this)
      =^  cards  inner  (on-arvo:ag wire sign-arvo)
      [cards this]
    ::
    ++  on-fail
      |=  [=term =tang]
      ^-  (quip card _this)
      =^  cards  inner  (on-fail:ag term tang)
      [cards this]
    --
  --
--